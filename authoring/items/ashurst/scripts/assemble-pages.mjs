import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const contentRoot = join(dirname(fileURLToPath(import.meta.url)), '..', 'serialized-content');
const siteRoot = join(contentRoot, 'ashurst', 'ashurst');
const DATA_ID = 'd3957d41-e553-45a1-b51e-21c97c9a5ccd';
const HOME_ID = '1a784bdd-39e2-4ed4-be9f-7c7d413ab256';
const PAGE_TEMPLATE = '44815917-d191-4b69-bf54-951b0852b0c9';
const PARTIAL_TEMPLATE = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const PAGE_DESIGN_TEMPLATE = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const PLACEHOLDER_TEMPLATE = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const VARIANT_FOLDER_TEMPLATE = '49c111d0-6867-4798-a724-1f103166e6e9';
const VARIANT_TEMPLATE = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const PARTIALS_ID = 'c1f55ec1-1957-446a-98c9-124039a6d2d0';
const PAGE_DESIGNS_ID = 'c32ce1d9-ab76-4c61-b512-1843ad3b0426';
const PARTIAL_PLACEHOLDER_FOLDER = '6c0f2a69-13c0-4de9-987a-9686d50a80a8';
const VARIANTS_ROOT = 'dd0366c3-7393-44b6-9b69-d70f506618be';
const SITE_PATH = '/sitecore/content/ashurst/ashurst';

const id = () => randomUUID().toLowerCase();
const upper = (value) => `{${value.replace(/[{}]/g, '').toUpperCase()}}`;

function walk(dir, acc = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) walk(full, acc);
    else if (name.name.endsWith('.yml')) acc.push(full);
  }
  return acc;
}

function readItem(file) {
  const text = readFileSync(file, 'utf8');
  const itemId = text.match(/^ID: "([^"]+)"/m)?.[1];
  const path = text.match(/^Path: "?([^"\r\n]+)"?/m)?.[1];
  const componentName = text.match(/Hint: componentName\r?\n  Value: (\S+)/)?.[1];
  return { file, itemId, path, componentName, text };
}

const items = walk(contentRoot).map(readItem);
const renderingByName = new Map(
  items.filter((item) => item.componentName).map((item) => [item.componentName, item])
);
const templateByPath = new Map(items.map((item) => [item.path, item]));

function templateId(component) {
  return templateByPath.get(`/sitecore/templates/Project/ashurst/${component} Templates/${component}`).itemId;
}

function fieldId(component, field) {
  return templateByPath.get(
    `/sitecore/templates/Project/ashurst/${component} Templates/${component}/Data/${field}`
  ).itemId;
}

function block(value, indent) {
  const pad = ' '.repeat(indent);
  return `|\n${value
    .split('\n')
    .map((line) => `${pad}${line}`)
    .join('\n')}`;
}

function writeItem({ itemId, parent, template, path, shared = [], fields = [] }) {
  const relative = path.replace(`${SITE_PATH}/`, '');
  const disk = join(siteRoot, ...relative.split('/')) + '.yml';
  mkdirSync(dirname(disk), { recursive: true });
  const sharedYaml = (shared.length ? shared : [{ id: 'dbbbeca1-21c7-4906-9dd2-493c1efa59a2', hint: '__Shared revision', value: id() }])
    .map((entry) => `- ID: "${entry.id}"\n  Hint: ${entry.hint}\n  Value: ${block(entry.value, 4)}`)
    .join('\n');
  const fieldYaml = fields
    .map((entry) => `    - ID: "${entry.id}"\n      Hint: ${entry.hint}\n      Value: ${block(entry.value, 8)}`)
    .join('\n');
  const body = `---
ID: "${itemId}"
Parent: "${parent}"
Template: "${template}"
Path: "${path}"
SharedFields:
${sharedYaml || '[]'}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${fieldYaml || '    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"\n      Hint: __Created\n      Value: 20261015T120000Z'}
`;
  writeFileSync(disk, body, 'utf8');
  return itemId;
}

function layout(entries) {
  const lines = entries.map((entry, index) => {
    const position = index === 0 ? 'p:before="*"' : `p:after="r[@uid='${upper(entries[index - 1].uid)}']"`;
    const par = entry.par.replace(/&/g, '&amp;');
    const ds = entry.ds ? `\n          s:ds="${entry.ds}"` : '';
    return `        <r
          uid="${upper(entry.uid)}"
          ${position}${ds}
          s:id="${upper(entry.renderingId)}"
          s:par="${par}"
          s:ph="${entry.ph}" />`;
  });
  return `<r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}" l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
${lines.join('\n')}
      </d>
    </r>`;
}

function par(variantId) {
  const fieldNames = variantId ? `%7B${variantId.replace(/[{}]/g, '').toUpperCase()}%7D` : 'FieldNames';
  return `GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&FieldNames=${fieldNames}&Styles&RenderingIdentifier&CSSStyles&DynamicPlaceholderId=1`;
}

const variantIds = new Map();
function ensureVariant(component, variantName) {
  const key = `${component}/${variantName}`;
  if (variantIds.has(key)) return variantIds.get(key);
  const folderKey = `${component}/folder`;
  if (!variantIds.has(folderKey)) {
    const folder = id();
    writeItem({
      itemId: folder,
      parent: VARIANTS_ROOT,
      template: VARIANT_FOLDER_TEMPLATE,
      path: `${SITE_PATH}/Presentation/Headless Variants/${component}`,
      shared: [],
      fields: [],
    });
    variantIds.set(folderKey, folder);
  }
  const variant = id();
  writeItem({
    itemId: variant,
    parent: variantIds.get(folderKey),
    template: VARIANT_TEMPLATE,
    path: `${SITE_PATH}/Presentation/Headless Variants/${component}/${variantName}`,
    shared: [],
    fields: [],
  });
  variantIds.set(key, variant);
  return variant;
}

const dataFolders = new Map();

function dataFolder(component) {
  if (dataFolders.has(component)) return dataFolders.get(component);
  const folder = id();
  writeItem({
    itemId: folder,
    parent: DATA_ID,
    template: templateByPath.get(
      `/sitecore/templates/Project/ashurst/${component} Templates/${component} Folder`
    ).itemId,
    path: `${SITE_PATH}/Data/${component}`,
    fields: [],
  });
  dataFolders.set(component, folder);
  return folder;
}

function datasource(component, name, values) {
  const itemId = id();
  const fields = Object.entries(values).map(([hint, value]) => ({
    id: fieldId(component, hint),
    hint,
    value,
  }));
  writeItem({
    itemId,
    parent: dataFolder(component),
    template: templateId(component),
    path: `${SITE_PATH}/Data/${component}/${name}`,
    fields,
  });
  return itemId;
}

function rendering(component, ds, placeholder, variantName = 'Default') {
  const variant = ensureVariant(component, variantName);
  return {
    uid: id(),
    renderingId: renderingByName.get(component).itemId,
    ds,
    ph: placeholder,
    par: par(variant),
  };
}

const link = (text, url) =>
  `<link text="${text}" linktype="internal" url="${url}" anchor="" target="" />`;

const headerDs = datasource('Header', 'Header', {
  SearchLabel: 'Search',
  PeopleLabel: 'People',
  WhoWeAreLabel: 'Who we are',
  WhatWeDoLabel: 'What we do',
  SectorsLabel: 'Sectors',
  PrivateCapitalLabel: 'Private Capital',
  InsightsLabel: 'Insights',
  InsightsLink: link('Insights', '/insights/all-insights'),
  LocationsLabel: 'Our locations',
  CareersLabel: 'Careers',
});
const headerSearchDs = datasource('HeaderSearch', 'Header Search', {
  Placeholder: 'Enter a search term',
  InsightsTitle: 'Insights & News',
  PeopleTitle: 'People',
});
const footerDs = datasource('Footer', 'Footer', {
  ColumnOneTitle: 'Collaborate',
  ColumnOneLinks: '<p><a href="/insights/all-insights">Insights</a></p><p>Client login</p><p>SpeakUp</p>',
  ColumnTwoTitle: 'At Ashurst Perkins Coie',
  ColumnTwoLinks: '<p>Legal Notices</p><p>Privacy Notice</p><p>Contact Us</p>',
  ColumnThreeTitle: 'Follow',
  ColumnThreeLinks: '<p>LinkedIn</p>',
  Copyright: '© 2026 Ashurst Perkins Coie Group. All rights reserved.',
});
const heroDs = datasource('HeroVideo', 'Home Hero', {});
const introDs = datasource('FeatureSplit', 'Here', {
  Eyebrow: 'Intro',
  Title: 'Ashurst Perkins Coie is here',
  Body: '<p>With sector strength in technology, energy and infrastructure, and financial services, Ashurst Perkins Coie is built for what is next.</p>',
  Link: link('Learn more', '/insights/all-insights'),
});
const rackDs = datasource('FeatureSplit', 'Rack Forum', {
  Eyebrow: 'Thinking piece',
  Title: 'The Rack Forum: BYO Resources',
  Body: '<p>In the European and broader development of data centers in the United States, looking at bring your own power solutions, how developers are securing energy needs, and the lessons learned.</p>',
  Link: link('Listen now', '/insights/all-insights'),
});
const secDs = datasource('FeatureSplit', 'SEC Exemption', {
  Eyebrow: 'Thinking piece',
  Title: 'The SEC’s Innovation Exemption for tokenized stock: what US public companies must know now',
  Body: '<p>Boards and management teams need to review protocols, communications, and strategic options to ready their organizations to respond rapidly and decisively as markets and regulations evolve.</p>',
  Link: link(
    'Learn about the next steps',
    '/insights/what-public-companies-need-to-know-about-the-sec-innovation-exemption-for-tokenized-stock'
  ),
});
const weatherDs = datasource('FeatureSplit', 'Extreme Weather', {
  Eyebrow: 'Thinking piece',
  Title: 'Extreme weather: beyond the force majeure clause',
  Body: '<p>How changing weather conditions can drive commercial disputes, and what you can do to prepare.</p>',
  Link: link('Learn how to review your contracts', '/insights/all-insights'),
});
const locationsDs = datasource('LocationsBand', 'Locations', {
  Title: 'Our locations',
  Body: '<p>Across 52 offices in 20 countries and regions, our lawyers provide global insights with locally tailored advice. Click on the map below to discover more.</p>',
});
const insightsHeroDs = datasource('InsightsHero', 'Insights Hero', { Title: 'Insights' });
const featuredDs = datasource('FeaturedInsights', 'Featured', {
  Card1Tag: 'Legal development',
  Card1Title: 'FERC Meeting Agenda Summaries',
  Card1Date: 'October 14, 2026',
  Card1Link: link('Discover more', '/insights/all-insights'),
  Card2Tag: 'Legal development',
  Card2Title: '"De facto Directors": Who are they?',
  Card2Date: 'October 14, 2026',
  Card2Link: link('Discover more', '/insights/all-insights'),
  Card3Tag: 'Legal development',
  Card3Title: 'Data Bytes AU: Key Australian privacy updates so far in 2026',
  Card3Date: 'October 13, 2026',
  Card3Link: link('Discover more', '/insights/data-bytes-au-key-australian-privacy-updates-so-far-in-2026'),
});
const searchDs = datasource('InsightsSearch', 'Search', {
  Title: 'Search all insights',
  Placeholder: 'Enter key words e.g. corporate, tax.',
});

const articles = [
  {
    slug: 'data-bytes-au-key-australian-privacy-updates-so-far-in-2026',
    tag: 'Legal development',
    title: 'Data Bytes AU: Key Australian privacy updates so far in 2026',
    date: 'October 13, 2026',
    body: `<h2>Welcome to Data Bytes AU</h2><p>A roundup of Australian privacy, cyber security, and online safety developments so far in 2026.</p><h2>Part 1 – Recent updates</h2><p>Privacy Act reform, OAIC guidance, and cyber security expectations for organisations handling personal information.</p><h2>Part 2 – Key determinations</h2><p>Recent determinations on automated decisions, facial recognition, and online safety duties.</p><h2>Part 3 – What to watch</h2><p>The next enforcement cycle and the practical steps privacy teams should take before year end.</p>`,
    contacts: [
      ['Geoff McGrath', 'Partner'],
      ['Emma Butler', 'Counsel'],
      ['Sonia Haque-Vatcher', 'Counsel'],
      ['Nick Perkins', 'Senior Associate'],
    ],
  },
  {
    slug: 'what-public-companies-need-to-know-about-the-sec-innovation-exemption-for-tokenized-stock',
    tag: 'Legal development',
    title: 'What public companies need to know about the SEC’s Innovation Exemption for tokenized stock',
    date: 'October 2, 2026',
    body: `<h2>Why this exemptive order matters now for public companies</h2><p>The SEC’s five-year Innovation Exemption lets regulated venues offer tokenized versions of listed stock, with a notice and objection process for issuers.</p><h2>Notification and objection process</h2><p>Venues must give written notice, publish a plain-English public notice, and wait 30 days. A written objection stops listing.</p><h2>Selected practical considerations</h2><p>Companies should confirm the address on Exchange Act filings is monitored and decide who owns an objection.</p><h2>Action items to consider</h2><p>Map the notice path, brief the board, and prepare a short objection playbook before a venue writes.</p>`,
    contacts: [
      ['Allison Handy', 'Partner'],
      ['Joshua Ashley Klayman', 'Partner'],
      ['James Walker', 'Partner'],
    ],
  },
  {
    slug: 'asics-first-comprehensive-review-of-sustainability-reports',
    tag: 'Legal development',
    title: "ASIC's first comprehensive review of sustainability reports",
    date: 'October 7, 2026',
    body: `<h2>Background</h2><p>Australia’s mandatory sustainability reporting regime commenced in 2025. ASIC reviewed a sample of Group 1 reports for the year ending 31 December 2025.</p><h2>Headline findings</h2><p>Preparation, lodgement, and audit requirements were generally met. Disclosure quality is the gap ASIC expects to close.</p><h2>ASIC's eight key action items</h2><p>Treat the eight action items as a checklist when the next Group 1 reports are finalised.</p><h2>Key takeaways and next steps</h2><p>Entities with a 30 June 2026 year end are the next cohort. Boards should test governance, scenario analysis, and scope 3 readiness now.</p>`,
    contacts: [['Miriam Kleiner', 'Partner']],
  },
];

const articlePages = articles.map((article) => {
  const hero = datasource('ArticleHero', article.slug, {
    Tag: article.tag,
    Title: article.title,
    Date: article.date,
  });
  const body = datasource('ArticleBody', article.slug, { Body: article.body });
  const contactValues = { Title: 'Key Contacts' };
  article.contacts.forEach((person, index) => {
    contactValues[`Contact${index + 1}Name`] = person[0];
    contactValues[`Contact${index + 1}Role`] = person[1];
  });
  const contacts = datasource('KeyContacts', article.slug, contactValues);
  return { slug: article.slug, hero, body, contacts };
});

const headerPartial = id();
const footerPartial = id();
writeItem({
  itemId: headerPartial,
  parent: PARTIALS_ID,
  template: PARTIAL_TEMPLATE,
  path: `${SITE_PATH}/Presentation/Partial Designs/Header`,
  shared: [
    { id: '55faae90-3bba-4f7f-96fe-13c3f40055ff', hint: 'Signature', value: 'header' },
    {
      id: 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e',
      hint: '__Renderings',
      value: layout([
        rendering('Header', headerDs, 'headless-header'),
        rendering('HeaderSearch', headerSearchDs, 'headless-header'),
      ]),
    },
  ],
});
writeItem({
  itemId: footerPartial,
  parent: PARTIALS_ID,
  template: PARTIAL_TEMPLATE,
  path: `${SITE_PATH}/Presentation/Partial Designs/Footer`,
  shared: [
    { id: '55faae90-3bba-4f7f-96fe-13c3f40055ff', hint: 'Signature', value: 'footer' },
    {
      id: 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e',
      hint: '__Renderings',
      value: layout([rendering('Footer', footerDs, 'headless-footer')]),
    },
  ],
});
writeItem({
  itemId: id(),
  parent: PARTIAL_PLACEHOLDER_FOLDER,
  template: PLACEHOLDER_TEMPLATE,
  path: `${SITE_PATH}/Presentation/Placeholder Settings/Partial Design/Header`,
  shared: [{ id: '7256bdab-1fd2-49dd-b205-cb4873d2917c', hint: 'Placeholder Key', value: 'sxa-header' }],
});
writeItem({
  itemId: id(),
  parent: PARTIAL_PLACEHOLDER_FOLDER,
  template: PLACEHOLDER_TEMPLATE,
  path: `${SITE_PATH}/Presentation/Placeholder Settings/Partial Design/Footer`,
  shared: [{ id: '7256bdab-1fd2-49dd-b205-cb4873d2917c', hint: 'Placeholder Key', value: 'sxa-footer' }],
});
const pageDesign = id();
writeItem({
  itemId: pageDesign,
  parent: PAGE_DESIGNS_ID,
  template: PAGE_DESIGN_TEMPLATE,
  path: `${SITE_PATH}/Presentation/Page Designs/Default`,
  shared: [{ id: '0966b999-0d0e-4278-acc9-9da69d461fe6', hint: 'PartialDesigns', value: `${headerPartial}|${footerPartial}` }],
});

const pageDesignsFile = join(siteRoot, 'Presentation', 'Page Designs.yml');
let pageDesigns = readFileSync(pageDesignsFile, 'utf8');
if (!pageDesigns.includes('TemplatesMapping')) {
  const nl = pageDesigns.includes('\r\n') ? '\r\n' : '\n';
  const encoded = `%7b${PAGE_TEMPLATE.toUpperCase()}%7d%3d%257B${pageDesign.replace(/[{}]/g, '').toUpperCase()}%257D`;
  pageDesigns = pageDesigns.replace(
    /SharedFields:\r?\n/,
    `SharedFields:${nl}- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"${nl}  Hint: TemplatesMapping${nl}  Value: "${encoded}"${nl}`
  );
  writeFileSync(pageDesignsFile, pageDesigns, 'utf8');
}

function pageItem(itemIdValue, parent, path, entries) {
  writeItem({
    itemId: itemIdValue,
    parent,
    template: PAGE_TEMPLATE,
    path,
    shared: [{ id: 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e', hint: '__Renderings', value: layout(entries) }],
  });
}

const homeFile = join(siteRoot, 'Home.yml');
let home = readFileSync(homeFile, 'utf8');
if (!home.includes('__Renderings')) {
  const nl = home.includes('\r\n') ? '\r\n' : '\n';
  const homeLayout = layout([
    rendering('HeroVideo', heroDs, 'headless-main'),
    rendering('FeatureSplit', introDs, 'headless-main'),
    rendering('FeatureSplit', rackDs, 'headless-main', 'Inversed'),
    rendering('FeatureSplit', secDs, 'headless-main'),
    rendering('FeatureSplit', weatherDs, 'headless-main', 'Inversed'),
    rendering('LocationsBand', locationsDs, 'headless-main'),
  ]);
  const layoutBlock = homeLayout
    .split('\n')
    .map((line) => `    ${line}`)
    .join(nl);
  home = home.replace(
    /SharedFields:\r?\n/,
    `SharedFields:${nl}- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"${nl}  Hint: __Renderings${nl}  Value: |${nl}${layoutBlock}${nl}`
  );
  writeFileSync(homeFile, home, 'utf8');
}

const insightsFolder = id();
pageItem(insightsFolder, HOME_ID, `${SITE_PATH}/Home/insights`, [
  rendering('InsightsHero', insightsHeroDs, 'headless-main'),
]);
pageItem(id(), insightsFolder, `${SITE_PATH}/Home/insights/all-insights`, [
  rendering('InsightsHero', insightsHeroDs, 'headless-main'),
  rendering('FeaturedInsights', featuredDs, 'headless-main'),
  rendering('InsightsSearch', searchDs, 'headless-main'),
]);
for (const article of articlePages) {
  pageItem(id(), insightsFolder, `${SITE_PATH}/Home/insights/${article.slug}`, [
    rendering('ArticleHero', article.hero, 'headless-main'),
    rendering('ArticleBody', article.body, 'headless-main'),
    rendering('KeyContacts', article.contacts, 'headless-main'),
  ]);
}

console.log('Assembled Ashurst pages');

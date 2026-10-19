import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  capabilityGroups,
  discover,
  financialHow,
  financialInsights,
  financialIntro,
  financialNews,
  financialWho,
  technologyHighlights,
  technologyHow,
  technologyInsights,
  technologyIntro,
  technologyNews,
} from './sector-copy.mjs';
import {
  danBrown,
  danBrownInsights,
  energyHighlights,
  energyHow,
  energyInsights,
  energyIntro,
  energyNews,
} from './energy-copy.mjs';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const contentRoot = join(scriptsDir, '..', 'serialized-content');
const siteRoot = join(contentRoot, 'ashurst', 'ashurst');
const DATA_ID = 'd3957d41-e553-45a1-b51e-21c97c9a5ccd';
const HOME_ID = '1a784bdd-39e2-4ed4-be9f-7c7d413ab256';
const PAGE_TEMPLATE = '44815917-d191-4b69-bf54-951b0852b0c9';
const VARIANT_FOLDER_TEMPLATE = '49c111d0-6867-4798-a724-1f103166e6e9';
const VARIANT_TEMPLATE = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const VARIANTS_ROOT = 'dd0366c3-7393-44b6-9b69-d70f506618be';
const SITE_PATH = '/sitecore/content/ashurst/ashurst';
const ALL_INSIGHTS = 'E9D5CDC8-A2A9-4865-AA0A-0EBBB2C6294F';
const KEY_CONTACTS_FOLDER = 'eab4a2ae-8a26-41ca-a35c-ae1f57d5cc94';
const HEADER_DATA = '2f08154e-d922-43aa-b370-f681709faae0';
const FIELD_TEMPLATE = '455a3e98-a627-4b40-8035-e683a0331ac7';
const TITLE_FIELD = 'ac44656d-89b1-466f-9f99-8a4b7ca2dba7';
const NAV_FIELD = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const MEDIA = {
  financial: 'ea443389-9768-42c1-a30f-069ceb5fdbfd',
  technology: '96bda139-72a2-4981-b025-03ed82a666db',
  lee: 'bf53ba67-d974-48e8-9055-b845ef16380c',
  dax: '8c6720f5-9ba0-4134-a4f3-9982b388dcc4',
  judy: 'ca3c205a-3904-4c89-bbfe-e3967ffe24b8',
  tihana: 'be7807ab-8526-47f8-98d0-806aca1d6a3f',
  energy: '0467b7f7-69e2-4f4a-9e97-1cb1b7959f52',
  dan: 'd65f112b-1c1b-4a2f-959f-8308b76fa339',
  buck: '6a0b1dcf-8b14-4ac4-ae14-c469b28fa8f9',
};
const KEY_CONTACTS_DATA = 'fc92136e-d51f-457a-a2c9-e1f947c906ab';

const reserved = ['a1e9', 'b40e', 'b803', '0e0a', 'c4c0', 'a50c', '4ec1'];
const idsPath = join(scriptsDir, 'sector-ids.json');
const ids = existsSync(idsPath) ? JSON.parse(readFileSync(idsPath, 'utf8')) : {};
const stable = (key) => {
  if (!ids[key]) {
    let value = randomUUID();
    while (reserved.some((prefix) => value.startsWith(prefix))) value = randomUUID();
    ids[key] = value;
  }
  return ids[key];
};

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
  return { file, itemId, path, componentName };
}

const items = walk(contentRoot).map(readItem);
const renderingByName = new Map(items.filter((item) => item.componentName).map((item) => [item.componentName, item]));
const templateByPath = new Map(items.map((item) => [item.path, item]));
const upper = (value) => `{${value.replace(/[{}]/g, '').toUpperCase()}}`;

function templateId(component) {
  return templateByPath.get(`/sitecore/templates/Project/ashurst/${component} Templates/${component}`).itemId;
}

function fieldId(component, field) {
  return templateByPath.get(`/sitecore/templates/Project/ashurst/${component} Templates/${component}/Data/${field}`).itemId;
}

function block(value, indent) {
  const pad = ' '.repeat(indent);
  return `|\n${String(value)
    .split('\n')
    .map((line) => `${pad}${line}`)
    .join('\n')}`;
}

function writeItem({ itemId, parent, template, path, shared = [], fields = [] }) {
  const relative = path.startsWith(SITE_PATH) ? path.replace(`${SITE_PATH}/`, '') : null;
  const disk = relative
    ? join(siteRoot, ...relative.split('/')) + '.yml'
    : join(contentRoot, ...path.replace('/sitecore/', '').split('/')) + '.yml';
  mkdirSync(dirname(disk), { recursive: true });
  const sharedYaml = (shared.length
    ? shared
    : [{ id: 'dbbbeca1-21c7-4906-9dd2-493c1efa59a2', hint: '__Shared revision', value: stable(`${itemId}-rev`) }]
  )
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
${sharedYaml}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${fieldYaml || '    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"\n      Hint: __Created\n      Value: 20261015T160000Z'}
`;
  writeFileSync(disk, body, 'utf8');
  return itemId;
}

function layout(entries) {
  const lines = entries.map((entry, index) => {
    const position = index === 0 ? 'p:before="*"' : `p:after="r[@uid='${upper(entries[index - 1].uid)}']"`;
    const ds = entry.ds ? `\n          s:ds="${entry.ds}"` : '';
    const encoded = entry.par.replace(/&/g, '&amp;');
    return `        <r
          uid="${upper(entry.uid)}"
          ${position}${ds}
          s:id="${upper(entry.renderingId)}"
          s:par="${encoded}"
          s:ph="${entry.ph}" />`;
  });
  return `<r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}" l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
${lines.join('\n')}
      </d>
    </r>`;
}

function par(variantId) {
  const fieldNames = `%7B${variantId.replace(/[{}]/g, '').toUpperCase()}%7D`;
  return `GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&FieldNames=${fieldNames}&Styles&RenderingIdentifier&CSSStyles&DynamicPlaceholderId=1`;
}

function ensureVariant(component) {
  const folderPath = `${SITE_PATH}/Presentation/Headless Variants/${component}`;
  const variantPath = `${folderPath}/Default`;
  const existingFolder = items.find((item) => item.path === folderPath);
  const folder = existingFolder?.itemId ?? stable(`variant-folder-${component}`);
  if (!existingFolder) {
    writeItem({
      itemId: folder,
      parent: VARIANTS_ROOT,
      template: VARIANT_FOLDER_TEMPLATE,
      path: folderPath,
      fields: [],
    });
  }
  const existingVariant = items.find((item) => item.path === variantPath);
  const variant = existingVariant?.itemId ?? stable(`variant-${component}`);
  if (!existingVariant) {
    writeItem({
      itemId: variant,
      parent: folder,
      template: VARIANT_TEMPLATE,
      path: variantPath,
      fields: [],
    });
  }
  return variant;
}

const dataFolders = new Map();
function dataFolder(component) {
  if (component === 'KeyContacts') return KEY_CONTACTS_FOLDER;
  if (dataFolders.has(component)) return dataFolders.get(component);
  const path = `${SITE_PATH}/Data/${component}`;
  const existing = items.find((item) => item.path === path);
  if (existing) {
    dataFolders.set(component, existing.itemId);
    return existing.itemId;
  }
  const folder = stable(`data-${component}`);
  writeItem({
    itemId: folder,
    parent: DATA_ID,
    template: templateByPath.get(`/sitecore/templates/Project/ashurst/${component} Templates/${component} Folder`).itemId,
    path,
    fields: [],
  });
  dataFolders.set(component, folder);
  return folder;
}

function datasource(component, name, values) {
  const itemId = stable(`ds-${component}-${name}`);
  const fields = Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([hint, value]) => ({ id: fieldId(component, hint), hint, value }));
  writeItem({
    itemId,
    parent: dataFolder(component),
    template: templateId(component),
    path: `${SITE_PATH}/Data/${component}/${name}`,
    fields,
  });
  return itemId;
}

function rendering(component, ds) {
  const variant = ensureVariant(component);
  return {
    uid: stable(`uid-${component}-${ds}`),
    renderingId: renderingByName.get(component).itemId,
    ds,
    ph: 'headless-main',
    par: par(variant),
  };
}

const link = (text, itemId) =>
  `<link text="${text}" anchor="" linktype="internal" class="" title="" target="" querystring="" id="${upper(itemId)}" />`;
const image = (id) => `<image mediaid="${upper(id)}" />`;

function accordion(name, title, entries) {
  const values = { Title: title };
  entries.forEach((entry, index) => {
    const slot = index + 1;
    values[`Item${slot}Title`] = entry.title;
    values[`Item${slot}Teaser`] = entry.teaser;
    values[`Item${slot}Body`] = entry.body;
  });
  return datasource('SectorAccordion', name, values);
}

function carousel(name, title, cards) {
  const values = { Title: title, ViewAll: link('View all', ALL_INSIGHTS) };
  cards.forEach(([tag, cardTitle, date], index) => {
    const slot = index + 1;
    values[`Card${slot}Tag`] = tag;
    values[`Card${slot}Title`] = cardTitle;
    values[`Card${slot}Date`] = date;
    values[`Card${slot}Link`] = link(discover, ALL_INSIGHTS);
  });
  return datasource('SectorCarousel', name, values);
}

function highlights(name, cards) {
  const values = {};
  cards.forEach((card, index) => {
    const slot = index + 1;
    values[`Card${slot}Kicker`] = card.kicker;
    values[`Card${slot}Title`] = card.title;
    values[`Card${slot}Body`] = card.body;
  });
  return datasource('SectorHighlights', name, values);
}

function capabilities(name, groups) {
  const values = { Title: 'Our Capabilities' };
  groups.forEach((group, index) => {
    const slot = index + 1;
    values[`Group${slot}Title`] = group.title;
    values[`Group${slot}Items`] = group.items;
  });
  return datasource('SectorCapabilities', name, values);
}

function page(name, parent, title, entries) {
  const itemId = stable(`page-${name}`);
  writeItem({
    itemId,
    parent,
    template: PAGE_TEMPLATE,
    path: `${SITE_PATH}/Home/${name}`,
    shared: [{ id: 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e', hint: '__Renderings', value: layout(entries) }],
    fields: [
      { id: TITLE_FIELD, hint: 'Title', value: title },
      { id: NAV_FIELD, hint: 'NavigationTitle', value: title },
    ],
  });
  return itemId;
}

[1, 2, 3, 4].forEach((slot) =>
  templateField(
    'KeyContacts',
    KEY_CONTACTS_DATA,
    `Contact${slot}Link`,
    `Contact ${slot} profile link`,
    slot * 100 + 130,
    stable(`keycontacts-link-${slot}`)
  )
);

const sectorsIntro = datasource('SectorIntro', 'Sectors', {
  Body: '<p>Ashurst Perkins Coie supports clients in the sectors shaping the future economy from technology, energy and infrastructure, financial services and more.</p><p><a href="/sectors/energy-and-infrastructure">Energy &amp; Infrastructure</a></p><p><a href="/sectors/financial-services">Financial Services</a></p><p><a href="/sectors/technology">Technology</a></p>',
});
const sectorsHero = datasource('SectorHero', 'Sectors', {
  Eyebrow: 'Sectors',
  Title: 'Sectors',
  Intro: '<p>Technology, energy and infrastructure, financial services, and more.</p>',
});

const financialPageId = stable('page-sectors/financial-services');
const technologyPageId = stable('page-sectors/technology');

const financialHero = datasource('SectorHero', 'Financial Services', {
  Eyebrow: 'Sector strengths',
  Title: 'Financial Services',
  Intro: '<p>Guiding financial institutions and fintech companies into tomorrow with a proven track record of pioneering legal solutions.</p>',
  Image: image(MEDIA.financial),
});
const financialBody = datasource('SectorIntro', 'Financial Services', { Body: financialIntro });
const financialPeople = datasource('KeyContacts', 'Financial Services', {
  Title: 'Meet our people',
  Contact1Name: 'Lee Doyle',
  Contact1Role: 'Global Sector Leader, Financial Services · London · +44 20 7859 1837',
  Contact1Image: image(MEDIA.lee),
  Contact2Name: 'J. Dax Hansen',
  Contact2Role: 'Global Sector Leader, Financial Services · Seattle · 206.359.6324',
  Contact2Image: image(MEDIA.dax),
});

const technologyHero = datasource('SectorHero', 'Technology', {
  Eyebrow: 'Sector strengths',
  Title: 'Technology',
  Intro: '<p>Guiding the innovators shaping technology</p>',
  Image: image(MEDIA.technology),
});
const technologyBody = datasource('SectorIntro', 'Technology', { Body: technologyIntro });
const technologyPeople = datasource('KeyContacts', 'Technology', {
  Title: 'Meet our people',
  Contact1Name: 'Judy Jennison',
  Contact1Role: 'Global Sector Leader, Technology · Seattle · 206.359.3489',
  Contact1Image: image(MEDIA.judy),
  Contact2Name: 'Tihana Zuk',
  Contact2Role: 'Regional Sector Leader, Technology · Sydney · +61 2 9258 6343',
  Contact2Image: image(MEDIA.tihana),
});

const sectorsId = page('sectors', HOME_ID, 'Sectors', [
  rendering('SectorHero', sectorsHero),
  rendering('SectorIntro', sectorsIntro),
]);

page('sectors/financial-services', sectorsId, 'Financial Services', [
  rendering('SectorHero', financialHero),
  rendering('SectorIntro', financialBody),
  rendering('SectorAccordion', accordion('Financial Who', 'Who we help', financialWho)),
  rendering('SectorAccordion', accordion('Financial How', 'How we can help', financialHow)),
  rendering('SectorCapabilities', capabilities('Financial Services', capabilityGroups)),
  rendering('SectorCarousel', carousel('Financial Insights', 'Related insights', financialInsights)),
  rendering('SectorCarousel', carousel('Financial News', 'Related news', financialNews)),
  rendering('KeyContacts', financialPeople),
]);

page('sectors/technology', sectorsId, 'Technology', [
  rendering('SectorHero', technologyHero),
  rendering('SectorIntro', technologyBody),
  rendering('SectorHighlights', highlights('Technology', technologyHighlights)),
  rendering('SectorAccordion', accordion('Technology How', 'How we can help', technologyHow)),
  rendering('SectorCarousel', carousel('Technology Insights', 'Related insights', technologyInsights)),
  rendering('SectorCarousel', carousel('Technology News', 'Related news', technologyNews)),
  rendering('KeyContacts', technologyPeople),
]);

const energyPageId = stable('page-sectors/energy-and-infrastructure');
const danBrownPageId = stable('page-people/dan-brown');

const energyHero = datasource('SectorHero', 'Energy and Infrastructure', {
  Eyebrow: 'Sector strengths',
  Title: 'Energy & Infrastructure',
  Intro: '<p>The strategic partner for clients shaping the systems that underpin the economies of tomorrow—delivering secure energy, resilient infrastructure, and sustainable growth</p>',
  Image: image(MEDIA.energy),
});
const energyBody = datasource('SectorIntro', 'Energy and Infrastructure', { Body: energyIntro });
const energyPeople = datasource('KeyContacts', 'Energy and Infrastructure', {
  Title: 'Meet our people',
  Contact1Name: 'Dan Brown',
  Contact1Role: 'Global Sector Leader, Energy and Infrastructure · Brisbane · +61 7 3259 7149',
  Contact1Image: image(MEDIA.dan),
  Contact1Link: link('Dan Brown', danBrownPageId),
  Contact2Name: 'Buck Endemann',
  Contact2Role: 'Global Sector Leader, Energy and Infrastructure · San Francisco · 415.344.7022',
  Contact2Image: image(MEDIA.buck),
});

page('sectors/energy-and-infrastructure', sectorsId, 'Energy & Infrastructure', [
  rendering('SectorHero', energyHero),
  rendering('SectorIntro', energyBody),
  rendering('SectorHighlights', highlights('Energy and Infrastructure', energyHighlights)),
  rendering('SectorAccordion', accordion('Energy How', 'How we can help', energyHow)),
  rendering('SectorCarousel', carousel('Energy Insights', 'Related insights', energyInsights)),
  rendering('SectorCarousel', carousel('Energy News', 'Related news', energyNews)),
  rendering('KeyContacts', energyPeople),
]);

const peopleHero = datasource('SectorHero', 'People', {
  Eyebrow: 'People',
  Title: 'Our people',
  Intro: '<p>More than 3,500 client-facing practitioners across 52 offices, working as one integrated team.</p>',
});
const peopleFeatured = datasource('KeyContacts', 'People', {
  Title: 'Featured people',
  Contact1Name: 'Dan Brown',
  Contact1Role: 'Global Sector Leader, Energy and Infrastructure · Brisbane',
  Contact1Image: image(MEDIA.dan),
  Contact1Link: link('Dan Brown', danBrownPageId),
  Contact2Name: 'Buck Endemann',
  Contact2Role: 'Global Sector Leader, Energy and Infrastructure · San Francisco',
  Contact2Image: image(MEDIA.buck),
  Contact3Name: 'Judy Jennison',
  Contact3Role: 'Global Sector Leader, Technology · Seattle',
  Contact3Image: image(MEDIA.judy),
  Contact4Name: 'Lee Doyle',
  Contact4Role: 'Global Sector Leader, Financial Services · London',
  Contact4Image: image(MEDIA.lee),
});

const peopleId = page('people', HOME_ID, 'People', [
  rendering('SectorHero', peopleHero),
  rendering('KeyContacts', peopleFeatured),
]);

const danBrownProfile = datasource('LawyerProfile', 'Dan Brown', {
  Name: danBrown.name,
  Role: danBrown.role,
  Office: danBrown.office,
  Image: image(MEDIA.dan),
  Phone: danBrown.phone,
  Mobile: danBrown.mobile,
  Email: danBrown.email,
  LinkedIn: `<link text="LinkedIn" linktype="external" url="${danBrown.linkedIn}" anchor="" target="_blank" />`,
  Headline: danBrown.headline,
  Bio: danBrown.bio,
  Quote: danBrown.quote,
  QuoteSource: danBrown.quoteSource,
  Sectors: danBrown.sectors,
  Services: danBrown.services,
  Experience: danBrown.experience,
});

page('people/dan-brown', peopleId, 'Dan Brown', [
  rendering('LawyerProfile', danBrownProfile),
  rendering('SectorCarousel', carousel('Dan Brown Insights', 'Latest thinking', danBrownInsights)),
]);

function headerField(name, title, sort, itemId) {
  templateField('Header', HEADER_DATA, name, title, sort, itemId);
}

function templateField(component, parent, name, title, sort, itemId, type = 'General Link') {
  const path = `/sitecore/templates/Project/ashurst/${component} Templates/${component}/Data/${name}`;
  const disk = join(contentRoot, 'templates', 'ashurst', `${component} Templates`, component, 'Data', `${name}.yml`);
  mkdirSync(dirname(disk), { recursive: true });
  templateByPath.set(path, { itemId, path });
  writeFileSync(
    disk,
    `---
ID: "${itemId}"
Parent: "${parent}"
Template: "${FIELD_TEMPLATE}"
Path: "${path}"
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "${type}"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: ${sort}
Languages:
- Language: en
  Fields:
  - ID: "19a69332-a23e-4e70-8d16-b2640cb24cc8"
    Hint: Title
    Value: ${title}
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20261015T160000Z
`,
    'utf8'
  );
}

const financialLinkId = stable('header-fs-link');
const technologyLinkId = stable('header-tech-link');
headerField('FinancialServicesLink', 'Financial services link', 810, financialLinkId);
headerField('TechnologyLink', 'Technology link', 820, technologyLinkId);
const energyLinkId = stable('header-energy-link');
const peopleLinkId = stable('header-people-link');
headerField('EnergyLink', 'Energy and infrastructure link', 805, energyLinkId);
headerField('PeopleLink', 'People link', 150, peopleLinkId);

const headerPath = join(siteRoot, 'Data', 'Header', 'Header.yml');
let header = readFileSync(headerPath, 'utf8');
const LOCATIONS_LABEL = '    - ID: "5529435c-d038-4d8d-8594-3d1e2365ac82"';
const headerValue = (hint, fieldItemId, value) => {
  if (header.includes(`Hint: ${hint}\n`) || header.includes(`Hint: ${hint}\r\n`)) return;
  const eol = header.includes('\r\n') ? '\r\n' : '\n';
  const entry = [`    - ID: "${fieldItemId}"`, `      Hint: ${hint}`, '      Value: |', `        ${value}`, ''].join(eol);
  header = header.replace(LOCATIONS_LABEL, entry + LOCATIONS_LABEL);
};
headerValue('EnergyLink', energyLinkId, link('Energy & Infrastructure', energyPageId).replace('&', '&amp;'));
headerValue('PeopleLink', peopleLinkId, link('People', peopleId));
writeFileSync(headerPath, header, 'utf8');
if (!header.includes('Hint: FinancialServicesLink') || !header.includes('Hint: TechnologyLink')) {
  throw new Error('Header sector links were not written.');
}
writeFileSync(idsPath, JSON.stringify(ids, null, 2));
console.log('sectors', sectorsId);
console.log('financial-services', financialPageId);
console.log('technology', technologyPageId);
console.log('energy-and-infrastructure', energyPageId);
console.log('people', peopleId);
console.log('people/dan-brown', danBrownPageId);

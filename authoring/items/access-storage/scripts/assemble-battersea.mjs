import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const content = join(here, '..', 'serialized-content', 'access-storage', 'access-storage');
const renderings = join(here, '..', 'serialized-content', 'renderings', 'access-storage');
const templates = join(here, '..', 'serialized-content', 'templates', 'access-storage');
const idsPath = join(here, 'access-ids.json');

const DATA = '12771bb5-499c-47f4-bc2b-d896379ae511';
const HOME = 'b68ab8c3-c571-4042-aecc-3191c90a3085';
const STORES = '4fd0328d-8c44-49fd-8623-2c2afcfd03da';
const HEADER = '8164abe3-c860-480d-94b0-6de4c45a1d51';
const FOOTER = '2022feb3-a08f-476b-987a-9f2d4cbcd64b';
const PAGE = 'a1d11583-d7d7-4380-8965-36ec42622941';
const TITLE = '84bc313a-076a-495d-96eb-282a5fc108f6';
const NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const REVISION = 'dbbbeca1-21c7-4906-9dd2-493c1efa59a2';
const CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';

const ids = existsSync(idsPath) ? JSON.parse(readFileSync(idsPath, 'utf8')) : {};
const id = (key) => {
  if (!ids[key]) ids[key] = randomUUID();
  return ids[key];
};

const south = '6a91c4e2-7b18-4d55-9e30-1f8a2c6d44b7';
const battersea = '3e7b9a14-5c62-4f08-a1d6-8b04e2f77c91';
const media = (url) => `<image mediaid="{MEDIA:${url}}" />`;
const internal = (text, itemId) =>
  `<link text="${text}" anchor="" linktype="internal" class="" title="" target="" querystring="" id="{${itemId.toUpperCase()}}" />`;

const readId = (file) => {
  const match = readFileSync(file, 'utf8').match(/^ID: "([^"]+)"/m);
  if (!match) throw new Error(`No ID in ${file}`);
  return match[1];
};
const fieldsFor = (name) => {
  const dir = join(templates, `${name} Templates`, name, 'Data');
  return Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.yml'))
      .map((file) => [file.replace(/\.yml$/, ''), readId(join(dir, file))])
  );
};
const renderingId = (name) => readId(join(renderings, `${name}.yml`));
const templateId = (name) => readId(join(templates, `${name} Templates`, `${name}.yml`));
const indent = (value, spaces) =>
  String(value)
    .split('\n')
    .map((line) => `${' '.repeat(spaces)}${line}`)
    .join('\n');
const fieldBlock = (entries) =>
  entries
    .map(
      ([fieldId, hint, value]) =>
        `    - ID: "${fieldId}"\n      Hint: ${hint}\n      Value: |\n${indent(value, 8)}`
    )
    .join('\n');

const writeItem = (relative, item) => {
  const file = join(content, relative);
  mkdirSync(dirname(file), { recursive: true });
  const shared = [
    `- ID: "${REVISION}"`,
    '  Hint: __Shared revision',
    `  Value: "${id(`rev-${item.id}`)}"`,
  ];
  if (item.renderings) {
    shared.push(`- ID: "${RENDERINGS}"`, '  Hint: __Renderings', '  Value: |', indent(item.renderings, 4));
  }
  writeFileSync(
    file,
    `---
ID: "${item.id}"
Parent: "${item.parent}"
Template: "${item.template}"
Path: "${item.path}"
SharedFields:
${shared.join('\n')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${fieldBlock(item.fields)}
`,
    'utf8'
  );
};

const layout = (rows) => {
  const parts = rows.map((row, index) => {
    const uid = id(`uid-${row.key}`).toUpperCase();
    const position =
      index === 0
        ? 'p:before="*"'
        : `p:after="r[@uid='{${id(`uid-${rows[index - 1].key}`).toUpperCase()}}']"`;
    return `<r uid="{${uid}}" ${position} s:ds="${row.ds}" s:id="{${row.rendering.toUpperCase()}}" s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=1" s:ph="${row.ph}" />`;
  });
  return `<r xmlns:p="p" xmlns:s="s" p:p="1">\n  <d id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}" l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">\n    ${parts.join('\n    ')}\n  </d>\n</r>`;
};

const ds = (name, itemName, values) => {
  const itemId = id(`ds-${name}-${itemName}`);
  const fieldIds = fieldsFor(name);
  const fields = Object.entries(values)
    .filter(([, value]) => value)
    .map(([fieldName, value]) => {
      const fieldId = fieldIds[fieldName];
      if (!fieldId) throw new Error(`${name} has no field ${fieldName}`);
      return [fieldId, fieldName, value];
    });
  fields.push([CREATED, '__Created', '20261021T180000Z']);
  writeItem(`Data/${itemName}.yml`, {
    id: itemId,
    parent: DATA,
    template: templateId(name),
    path: `/sitecore/content/access-storage/access-storage/Data/${itemName}`,
    fields,
  });
  return itemId;
};

const quote = internal('Get a quote for Battersea', STORES);
const front =
  'https://www.accessstorage.com/-/media/accessstorage/images/stores/battersea/access-self-storage-battersea-building-front.jpg';
const building =
  'https://www.accessstorage.com/-/media/accessstorage/images/stores/battersea/access-self-storage-battersea-building.jpg';
const large =
  'https://www.accessstorage.com/-/media/accessstorage/images/stores/battersea/access-self-storage-battersea-large-unit.jpg';
const bay =
  'https://www.accessstorage.com/-/media/accessstorage/images/stores/battersea/access-self-storage-battersea-loading-bay.jpg';
const acre =
  'https://www.accessstorage.com/-/media/accessstorage/images/stores/acre-lane/access-storage-acre-lane-building.jpg';
const balham =
  'https://www.accessstorage.com/-/media/accessstorage/images/stores/balham/access-self-storage-balham-store-front.jpg';

const hero = ds('StoreHero', 'Battersea Hero', {
  Crumb: '<p><a href="/">Home</a> / <a href="/south-london">South London</a> / Battersea</p>',
  Title: 'Self Storage in Battersea',
  Offer: '50% off your first 13 weeks',
  Subtitle: "No deposit. We'll beat any local price. Near Clapham Junction.",
  Link: quote,
  Image1: media(front),
  Image2: media(building),
  Image3: media(large),
  Image4: media(bay),
});
const facts = ds('StoreFacts', 'Battersea Facts', {
  Title: 'Is Access Self Storage Battersea safe and secure?',
  Intro:
    '<p>Access Self Storage Battersea is a self storage facility at 248 York Road, SW11 3SJ, serving Wandsworth town, Nine Elms and Fulham.</p><p>Yes, the facility is secure. It operates 24-hour CCTV monitoring, individually alarmed rooms, a secure access app and a gated and fenced perimeter.</p>',
  Fact1Label: 'Location',
  Fact1Value: '248 York Road, SW11 3SJ',
  Fact2Label: 'CCTV',
  Fact2Value: '24-hour monitoring',
  Fact3Label: 'Alarms',
  Fact3Value: 'Individually alarmed rooms',
  Fact4Label: 'Access',
  Fact4Value: 'Secure access app',
  Fact5Label: 'Perimeter',
  Fact5Value: 'Gated and fenced',
  Fact6Label: 'Loading',
  Fact6Value: 'Covered loading bay',
  HoursTitle: 'Store and reception opening hours',
  Hours:
    '<ul><li>Monday to Friday: 08:30 - 18:00</li><li>Saturday: 08:30 - 17:00</li><li>Sunday: 10:00 - 16:00</li><li>24 and 31 December: 08:30 - 16:00</li><li>25 and 26 December, and 1 January: closed</li></ul>',
  ContactTitle: 'Contact us and address',
  Contact:
    '<p>Phone: 020 4515 3945</p><p>Email: battersea@accessstorage.com</p><p>248 York Road, Battersea, London, SW11 3SJ</p>',
});
const sizes = ds('UnitSizes', 'Battersea Sizes', {
  Title: 'How much space do you need?',
  Intro: 'Select from our most popular unit sizes and get a quote to continue.',
  Size1: '6 sq.ft.',
  Size2: '9 sq.ft.',
  Size3: '10 sq.ft.',
  Size4: '16 sq.ft.',
  Size5: '20 sq.ft.',
  Size6: '25 sq.ft.',
  Size7: '35 sq.ft.',
  Size8: '50 sq.ft.',
  Link: quote,
});
const features = ds('RichText', 'Battersea Features', {
  Body: '<h2>Store features</h2><ul><li>24hr CCTV</li><li>Secure access app</li><li>Covered loading bay</li><li>Alarmed rooms</li><li>Gated and fenced perimeter</li><li>Free use of trolleys</li><li>Extended hours access available, subject to approval</li><li>Large vehicle access</li><li>Free use of pallet truck</li><li>Forklifting service</li></ul>',
});
const faq = ds('FaqList', 'Battersea Faq', {
  Title: 'About our Battersea storage and services',
  Item1Question: 'Do we offer flexible rental terms for storage units?',
  Item1Answer:
    '<p>Yes. Units are on a monthly rolling basis, so you can store for as little as a week or for as long as you need. You can upsize or downsize as your needs change.</p>',
  Item2Question: 'What unit sizes are available at Battersea?',
  Item2Answer:
    '<p>From small lockers at 9 sq ft to 5 ft by 5 ft, 10 ft by 10 ft, 10 ft by 30 ft, and spaces up to 400 sq ft.</p>',
  Item3Question: 'How secure is the Battersea facility?',
  Item3Answer:
    '<p>The store has 24-hour digital CCTV, alarms for the building and for each unit, and coded electronic access with a unique PIN. You hold the only key to your room.</p>',
  Item4Question: 'Where is Access Self Storage Battersea located?',
  Item4Answer:
    '<p>248 York Road, Battersea, London, SW11 3SJ, just after Wandsworth Bridge. It is a few minutes walk from Clapham Junction and Wandsworth Town stations, with on-site parking.</p>',
  Group1Title: 'Battersea access, pricing and booking',
  Group1Body:
    '<p><strong>Can someone else access my storage unit?</strong> Only with your permission. You can add named family members, friends, or colleagues to your account.</p><p><strong>What are the access hours?</strong> Customers have free access seven days a week during opening hours: Monday to Friday 8:30 to 18:00, Saturday 8:30 to 17:00, Sunday 10:00 to 16:00.</p><p><strong>Do you offer discounts?</strong> New customers can get 50% off for up to 13 weeks. Ask about the current offer when you get a quote.</p>',
  Group2Title: 'Battersea location and amenities',
  Group2Body:
    '<p><strong>Do you provide packing supplies?</strong> Yes. Boxes, bubble wrap, and tape are available in store.</p><p><strong>Do you provide parking and loading?</strong> Yes. Parking is free for customers, with a covered loading bay, trolleys, and a pallet truck.</p>',
});
const services = ds('LinkRow', 'Battersea Services', {
  Card1Title: 'Office space',
  Card1Text: 'Get a quote',
  Card2Title: 'Parking space',
  Card2Text: 'Get a quote',
  Card3Title: 'Records management',
  Card3Text: 'Get a quote',
});
const cta = ds('QuoteCta', 'Battersea Cta', {
  Title: 'Get 50% off up to 13 weeks storage at our Battersea store',
  Link: quote,
});
const nearby = ds('NearbyStores', 'Battersea Nearby', {
  Title: 'Storage units near Battersea',
  Card1Title: 'Access Self Storage Clapham Acre Lane',
  Card1Text: '<p>141-157 Acre Lane, London, SW2 5UA</p><p>020 3965 6230</p><p>acrelane@accessstorage.com</p>',
  Card1Image: media(acre),
  Card1Link: internal('Get a quote', STORES),
  Card2Title: 'Access Self Storage Balham',
  Card2Text: '<p>25 Boundaries Road, Balham, London, SW12 8EU</p><p>020 4515 3734</p><p>balham@accessstorage.com</p>',
  Card2Image: media(balham),
  Card2Link: internal('Get a quote', STORES),
});
const about = ds('ExpandableCopy', 'Battersea About', {
  Title: 'Storage units in Battersea',
  Intro:
    'Access Self Storage Battersea is on York Road, reached from the entrance on Mendip Road. Homes and businesses in Battersea, Clapham Junction and Nine Elms use units from lockers to 400 square feet.',
  MoreLabel: 'Tell me more',
  LessLabel: 'Tell me less',
  Body: '<p>The store is outside the Congestion Charge zone and is used for house moves, decluttering, office space, and parking commercial vehicles. You can change unit size when you need to, and packing materials are available in store.</p><p>From Clapham Junction the store is about three minutes by car: leave on the north side, turn left onto Grant Road, right onto Plough Road, and left onto York Road. Parking is on Mendip Road. On foot it is about eleven minutes through York Gardens.</p><p>Kris manages the Battersea store and looks after maintenance and customer service. The store is a short trip from theatres, restaurants, and Kensington High Street.</p>',
});
const southCopy = ds('RichText', 'South London Intro', {
  Body: '<h1>Access Self Storage South London</h1><p>Stores across south London, including <a href="/south-london/access-self-storage-battersea">Access Self Storage Battersea</a> on York Road.</p>',
});

const row = (key, name, datasource, ph) => ({
  key,
  rendering: renderingId(name),
  ds: datasource,
  ph,
});

const page = (relative, itemId, parent, name, title, rows) => {
  writeItem(relative, {
    id: itemId,
    parent,
    template: PAGE,
    path: `/sitecore/content/access-storage/access-storage/Home/${name}`,
    renderings: layout(rows),
    fields: [
      [TITLE, 'Title', title],
      [NAV, 'NavigationTitle', title],
      [CREATED, '__Created', '20261021T180000Z'],
    ],
  });
};

page('Home/south-london.yml', south, HOME, 'south-london', 'South London', [
  row('sl-header', 'Header', HEADER, 'headless-header'),
  row('sl-copy', 'RichText', southCopy, 'headless-main'),
  row('sl-footer', 'Footer', FOOTER, 'headless-footer'),
]);

page(
  'Home/south-london/access-self-storage-battersea.yml',
  battersea,
  south,
  'south-london/access-self-storage-battersea',
  'Battersea',
  [
    row('bt-header', 'Header', HEADER, 'headless-header'),
    row('bt-hero', 'StoreHero', hero, 'headless-main'),
    row('bt-facts', 'StoreFacts', facts, 'headless-main'),
    row('bt-sizes', 'UnitSizes', sizes, 'headless-main'),
    row('bt-features', 'RichText', features, 'headless-main'),
    row('bt-faq', 'FaqList', faq, 'headless-main'),
    row('bt-services', 'LinkRow', services, 'headless-main'),
    row('bt-cta', 'QuoteCta', cta, 'headless-main'),
    row('bt-nearby', 'NearbyStores', nearby, 'headless-main'),
    row('bt-about', 'ExpandableCopy', about, 'headless-main'),
    row('bt-footer', 'Footer', FOOTER, 'headless-footer'),
  ]
);

const available = join(content, 'Presentation', 'Available Renderings', 'Access Storage.yml');
let availableYaml = readFileSync(available, 'utf8');
for (const name of ['StoreHero', 'StoreFacts', 'UnitSizes', 'NearbyStores']) {
  const token = `{${renderingId(name).toUpperCase()}}`;
  if (!availableYaml.includes(token)) {
    availableYaml = availableYaml.replace(
      'Hint: Renderings\n  Value: |\n',
      `Hint: Renderings\n  Value: |\n    ${token}\n`
    );
  }
}
writeFileSync(available, availableYaml, 'utf8');

const link = '<li><a href="/south-london/access-self-storage-battersea">Access Self Storage Battersea</a></li>';
for (const fileName of ['Store Finder.yml', 'Home Faq.yml']) {
  const file = join(content, 'Data', fileName);
  const text = readFileSync(file, 'utf8').replace('<li>Access Self Storage Battersea</li>', link);
  writeFileSync(file, text, 'utf8');
}

const urls = new Set();
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.yml')) {
      for (const match of readFileSync(full, 'utf8').matchAll(/\{MEDIA:([^}]+)\}/g)) urls.add(match[1]);
    }
  }
};
walk(join(content, 'Data'));
writeFileSync(
  join(here, 'media-assets.json'),
  JSON.stringify([...urls].map((url) => ({ Url: url, Alt: url.split('/').pop().replace(/\.[^.]+$/, '') })), null, 2)
);
writeFileSync(idsPath, JSON.stringify(ids, null, 2));
console.log('pages', south, battersea);
console.log('images', urls.size);

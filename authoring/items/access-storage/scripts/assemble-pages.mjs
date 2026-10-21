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
const PAGE = 'a1d11583-d7d7-4380-8965-36ec42622941';
const TITLE = '84bc313a-076a-495d-96eb-282a5fc108f6';
const NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const REVISION = 'dbbbeca1-21c7-4906-9dd2-493c1efa59a2';
const AVAILABLE = '5291b993-eef7-4b73-934c-3872e7d4c22c';
const CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';

const ids = existsSync(idsPath) ? JSON.parse(readFileSync(idsPath, 'utf8')) : {};
const id = (key) => {
  if (!ids[key]) ids[key] = randomUUID();
  return ids[key];
};

const selfPage = id('page-self-storage');
const storesPage = id('page-our-stores');
const logo = 'https://www.accessstorage.com/-/media/images/brand/access-brand-logo-final.png';
const hero = 'https://www.accessstorage.com/-/media/images/campaigns/home-mover/home-mover-hero-homepage.jpg';
const phone = 'https://www.accessstorage.com/-/media/images/hero/students/manchester-storage-smaller.png';
const unit = 'https://www.accessstorage.com/-/media/images/100sqft-content/100sq-ft-domestic.jpg';
const pageHeroImage =
  'https://www.accessstorage.com/-/media/images/campaigns/storage-page/self-storage-access-self-storage-near-me.jpg';
const welcome = 'https://www.accessstorage.com/-/media/images/misc-pages/welcome-to-access-self-storage.jpg';
const media = (url) => `<image mediaid="{MEDIA:${url}}" />`;
const internal = (text, itemId) =>
  `<link text="${text}" anchor="" linktype="internal" class="" title="" target="" querystring="" id="{${itemId}}" />`;

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
    shared.push(
      `- ID: "${RENDERINGS}"`,
      '  Hint: __Renderings',
      '  Value: |',
      indent(item.renderings, 4)
    );
  }
  const body = `---
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
`;
  writeFileSync(file, body, 'utf8');
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
  fields.push([CREATED, '__Created', '20261021T150000Z']);
  writeItem(`Data/${itemName}.yml`, {
    id: itemId,
    parent: DATA,
    template: templateId(name),
    path: `/sitecore/content/access-storage/access-storage/Data/${itemName}`,
    fields,
  });
  return itemId;
};

const london = [
  'Acton',
  'Alperton',
  'Balham',
  'Barking',
  'Battersea',
  'Brentford',
  'Brixton Hill',
  'Clapham Acre Lane',
  'Catford',
  'Charlton',
  'Cheam',
  'Chelsea',
  'Cricklewood',
  'Croydon',
  'Croydon Purley Way',
  'Ealing',
  'Edmonton',
  'Fulham',
  'Harrow',
  'Hayes',
  'Hornsey',
  'Isleworth',
  'Islington',
  'Kings Cross',
  'Kingston Upon Thames',
  'Mitcham',
  'Neasden',
  'Orpington',
  'Romford',
  'Streatham',
  'Sunbury',
  'Sutton',
  'Sydenham',
  'Twickenham',
  'Wandsworth',
  'Wembley',
  'West Norwood',
];
const outside = [
  'Basingstoke',
  'Birmingham Central',
  'Birmingham Erdington',
  'Birmingham Selly Oak',
  'Bracknell',
  'Bristol',
  'Coventry',
  'Derby',
  'Guildford',
  'Hemel Hempstead',
  'High Wycombe',
  'Manchester',
  'Northampton',
  'Nottingham',
  'Portsmouth',
  'Reading',
  'Southampton',
  'St Albans',
  'Stevenage',
];
const list = (title, names) =>
  `<h3>${title}</h3><ul>${names.map((name) => `<li>Access Self Storage ${name}</li>`).join('')}</ul>`;

const header = ds('Header', 'Header', {
  SignInLabel: 'Sign in',
  QuoteLink: internal('Get a quote', storesPage),
  SelfStorageLink: internal('Self storage', selfPage),
  BusinessLabel: 'Business services',
  StoresLink: internal('Our stores', storesPage),
  BoxesLabel: 'Boxes and packaging',
  OfficeLabel: 'Office space',
  Logo: media(logo),
});
const footer = ds('Footer', 'Footer', {
  Logo: media(logo),
  Columns:
    '<p><a href="/self-storage">Self storage</a></p><p><a href="/our-stores">Our stores</a></p><p>About us · Blog · Contact us · Careers · Sitemap</p>',
  Legal: '<p>Terms and Conditions · Privacy Policy · Cookie Policy · FAQs</p>',
});
const homePromo = ds('PromoBar', 'Home Promo', { Text: "We'll beat any local price*" });
const storagePromo = ds('PromoBar', 'Storage Promo', {
  Text: 'You can get 50% off up to 8 weeks storage. Don’t miss out!',
});
const quoteHero = ds('QuoteHero', 'Home Hero', {
  Title: 'Affordable self storage',
  Subtitle: 'Get a quote and rent online',
  Placeholder: 'Search by postcode or location',
  ButtonLabel: 'Get a quote',
  ButtonLink: internal('Get a quote', storesPage),
  Image: media(hero),
});
const trust = ds('TrustBar', 'Home Trust', {
  Item1Title: '24hr security',
  Item1Text: 'Your belongings stay protected',
  Item2Title: '50% introductory offer',
  Item2Text: 'First 8 weeks half price',
  Item3Title: 'Price promise',
  Item3Text: "We'll match a better local quote",
  Item4Title: 'Flexible terms',
  Item4Text: 'No long-term contract',
});
const offers = ds('OfferBand', 'Home Offers', {
  Card1Title: 'Excellent security',
  Card1Text: '<p>Our priority is the safety and security of your belongings.</p>',
  Card2Title: 'Price promise',
  Card2Text: '<p>If you find a better self storage quote locally we’ll happily match it. T&amp;Cs apply.</p>',
  Card3Title: 'Discount offers',
  Card3Text: '<p>50% off up to 8 weeks storage. Long-term storage discounts available. T&amp;Cs apply.</p>',
  Link: internal('Get a quote', storesPage),
});
const steps = ds('HowItWorks', 'Home Steps', {
  Title: 'How it works',
  Intro: "It's as simple as 1, 2, 3",
  Step1Title: 'Instant storage quote',
  Step1Text: 'Enter your postcode and choose your preferred store.',
  Step2Title: 'Reserve online with no deposit',
  Step2Text: 'Secure your storage instantly online, completely free.',
  Step3Title: 'Move into your storage unit',
  Step3Text: 'Flexible, short notice agreements for your convenience.',
  Link: internal('See storage prices and availability', storesPage),
  Image: media(phone),
});
const split = ds('ContentSplit', 'Home Split', {
  Title: 'Self storage units across London and the UK',
  Body: '<p>Whether you are moving home, decluttering, or need extra space for your business, Access Self Storage has a solution that fits. With 56 locations across London and the UK, there is always a store near you.</p><p>No deposit, no long-term contract. And if you find a cheaper quote locally, we will match it.</p>',
  Link: internal('Find your nearest store', storesPage),
  Image: media(unit),
});
const grid = ds('UseCaseGrid', 'Home Uses', {
  Title: 'We help our customers with',
  Card1Title: 'Moving home storage',
  Card1Image: media('https://www.accessstorage.com/-/media/images/homepage-page-blocks/home-mover.jpg'),
  Card2Title: 'Decluttering storage',
  Card2Image: media('https://www.accessstorage.com/-/media/images/homepage-page-blocks/declutterer.jpg'),
  Card3Title: 'Working from home storage',
  Card3Image: media('https://www.accessstorage.com/-/media/images/homepage-page-blocks/work-from-home.jpg'),
  Card4Title: 'Business storage',
  Card4Image: media('https://www.accessstorage.com/-/media/images/homepage-page-blocks/business.jpg'),
  Card5Title: 'Student storage',
  Card5Image: media('https://www.accessstorage.com/-/media/images/homepage-page-blocks/student.jpg'),
  Card6Title: 'Ecommerce storage',
  Card6Image: media('https://www.accessstorage.com/-/media/images/homepage-page-blocks/ecommerce.jpg'),
  Card7Title: 'Locker storage',
  Card7Image: media('https://www.accessstorage.com/-/media/images/campaigns/locker-storage/locker-storage3.png'),
  Card8Title: 'Personal storage',
  Card8Image: media(unit),
  Card9Title: 'Renovation storage',
  Card9Image: media(welcome),
});
const links = ds('LinkRow', 'Home Links', {
  Card1Title: 'How storage works',
  Card1Text: 'Read more',
  Card2Title: 'In the community',
  Card2Text: 'Read more',
  Card3Title: 'Buy boxes and packaging',
  Card3Text: 'Read more',
});
const copy = ds('ExpandableCopy', 'Home Why', {
  Title: 'Why choose us for self storage?',
  Intro:
    'Whether you need short-term or long-term storage, securely storing your items with us is simple, flexible and great value.',
  Body: '<p>With 56 stores nationwide, our friendly local teams will help you choose the right storage unit for you, from the size of a locker to the size of a football pitch. Once you have moved in, you will have full access to your unit within each store’s opening hours.</p>',
  MoreLabel: 'Tell me more',
  LessLabel: 'Tell me less',
});
const faq = ds('FaqList', 'Home Faq', {
  Title: 'Your questions, answered',
  Item1Question: 'How much does self storage cost?',
  Item1Answer:
    '<p>Prices vary by location and unit size. Use our quote tool to get live pricing at your nearest store. New customers get their first 8 weeks half price.</p>',
  Item2Question: 'Do I need to sign a long-term contract?',
  Item2Answer:
    '<p>No. All units are on flexible monthly rolling contracts. Personal customers can move out with as little as seven days’ notice.</p>',
  Item3Question: 'Do I need to pay a deposit?',
  Item3Answer: '<p>No deposit required. You can reserve your unit online completely free of charge.</p>',
  Item4Question: 'What sizes are available?',
  Item4Answer:
    '<p>From small lockers to large room-sized spaces. Our team at your nearest store will help you find the right fit.</p>',
  Group1Title: 'Stores in London',
  Group1Body: list('Stores in London', london),
  Group2Title: 'Stores outside London',
  Group2Body: list('Stores outside London', outside),
});
const pageHeroDs = ds('PageHero', 'Self Storage Hero', {
  Title: 'Secure self storage for your items. Get a quote now!',
  Intro: '<p><strong>Self storage made simple.</strong> Our self storage units offer secure, affordable, and flexible storage options for both short and long periods.</p>',
  Placeholder: 'Search by postcode or city',
  ButtonLabel: 'Get a quote',
  ButtonLink: internal('Get a quote', storesPage),
  Image: media(pageHeroImage),
});
const intro = ds('RichText', 'Self Storage Intro', {
  Body: '<p>With 56 stores nationwide, our friendly local teams will help you choose the right storage unit for you, from the size of a locker to the size of a football pitch.</p><p>At Access Self Storage, we provide a wide range of secure self storage units for personal and business customers. Our price promise means you’ll always get a great rate, and our flexible approach means that you can store your furniture, books, clothes, or whatever else you need to keep safe, with us for as little as one week.</p>',
});
const benefits = ds('BenefitList', 'Self Storage Benefits', {
  Title: 'Why use Access Self Storage?',
  Item1Text: 'No long-term contracts, pay monthly',
  Item2Text: 'Unbeatable service at the best prices',
  Item3Text: 'Flexible options to suit your needs',
  Item4Text: '24-hour access to storage units and offices (T&Cs apply)',
  Item5Text: 'Logistics and transport services',
  Item6Text: 'Full range of administration services',
});
const introSplit = ds('ContentSplit', 'Self Storage Split', {
  Title: 'Introduction to Access Self Storage',
  Body: '<p>Whether you need short-term or long-term storage, securely storing your items with us is simple, flexible and great value. Find out more about our stores.</p>',
  Link: internal('Find out more about our stores', storesPage),
  Image: media(welcome),
});
const cards = ds('CardCarousel', 'Self Storage Cards', {
  Card1Title: 'Declutter and free up space',
  Card1Text: 'Make room at home',
  Card1Image: media('https://www.accessstorage.com/-/media/images/homepage-page-blocks/declutterer.jpg'),
  Card2Title: 'Student storage',
  Card2Text: 'For the summer holidays',
  Card2Image: media('https://www.accessstorage.com/-/media/images/misc-pages/student-storage.jpg'),
  Card3Title: 'Locker storage',
  Card3Text: 'Compact, secure storage',
  Card3Image: media('https://www.accessstorage.com/-/media/images/campaigns/locker-storage/locker-storage3.png'),
  Card4Title: 'Temporary storage for moving house',
  Card4Text: 'Short notice agreements',
  Card4Image: media('https://www.accessstorage.com/-/media/images/misc-pages/access-storage-home-move.jpg'),
});
const cta = ds('QuoteCta', 'Furniture Cta', {
  Title: 'Interested in using Access for furniture storage?',
  Link: internal('Get a quote', storesPage),
});
const finder = ds('StoreFinder', 'Store Finder', {
  Title: 'Find a store near you',
  Placeholder: 'Search by postcode or location',
  ButtonLabel: 'Get a quote',
  ButtonLink: internal('Get a quote', storesPage),
  MapLabel: 'or see a map of locations',
  Locations: `${list('Stores in London', london)}${list('Stores outside London', outside)}`,
});

const row = (key, name, datasource, ph) => ({
  key,
  rendering: renderingId(name),
  ds: datasource,
  ph,
});

const homeLayout = layout([
  row('home-promo', 'PromoBar', homePromo, 'headless-header'),
  row('home-header', 'Header', header, 'headless-header'),
  row('home-hero', 'QuoteHero', quoteHero, 'headless-main'),
  row('home-trust', 'TrustBar', trust, 'headless-main'),
  row('home-offers', 'OfferBand', offers, 'headless-main'),
  row('home-steps', 'HowItWorks', steps, 'headless-main'),
  row('home-split', 'ContentSplit', split, 'headless-main'),
  row('home-grid', 'UseCaseGrid', grid, 'headless-main'),
  row('home-links', 'LinkRow', links, 'headless-main'),
  row('home-why', 'ExpandableCopy', copy, 'headless-main'),
  row('home-faq', 'FaqList', faq, 'headless-main'),
  row('home-footer', 'Footer', footer, 'headless-footer'),
]);

const homeFile = join(content, 'Home.yml');
let homeYaml = readFileSync(homeFile, 'utf8').replace(/\r\n/g, '\n');
if (homeYaml.includes('Hint: __Renderings')) {
  throw new Error('Home.yml already has renderings; refusing to duplicate them');
}
homeYaml = homeYaml.replace(
  'SharedFields:\n',
  `SharedFields:\n- ID: "${RENDERINGS}"\n  Hint: __Renderings\n  Value: |\n${indent(homeLayout, 4)}\n`
);
homeYaml = homeYaml.replace(
  /Hint: NavigationTitle\n      Value: "[^"]*"/,
  'Hint: NavigationTitle\n      Value: "Access Self Storage"'
);
homeYaml = homeYaml.replace(
  /Hint: Title\n      Value: "[^"]*"/,
  'Hint: Title\n      Value: "Access Self Storage"'
);
writeFileSync(homeFile, homeYaml, 'utf8');

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
      [CREATED, '__Created', '20261021T150000Z'],
    ],
  });
};

page('Home/self-storage.yml', selfPage, HOME, 'self-storage', 'Self storage', [
  row('ss-promo', 'PromoBar', storagePromo, 'headless-header'),
  row('ss-header', 'Header', header, 'headless-header'),
  row('ss-hero', 'PageHero', pageHeroDs, 'headless-main'),
  row('ss-intro', 'RichText', intro, 'headless-main'),
  row('ss-benefits', 'BenefitList', benefits, 'headless-main'),
  row('ss-split', 'ContentSplit', introSplit, 'headless-main'),
  row('ss-cards', 'CardCarousel', cards, 'headless-main'),
  row('ss-cta', 'QuoteCta', cta, 'headless-main'),
  row('ss-footer', 'Footer', footer, 'headless-footer'),
]);

page('Home/our-stores.yml', storesPage, HOME, 'our-stores', 'Our stores', [
  row('st-header', 'Header', header, 'headless-header'),
  row('st-finder', 'StoreFinder', finder, 'headless-main'),
  row('st-footer', 'Footer', footer, 'headless-footer'),
]);

const renderingNames = [
  'Header',
  'Footer',
  'PromoBar',
  'QuoteHero',
  'TrustBar',
  'OfferBand',
  'HowItWorks',
  'ContentSplit',
  'UseCaseGrid',
  'LinkRow',
  'ExpandableCopy',
  'FaqList',
  'PageHero',
  'RichText',
  'BenefitList',
  'CardCarousel',
  'QuoteCta',
  'StoreFinder',
];

writeFileSync(
  join(content, 'Presentation', 'Available Renderings', 'Access Storage.yml'),
  `---
ID: "${id('available-access')}"
Parent: "${AVAILABLE}"
Template: "76da0a8d-fc7e-42b2-af1e-205b49e43f98"
Path: "/sitecore/content/access-storage/access-storage/Presentation/Available Renderings/Access Storage"
SharedFields:
- ID: "715ae6c0-71c8-4744-ab4f-65362d20ad65"
  Hint: Renderings
  Value: |
${renderingNames.map((name) => `    {${renderingId(name).toUpperCase()}}`).join('\n')}
- ID: "${REVISION}"
  Hint: __Shared revision
  Value: "${id('rev-available')}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${CREATED}"
      Hint: __Created
      Value: 20261021T150000Z
`,
  'utf8'
);

const urls = new Set();
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.yml')) {
      const text = readFileSync(full, 'utf8');
      for (const match of text.matchAll(/\{MEDIA:([^}]+)\}/g)) urls.add(match[1]);
    }
  }
};
walk(join(content, 'Data'));
writeFileSync(
  join(here, 'media-assets.json'),
  JSON.stringify([...urls].map((url) => ({ Url: url, Alt: url.split('/').pop() })), null, 2)
);
writeFileSync(idsPath, JSON.stringify(ids, null, 2));
console.log(`pages ${selfPage} ${storesPage}`);
console.log(`images ${urls.size}`);

import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const generator = join(
  root,
  '.cursor/skills/sitecore-serialization-skills/sitecore-new-rendering-yaml/scripts/Generate-SitecoreRendering.mjs'
);
const fieldsDir = join(dirname(fileURLToPath(import.meta.url)), 'fields');
mkdirSync(fieldsDir, { recursive: true });

const text = (name, title, sort) => ({ name, title, type: 'Single-Line Text', sort });
const rich = (name, title, sort) => ({ name, title, type: 'Rich Text', sort });
const image = (name, title, sort) => ({ name, title, type: 'Image', sort });
const link = (name, title, sort) => ({ name, title, type: 'General Link', sort });

const specs = {
  Header: [
    text('SearchLabel', 'Search label', 100),
    text('PeopleLabel', 'People label', 200),
    text('WhoWeAreLabel', 'Who we are label', 300),
    text('WhatWeDoLabel', 'What we do label', 400),
    text('SectorsLabel', 'Sectors label', 500),
    text('PrivateCapitalLabel', 'Private capital label', 600),
    text('InsightsLabel', 'Insights label', 700),
    link('InsightsLink', 'Insights link', 800),
    text('LocationsLabel', 'Locations label', 900),
    text('CareersLabel', 'Careers label', 1000),
  ],
  HeaderSearch: [
    text('Placeholder', 'Placeholder', 100),
    text('InsightsTitle', 'Insights title', 200),
    text('PeopleTitle', 'People title', 300),
  ],
  Footer: [
    text('ColumnOneTitle', 'Column one title', 100),
    rich('ColumnOneLinks', 'Column one links', 200),
    text('ColumnTwoTitle', 'Column two title', 300),
    rich('ColumnTwoLinks', 'Column two links', 400),
    text('ColumnThreeTitle', 'Column three title', 500),
    rich('ColumnThreeLinks', 'Column three links', 600),
    text('Copyright', 'Copyright', 700),
  ],
  HeroVideo: [image('Image1', 'Image 1', 100), image('Image2', 'Image 2', 200), image('Image3', 'Image 3', 300)],
  FeatureSplit: [
    text('Eyebrow', 'Eyebrow', 100),
    text('Title', 'Title', 200),
    rich('Body', 'Body', 300),
    link('Link', 'Link', 400),
    image('Image', 'Image', 500),
  ],
  LocationsBand: [text('Title', 'Title', 100), rich('Body', 'Body', 200), image('Image', 'Image', 300)],
  InsightsHero: [text('Title', 'Title', 100)],
  FeaturedInsights: [
    image('Card1Image', 'Card 1 image', 100),
    text('Card1Tag', 'Card 1 tag', 110),
    text('Card1Title', 'Card 1 title', 120),
    text('Card1Date', 'Card 1 date', 130),
    link('Card1Link', 'Card 1 link', 140),
    image('Card2Image', 'Card 2 image', 200),
    text('Card2Tag', 'Card 2 tag', 210),
    text('Card2Title', 'Card 2 title', 220),
    text('Card2Date', 'Card 2 date', 230),
    link('Card2Link', 'Card 2 link', 240),
    image('Card3Image', 'Card 3 image', 300),
    text('Card3Tag', 'Card 3 tag', 310),
    text('Card3Title', 'Card 3 title', 320),
    text('Card3Date', 'Card 3 date', 330),
    link('Card3Link', 'Card 3 link', 340),
  ],
  InsightsSearch: [text('Title', 'Title', 100), text('Placeholder', 'Placeholder', 200)],
  ArticleHero: [
    text('Tag', 'Tag', 100),
    text('Title', 'Title', 200),
    text('Date', 'Date', 300),
  ],
  ArticleBody: [rich('Body', 'Body', 100)],
  KeyContacts: [
    text('Title', 'Title', 100),
    text('Contact1Name', 'Contact 1 name', 200),
    text('Contact1Role', 'Contact 1 role', 210),
    image('Contact1Image', 'Contact 1 image', 220),
    text('Contact2Name', 'Contact 2 name', 300),
    text('Contact2Role', 'Contact 2 role', 310),
    image('Contact2Image', 'Contact 2 image', 320),
    text('Contact3Name', 'Contact 3 name', 400),
    text('Contact3Role', 'Contact 3 role', 410),
    image('Contact3Image', 'Contact 3 image', 420),
    text('Contact4Name', 'Contact 4 name', 500),
    text('Contact4Role', 'Contact 4 role', 510),
    image('Contact4Image', 'Contact 4 image', 520),
  ],
};

for (const [name, fields] of Object.entries(specs)) {
  const file = join(fieldsDir, `${name}.json`);
  writeFileSync(file, JSON.stringify(fields, null, 2));
  console.log(`\n=== ${name} ===`);
  const result = spawnSync(
    process.execPath,
    [generator, name, '--collection', 'ashurst', '--fields', file],
    { cwd: root, stdio: 'inherit' }
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}

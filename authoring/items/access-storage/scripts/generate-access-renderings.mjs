import { mkdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const fieldsDir = join(dirname(fileURLToPath(import.meta.url)), 'fields');
const generator = join(
  root,
  '.cursor/skills/sitecore-serialization-skills/sitecore-new-rendering-yaml/scripts/Generate-SitecoreRendering.mjs'
);

const text = (name, sort) => ({ name, title: name, type: 'Single-Line Text', sort });
const rich = (name, sort) => ({ name, title: name, type: 'Rich Text', sort });
const image = (name, sort) => ({ name, title: name, type: 'Image', sort });
const link = (name, sort) => ({ name, title: name, type: 'General Link', sort });

const components = {
  Header: [
    image('Logo', 100),
    text('SignInLabel', 200),
    link('QuoteLink', 300),
    link('SelfStorageLink', 400),
    text('BusinessLabel', 500),
    link('StoresLink', 600),
    text('BoxesLabel', 700),
    text('OfficeLabel', 800),
  ],
  Footer: [image('Logo', 100), rich('Columns', 200), rich('Legal', 300)],
  PromoBar: [text('Text', 100), link('Link', 200)],
  QuoteHero: [
    text('Title', 100),
    text('Subtitle', 200),
    text('Placeholder', 300),
    text('ButtonLabel', 400),
    link('ButtonLink', 500),
    image('Image', 600),
  ],
  TrustBar: [
    text('Item1Title', 100),
    text('Item1Text', 200),
    text('Item2Title', 300),
    text('Item2Text', 400),
    text('Item3Title', 500),
    text('Item3Text', 600),
    text('Item4Title', 700),
    text('Item4Text', 800),
  ],
  OfferBand: [
    text('Card1Title', 100),
    rich('Card1Text', 200),
    text('Card2Title', 300),
    rich('Card2Text', 400),
    text('Card3Title', 500),
    rich('Card3Text', 600),
    link('Link', 700),
  ],
  HowItWorks: [
    text('Title', 100),
    text('Intro', 200),
    text('Step1Title', 300),
    text('Step1Text', 400),
    text('Step2Title', 500),
    text('Step2Text', 600),
    text('Step3Title', 700),
    text('Step3Text', 800),
    link('Link', 900),
    image('Image', 1000),
  ],
  ContentSplit: [text('Title', 100), rich('Body', 200), link('Link', 300), image('Image', 400)],
  UseCaseGrid: [
    text('Title', 100),
    ...Array.from({ length: 9 }, (_, index) => [
      text(`Card${index + 1}Title`, 200 + index * 200),
      image(`Card${index + 1}Image`, 300 + index * 200),
    ]).flat(),
  ],
  LinkRow: [
    text('Card1Title', 100),
    text('Card1Text', 200),
    text('Card2Title', 300),
    text('Card2Text', 400),
    text('Card3Title', 500),
    text('Card3Text', 600),
  ],
  ExpandableCopy: [
    text('Title', 100),
    text('Intro', 200),
    rich('Body', 300),
    text('MoreLabel', 400),
    text('LessLabel', 500),
  ],
  FaqList: [
    text('Title', 100),
    text('Item1Question', 200),
    rich('Item1Answer', 300),
    text('Item2Question', 400),
    rich('Item2Answer', 500),
    text('Item3Question', 600),
    rich('Item3Answer', 700),
    text('Item4Question', 800),
    rich('Item4Answer', 900),
    text('Group1Title', 1000),
    rich('Group1Body', 1100),
    text('Group2Title', 1200),
    rich('Group2Body', 1300),
  ],
  PageHero: [
    text('Title', 100),
    rich('Intro', 200),
    text('Placeholder', 300),
    text('ButtonLabel', 400),
    link('ButtonLink', 500),
    image('Image', 600),
  ],
  RichText: [rich('Body', 100)],
  BenefitList: [
    text('Title', 100),
    ...Array.from({ length: 6 }, (_, index) => text(`Item${index + 1}Text`, 200 + index * 100)),
  ],
  CardCarousel: [
    ...Array.from({ length: 4 }, (_, index) => [
      text(`Card${index + 1}Title`, 100 + index * 300),
      text(`Card${index + 1}Text`, 200 + index * 300),
      image(`Card${index + 1}Image`, 300 + index * 300),
    ]).flat(),
  ],
  QuoteCta: [text('Title', 100), link('Link', 200)],
  StoreFinder: [
    text('Title', 100),
    text('Placeholder', 200),
    text('ButtonLabel', 300),
    link('ButtonLink', 400),
    text('MapLabel', 500),
    rich('Locations', 600),
  ],
};

mkdirSync(fieldsDir, { recursive: true });
for (const [name, fields] of Object.entries(components)) {
  const file = join(fieldsDir, `${name}.json`);
  writeFileSync(file, JSON.stringify(fields, null, 2));
  const result = spawnSync(
    process.execPath,
    [generator, name, '--collection', 'access-storage', '--fields', file],
    { cwd: root, stdio: 'inherit' }
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}

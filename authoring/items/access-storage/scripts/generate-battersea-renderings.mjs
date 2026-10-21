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
  StoreHero: [
    rich('Crumb', 100),
    text('Title', 200),
    text('Offer', 300),
    text('Subtitle', 400),
    link('Link', 500),
    image('Image1', 600),
    image('Image2', 700),
    image('Image3', 800),
    image('Image4', 900),
  ],
  StoreFacts: [
    text('Title', 100),
    rich('Intro', 200),
    ...Array.from({ length: 6 }, (_, index) => [
      text(`Fact${index + 1}Label`, 300 + index * 200),
      text(`Fact${index + 1}Value`, 400 + index * 200),
    ]).flat(),
    text('HoursTitle', 1600),
    rich('Hours', 1700),
    text('ContactTitle', 1800),
    rich('Contact', 1900),
  ],
  UnitSizes: [
    text('Title', 100),
    text('Intro', 200),
    ...Array.from({ length: 8 }, (_, index) => text(`Size${index + 1}`, 300 + index * 100)),
    link('Link', 1200),
  ],
  NearbyStores: [
    text('Title', 100),
    text('Card1Title', 200),
    rich('Card1Text', 300),
    image('Card1Image', 400),
    link('Card1Link', 500),
    text('Card2Title', 600),
    rich('Card2Text', 700),
    image('Card2Image', 800),
    link('Card2Link', 900),
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

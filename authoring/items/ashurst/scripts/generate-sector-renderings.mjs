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

const numbered = (count, prefix, parts) =>
  Array.from({ length: count }, (_, index) => {
    const slot = index + 1;
    return parts.map((part, partIndex) =>
      part.kind(part.name(slot), part.title(slot), prefix + slot * 100 + partIndex * 10)
    );
  }).flat();

const specs = {
  SectorHero: [
    text('Eyebrow', 'Eyebrow', 100),
    text('Title', 'Title', 200),
    rich('Intro', 'Intro', 300),
    image('Image', 'Image', 400),
  ],
  SectorIntro: [rich('Body', 'Body', 100)],
  SectorAccordion: [
    text('Title', 'Title', 100),
    ...numbered(8, 200, [
      { kind: text, name: (slot) => `Item${slot}Title`, title: (slot) => `Item ${slot} title` },
      { kind: text, name: (slot) => `Item${slot}Teaser`, title: (slot) => `Item ${slot} teaser` },
      { kind: rich, name: (slot) => `Item${slot}Body`, title: (slot) => `Item ${slot} body` },
    ]),
  ],
  SectorHighlights: [
    text('Title', 'Title', 100),
    ...numbered(3, 200, [
      { kind: text, name: (slot) => `Card${slot}Kicker`, title: (slot) => `Card ${slot} kicker` },
      { kind: text, name: (slot) => `Card${slot}Title`, title: (slot) => `Card ${slot} title` },
      { kind: rich, name: (slot) => `Card${slot}Body`, title: (slot) => `Card ${slot} body` },
    ]),
  ],
  SectorCapabilities: [
    text('Title', 'Title', 100),
    ...numbered(7, 200, [
      { kind: text, name: (slot) => `Group${slot}Title`, title: (slot) => `Group ${slot} title` },
      { kind: rich, name: (slot) => `Group${slot}Items`, title: (slot) => `Group ${slot} items` },
    ]),
  ],
  SectorCarousel: [
    text('Title', 'Title', 100),
    link('ViewAll', 'View all', 200),
    ...numbered(6, 300, [
      { kind: text, name: (slot) => `Card${slot}Tag`, title: (slot) => `Card ${slot} tag` },
      { kind: text, name: (slot) => `Card${slot}Title`, title: (slot) => `Card ${slot} title` },
      { kind: text, name: (slot) => `Card${slot}Date`, title: (slot) => `Card ${slot} date` },
      { kind: link, name: (slot) => `Card${slot}Link`, title: (slot) => `Card ${slot} link` },
    ]),
  ],
};

for (const [name, fields] of Object.entries(specs)) {
  const file = join(fieldsDir, `${name}.json`);
  writeFileSync(file, JSON.stringify(fields, null, 2));
  console.log(`\n=== ${name} ===`);
  const result = spawnSync(process.execPath, [generator, name, '--collection', 'ashurst', '--fields', file], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

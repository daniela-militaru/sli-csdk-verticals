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
  LawyerProfile: [
    text('Name', 'Name', 100),
    text('Role', 'Role', 110),
    text('Office', 'Office', 120),
    image('Image', 'Headshot', 130),
    text('Phone', 'Phone', 200),
    text('Mobile', 'Mobile', 210),
    text('Email', 'Email', 220),
    link('LinkedIn', 'LinkedIn', 230),
    text('Headline', 'Headline', 300),
    rich('Bio', 'Bio', 310),
    text('Quote', 'Quote', 320),
    text('QuoteSource', 'Quote source', 330),
    rich('Sectors', 'Sectors', 400),
    rich('Services', 'Services', 410),
    rich('Experience', 'Experience', 500),
    rich('Credentials', 'Education and credentials', 600),
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

import { randomUUID } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const contentRoot = join(dirname(fileURLToPath(import.meta.url)), '..', 'serialized-content');
const siteRoot = join(contentRoot, 'ashurst', 'ashurst');

function walk(dir, acc = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) walk(full, acc);
    else if (name.name.endsWith('.yml')) acc.push(full);
  }
  return acc;
}

let fixed = 0;
for (const file of walk(siteRoot)) {
  const text = readFileSync(file, 'utf8');
  if (!/SharedFields:\r?\n\[\]/.test(text)) continue;
  const next = text.replace(
    /SharedFields:\r?\n\[\]/,
    `SharedFields:\n- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"\n  Hint: __Shared revision\n  Value: "${randomUUID()}"`
  );
  writeFileSync(file, next, 'utf8');
  fixed += 1;
}

function fieldId(component, field) {
  const file = join(
    contentRoot,
    'templates',
    'ashurst',
    `${component} Templates`,
    component,
    'Data',
    `${field}.yml`
  );
  return readFileSync(file, 'utf8').match(/^ID: "([^"]+)"/m)[1];
}

function image(component, hint, mediaId) {
  return `    - ID: "${fieldId(component, hint)}"
      Hint: ${hint}
      Value: |
        <image mediaid="{${mediaId.toUpperCase()}}" />`;
}

function insert(relative, component, pairs) {
  const file = join(siteRoot, ...relative.split('/'));
  let text = readFileSync(file, 'utf8');
  const block = pairs.map(([hint, mediaId]) => image(component, hint, mediaId)).join('\n');
  if (!text.includes('    Fields:\n')) throw new Error(`No fields in ${relative}`);
  text = text.replace('    Fields:\n', `    Fields:\n${block}\n`);
  writeFileSync(file, text, 'utf8');
}

insert('Data/HeroVideo/Home Hero.yml', 'HeroVideo', [
  ['Image1', '00817897-2771-48c9-975f-4235779fd147'],
  ['Image2', 'f0eccc31-d6b5-4b12-b14d-2d69cb39be16'],
  ['Image3', '9743aab8-6d58-4b6b-915f-312161c4faf9'],
]);
insert('Data/FeatureSplit/Here.yml', 'FeatureSplit', [['Image', '00817897-2771-48c9-975f-4235779fd147']]);
insert('Data/FeatureSplit/Rack Forum.yml', 'FeatureSplit', [['Image', 'f0eccc31-d6b5-4b12-b14d-2d69cb39be16']]);
insert('Data/FeatureSplit/SEC Exemption.yml', 'FeatureSplit', [['Image', '8836ae3c-f4f1-4ef6-aa9b-11380db577ad']]);
insert('Data/FeatureSplit/Extreme Weather.yml', 'FeatureSplit', [['Image', '9743aab8-6d58-4b6b-915f-312161c4faf9']]);
insert('Data/LocationsBand/Locations.yml', 'LocationsBand', [['Image', 'adcc2858-77ff-4120-b287-002e9c8c6de5']]);
insert('Data/FeaturedInsights/Featured.yml', 'FeaturedInsights', [
  ['Card1Image', 'f0a2fbe1-697e-4280-b34d-c29d58158799'],
  ['Card2Image', 'ee55473c-cb44-4687-820a-a136cefeb579'],
  ['Card3Image', '8836ae3c-f4f1-4ef6-aa9b-11380db577ad'],
]);

const contacts = {
  'data-bytes-au-key-australian-privacy-updates-so-far-in-2026': [
    '4456618a-fa71-47d9-918c-24b4fe2a724e',
    'd13d5fe2-be17-4217-b950-8c3ebc1adec5',
    'fcc12ffd-c803-40b0-815f-e940c3b34b50',
    '9b7b2b61-d01a-408b-b21c-23d436149461',
  ],
  'what-public-companies-need-to-know-about-the-sec-innovation-exemption-for-tokenized-stock': [
    'df7d157b-740e-45d1-b418-a2ca48690ff6',
    '00a5487c-80fd-4671-b354-9b248c8993da',
    '318f13e2-d46f-4eb4-bc8f-4270fc6db781',
  ],
  'asics-first-comprehensive-review-of-sustainability-reports': ['2a2b6cff-a58b-465a-bc72-262c44ed68cb'],
};

for (const [slug, mediaIds] of Object.entries(contacts)) {
  insert(
    `Data/KeyContacts/${slug}.yml`,
    'KeyContacts',
    mediaIds.map((mediaId, index) => [`Contact${index + 1}Image`, mediaId])
  );
}

console.log(`Fixed empty SharedFields in ${fixed} files`);

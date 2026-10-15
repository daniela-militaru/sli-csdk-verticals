import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const authoring = join(import.meta.dirname, '..', '..', '..');
const ashurst = join(import.meta.dirname, '..');
const reserved = ['a1e9', 'b40e', 'b803', '0e0a', 'c4c0', 'a50c', '4ec1'];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (name.name === 'node_modules' || name.name === '.git') continue;
    const full = join(dir, name.name);
    if (name.isDirectory()) walk(full, acc);
    else if (name.name.endsWith('.yml')) acc.push(full);
  }
  return acc;
}

const idRe = /^ID: "([0-9a-fA-F-]{36})"/gm;
const seen = new Map();
let reservedHits = 0;
for (const file of walk(authoring)) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(idRe)) {
    const value = match[1].toLowerCase();
    if (file.startsWith(ashurst) && reserved.some((prefix) => value.startsWith(prefix))) reservedHits += 1;
    if (!seen.has(value)) seen.set(value, []);
    seen.get(value).push(file);
  }
}
const dupes = [...seen.entries()].filter(([, files]) => files.length > 1 && files.some((file) => file.includes(`${join('items', 'ashurst')}\\`) || file.includes('/items/ashurst/')));
console.log(`ashurst ids ${seen.size} dupes ${dupes.length} reserved ${reservedHits}`);
for (const [value, files] of dupes.slice(0, 10)) {
  console.log(value, files.map((file) => file.replace(ashurst, '')).join(' | '));
}

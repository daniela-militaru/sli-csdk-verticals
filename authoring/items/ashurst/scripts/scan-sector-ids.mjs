import { openSync, readSync, closeSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'serialized-content');
const reserved = ['a1e9', 'b40e', 'b803', '0e0a', 'c4c0', 'a50c', '4ec1'];
const ids = new Map();
let dupes = 0;
let reservedHits = 0;
let files = 0;

function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) walk(full);
    else if (name.name.endsWith('.yml')) {
      files += 1;
      const fd = openSync(full, 'r');
      const buf = Buffer.alloc(180);
      const n = readSync(fd, buf, 0, 180, 0);
      closeSync(fd);
      const match = buf.slice(0, n).toString('utf8').match(/ID: "([0-9a-fA-F-]{36})"/);
      if (!match) continue;
      const id = match[1].toLowerCase();
      if (reserved.some((prefix) => id.startsWith(prefix))) {
        reservedHits += 1;
        console.log('reserved', id, full);
      }
      if (ids.has(id)) {
        dupes += 1;
        console.log('dupe', id);
      } else ids.set(id, full);
    }
  }
}

walk(root);
console.log('files', files, 'ids', ids.size, 'dupes', dupes, 'reserved', reservedHits);

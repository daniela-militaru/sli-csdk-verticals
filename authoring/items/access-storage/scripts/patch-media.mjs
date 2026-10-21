import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const content = fileURLToPath(new URL('../serialized-content/access-storage/access-storage/', import.meta.url));
const results = JSON.parse(readFileSync(new URL('./media-results.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));

const byUrl = new Map();
for (const item of results) {
  const head = readFileSync(item.Path, 'utf8');
  const width = head.match(/Hint: Width\s+Value: (\d+)/)?.[1] || '';
  const height = head.match(/Hint: Height\s+Value: (\d+)/)?.[1] || '';
  byUrl.set(item.Url, { id: item.MediaId.toUpperCase(), width, height });
}

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.yml')) {
      let text = readFileSync(full, 'utf8');
      const next = text.replace(/<image mediaid="\{MEDIA:([^}]+)\}" \/>/g, (match, url) => {
        const media = byUrl.get(url);
        if (!media) throw new Error(`No media for ${url}`);
        return `<image mediaid="{${media.id}}" width="${media.width}" height="${media.height}" />`;
      });
      if (next.includes('{MEDIA:')) throw new Error(`Unresolved media token in ${full}`);
      const linked = next
        .replaceAll('id="{8cb1274f-1ac8-4c0a-a3bf-c012ca4b3d20}"', 'id="{8CB1274F-1AC8-4C0A-A3BF-C012CA4B3D20}"')
        .replaceAll('id="{4fd0328d-8c44-49fd-8623-2c2afcfd03da}"', 'id="{4FD0328D-8C44-49FD-8623-2C2AFCFD03DA}"');
      if (linked !== text) writeFileSync(full, linked, 'utf8');
    }
  }
};

walk(content);
console.log(`patched ${byUrl.size} images`);

// Builds words.json (all pools) and today.json (today's word per level)
// from the site's own data: SEQUENCE parts in index.html + LEVEL3 in level3.js.
// Selection logic mirrors index.html exactly: pool by lv, index = (dayNumber - START_DAY) mod pool.length.
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const level3src = readFileSync(join(root, 'level3.js'), 'utf8');

// Evaluate the site's own data declarations (TAUGEN..SEQUENCE in index.html, LEVEL3 in level3.js)
let chunk = html.slice(html.indexOf('var TAUGEN'), html.indexOf('var ALLWORDS'));
chunk = chunk.replace(/var LEVEL3 = .*$/m, '');
const ALL = Function(level3src + '\n' + chunk + '\nreturn SEQUENCE.concat(LEVEL3);')();

const slim = e => ({ w: e.w, a: e.a || '', pos: e.pos || '', ipa: e.ipa || '', en: e.en || '', ex: e.ex || '', exEn: e.exEn || '' });
const pools = { '1': [], '2': [], '3': [] };
for (const e of ALL) pools[String(e.lv || 1)].push(slim(e));

const MS_DAY = 86400000;
const dayNumber = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / MS_DAY);
const START_DAY = dayNumber(new Date(2026, 10, 21));

function entryFor(date, level) {
  const pool = pools[String(level)] && pools[String(level)].length ? pools[String(level)] : pools['1'];
  const idx = (((dayNumber(date) - START_DAY) % pool.length) + pool.length) % pool.length;
  return { day: idx + 1, of: pool.length, entry: pool[idx] };
}

const now = new Date();
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
writeFileSync(join(root, 'words.json'), JSON.stringify({ generated: iso(now), startDay: '2026-11-21', pools }, null, 1));
writeFileSync(join(root, 'today.json'), JSON.stringify({ date: iso(now), levels: { '1': entryFor(now, 1), '2': entryFor(now, 2), '3': entryFor(now, 3) } }, null, 1));
console.log('words.json pools:', Object.entries(pools).map(([k, v]) => k + '=' + v.length).join(' '));
console.log('today:', iso(now), [1, 2, 3].map(l => 'L' + l + ' ' + entryFor(now, l).entry.w + ' (day ' + entryFor(now, l).day + '/' + entryFor(now, l).of + ')').join(' · '));

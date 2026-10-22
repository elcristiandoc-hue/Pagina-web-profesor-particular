// Instantánea SEO de la portada pre-renderizada, para comparar antes y después de un rediseño.
//
// Saca del HTML que reciben los buscadores lo que cuenta para Google: título, descripción,
// canonical, Open Graph, JSON-LD, encabezados, anclas, preguntas frecuentes, textos, imágenes y
// enlaces. Con --compare dice qué falta o ha cambiado respecto a una instantánea guardada; cada
// diferencia tiene que ser intencionada.
//
//   npm run build
//   node tools/seo-snapshot.mjs > tools/seo-baseline.json          guarda la instantánea
//   node tools/seo-snapshot.mjs --compare tools/seo-baseline.json   compara con la guardada
//   node tools/seo-snapshot.mjs --html otra/ruta/index.html ...     otro fichero
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const htmlPath = opt('--html') ?? 'dist/profesor-cristian-ortega/browser/index.html';
const comparePath = opt('--compare');

const clean = (s) => (s ?? '').replace(/\s+/g, ' ').trim();

function snapshot(html) {
  const { document } = new JSDOM(html).window;
  const meta = (sel) => clean(document.querySelector(sel)?.getAttribute('content'));
  const texts = (sel) => [...document.querySelectorAll(sel)].map((el) => clean(el.textContent)).filter(Boolean);

  // Bloques de texto que se leen: lo que no puede desaparecer en un rediseño.
  const blocks = texts('main p, main li, main blockquote, main dt, main dd, main summary, main td, main th');

  return {
    title: clean(document.title),
    description: meta('meta[name="description"]'),
    robots: meta('meta[name="robots"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    openGraph: Object.fromEntries(
      [...document.querySelectorAll('meta[property^="og:"]')].map((m) => [m.getAttribute('property'), clean(m.getAttribute('content'))]),
    ),
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)),
    h1: texts('h1'),
    h2: texts('h2'),
    h3: texts('h3'),
    ids: [...document.querySelectorAll('[id]')].map((el) => el.id),
    faq: [...document.querySelectorAll('details')].map((d) => ({
      question: clean(d.querySelector('summary')?.textContent),
      answer: clean([...d.childNodes].filter((n) => n.nodeName !== 'SUMMARY').map((n) => n.textContent).join(' ')),
    })),
    images: [...document.querySelectorAll('img')].map((img) => ({
      src: img.getAttribute('src'),
      srcset: img.getAttribute('srcset') ?? '',
      width: img.getAttribute('width'),
      height: img.getAttribute('height'),
      alt: img.getAttribute('alt'),
    })),
    links: [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))].sort(),
    words: clean(document.querySelector('main')?.textContent).split(' ').length,
    blocks,
  };
}

const current = snapshot(readFileSync(htmlPath, 'utf8'));

if (!comparePath) {
  console.log(JSON.stringify(current, null, 1));
  process.exit(0);
}

const base = JSON.parse(readFileSync(comparePath, 'utf8'));
const report = [];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const missing = (from, to) => from.filter((x) => !to.includes(x));

for (const key of ['title', 'description', 'robots', 'canonical']) {
  if (base[key] !== current[key]) report.push(`${key}: «${base[key]}» → «${current[key]}»`);
}
if (!same(base.openGraph, current.openGraph)) report.push('Open Graph ha cambiado');
if (!same(base.jsonLd, current.jsonLd)) report.push('JSON-LD ha cambiado');
if (!same(base.h1, current.h1)) report.push(`h1: ${JSON.stringify(base.h1)} → ${JSON.stringify(current.h1)}`);
for (const level of ['h2', 'h3']) {
  for (const h of missing(base[level], current[level])) report.push(`${level} que ya no está: «${h}»`);
  for (const h of missing(current[level], base[level])) report.push(`${level} nuevo: «${h}»`);
}
for (const id of missing(base.ids, current.ids)) report.push(`ancla que ya no está: #${id}`);
for (const q of base.faq) {
  const now = current.faq.find((f) => f.question === q.question);
  if (!now) report.push(`pregunta frecuente que ya no está: «${q.question}»`);
  else if (now.answer !== q.answer) report.push(`respuesta cambiada: «${q.question}»`);
}
for (const link of missing(base.links, current.links)) report.push(`enlace que ya no está: ${link}`);
for (const img of base.images) {
  const now = current.images.find((i) => i.src === img.src);
  if (!now) report.push(`imagen que ya no está: ${img.src}`);
  else if (now.alt !== img.alt) report.push(`alt cambiado en ${img.src}`);
}
for (const block of missing(base.blocks, current.blocks)) report.push(`texto que ya no está: «${block.slice(0, 90)}${block.length > 90 ? '…' : ''}»`);
report.push(`palabras en <main>: ${base.words} → ${current.words}`);

console.log(report.join('\n'));

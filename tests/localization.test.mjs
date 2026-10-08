import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../lib/i18n/config.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { localePath, translator, locales } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const read = path => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));

test('language switching preserves page, query and fragment without rewriting external or CMS URLs', () => {
  assert.equal(localePath('/ru/projects/payphone?view=full#features', 'ja'), '/ja/projects/payphone?view=full#features');
  assert.equal(localePath('/ja/projects/payphone', 'en'), '/projects/payphone');
  assert.equal(localePath('/', 'th'), '/th');
  for (const value of ['https://example.com/ru', '//example.com/a', 'mailto:hello@mediarise.org', '#features', '/admin/projects', '/api/portfolio', '/portfolio-media/hash', '/images/project.webp']) {
    assert.equal(localePath(value, 'ko'), value);
  }
});

test('missing and blank UI translations use English while preserving translated siblings and spacing', () => {
  const t = translator({ Home: 'Главная', Blank: '   ', 'Contact us': 'Связаться' });
  assert.equal(t('Home'), 'Главная');
  assert.equal(t('Missing English label'), 'Missing English label');
  assert.equal(t('Blank'), 'Blank');
  assert.equal(t(' Contact   us '), ' Связаться ');
  assert.equal(t(21), 21);
});

test('all five dictionaries cover the same messages without blank entries', () => {
  const expected = Object.keys(read('../lib/i18n/messages/ru.json')).sort();
  for (const locale of locales.filter(l => l !== 'en')) {
    const dictionary = read(`../lib/i18n/messages/${locale}.json`);
    assert.deepEqual(Object.keys(dictionary).sort(), expected, locale);
    for (const [key, value] of Object.entries(dictionary)) assert.ok(value.trim(), `${locale}: ${key}`);
  }
});

test('every published seed project has all six translations with equivalent features and caption coverage', () => {
  const projects = read('../backend/database/seeders/data/portfolio.json');
  assert.equal(projects.length, 21);
  for (const project of projects) {
    for (const locale of locales) {
      for (const field of ['title', 'type', 'description', 'audience']) assert.ok(project[locale][field]?.trim(), `${project.slug}/${locale}/${field}`);
      assert.equal(project[locale].features.length, project.en.features.length, `${project.slug}/${locale} features`);
      for (const image of project.screenshots) assert.ok(image[`caption_${locale}`]?.trim(), `${project.slug}/${locale} caption`);
    }
  }
  assert.equal(projects.find(p => p.slug === 'payphone').status, 'Prototype');
});

test('locale rewrites preserve the internal origin behind TLS termination and redirects use the public origin', async () => {
  const nextUrl = new URL('../node_modules/next/server.js', import.meta.url).href;
  const { NextRequest } = await import(nextUrl);
  const configUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`;
  const siteSource = fs.readFileSync(new URL('../lib/site.ts', import.meta.url), 'utf8');
  const siteCode = ts.transpileModule(siteSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  const siteModule = `data:text/javascript;base64,${Buffer.from(siteCode).toString('base64')}`;
  const proxySource = fs.readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8');
  const proxyCode = ts.transpileModule(proxySource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
    .replace('"next/server"', JSON.stringify(nextUrl)).replace('"@/lib/i18n/config"', JSON.stringify(configUrl)).replace('"@/lib/site"', JSON.stringify(siteModule));
  const { proxy } = await import(`data:text/javascript;base64,${Buffer.from(proxyCode).toString('base64')}`);
  assert.ok(fs.readFileSync(new URL('../deploy/supervisord.conf', import.meta.url), 'utf8').includes('HOSTNAME="0.0.0.0"'));
  const response = proxy(new NextRequest('https://0.0.0.0:3001/ja/projects?view=all', { headers: { host: 'mediarise.org', 'x-forwarded-proto': 'https', 'x-site-locale': 'ru' } }));
  assert.equal(response.headers.get('x-middleware-rewrite'), 'https://0.0.0.0:3001/projects?view=all');
  assert.equal(response.headers.get('x-middleware-request-x-site-locale'), 'ja');
  const redirect = proxy(new NextRequest('https://localhost:3001/en/projects?view=all'));
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('location'), 'https://mediarise.org/projects?view=all');
  assert.equal(proxy(new NextRequest('https://localhost:3001/ja/admin/projects')).status, 404);
});

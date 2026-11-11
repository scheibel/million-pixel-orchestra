import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = path => readFile(new URL(`../demos/${path}`, import.meta.url), 'utf8');
const clean = text => text.replace(/\/\/[^\n]*/g, '').split('\n').map(line => line.trim()).filter(Boolean).join('\n');
const design = text => clean(text.split('// GESTALTUNG\n')[1].split('// VORBEREITETE BASIS:')[0]);
const basis = text => text.split('// VORBEREITETE BASIS:')[1];

// These equalities protect the teaching requirement: existing code stays put,
// and each transition changes only the intended expression or loop control.
test('Demo 4 benötigt pro Übergang genau eine Änderung im bestehenden Rahmen', async () => {
  const names = ['START.glsl', '01-zwei-punkte-lerp.glsl', '02-zwei-punkte-smoothstep.glsl', '03-vier-punkte-smoothstep.glsl', 'ZIEL.glsl'];
  const [start, two, smooth, four, goal] = (await Promise.all(names.map(name => source(`05-polynom-und-weiche-kante/${name}`)))).map(clean);
  assert.equal(start.replace('index < 1', 'index < 4'), two);
  assert.equal(two.replace('return t;', 'return t * t * (3.0 - 2.0 * t);'), smooth);
  assert.equal(smooth.replace('index += 2', 'index += 1'), four);
  assert.equal(four.replace('return t * t * (3.0 - 2.0 * t);', 'return t * t * t * (t * (6.0 * t - 15.0) + 10.0);'), goal);
});

test('Noise-Verfahren wechseln über Aufrufe; die Basis bleibt kumulativ und zwischen Demos identisch', async () => {
  const [random, value, simplex, start, fbm, clouds, animated] = await Promise.all([
    '08-value-noise/01-zufall-pro-pixel.glsl', '08-value-noise/02-value-noise.glsl', '08-value-noise/ZIEL.glsl',
    '09-fbm/START.glsl', '09-fbm/01-fbm.glsl', '09-fbm/02-wolken.glsl', '09-fbm/ZIEL.glsl'
  ].map(source));
  assert.equal(design(random).replace('zufall(floor(fragCoord))', 'valueNoise(p)'), design(value));
  assert.equal(design(value).replace('valueNoise(p)', 'simplexNoise01(p)'), design(simplex));
  assert.ok(basis(value).startsWith(basis(random).trimEnd()));
  assert.ok(basis(simplex).startsWith(basis(value).trimEnd()));
  assert.equal(start, simplex, 'ZIEL von Demo 5 ist START von Demo 6');
  for (const text of [fbm, clouds, animated]) assert.equal(basis(text), basis(start));
  assert.equal(design(clouds), design(animated).replace('p -= vec2(0.18, 0.06) * iTime;\n', ''));
});

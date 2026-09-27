import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { moveLink, safeUrl } from '../lib/links.mjs';
test('reorders links and rejects unsafe URLs', () => {
  assert.deepEqual(moveLink(['a','b'], 0, 1), ['b','a']);
  assert.equal(safeUrl('javascript:alert(1)'), null);
  assert.equal(safeUrl('https://example.com/'), 'https://example.com/');
});

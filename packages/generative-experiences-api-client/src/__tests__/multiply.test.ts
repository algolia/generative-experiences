import { expect, test } from 'vitest';

import { multiply } from '../multiply';

test('multiply 2 * 2 to equal 4', () => {
  expect(multiply(2, 2)).toBe(4);
});

test('this should fail', () => {
  expect(multiply(1, 1)).toBe(42);
});

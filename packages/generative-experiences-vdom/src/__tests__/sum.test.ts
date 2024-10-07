import { expect, test } from 'vitest';

import { sum } from '../sum';

test('sum 2 * 2 to equal 4', () => {
  expect(sum(2, 2)).toBe(4);
});

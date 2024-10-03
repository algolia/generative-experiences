/// <reference types="vitest/config" />

import { coverageConfigDefaults, defineConfig } from 'vitest/dist/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/types/*', ...coverageConfigDefaults.exclude],
    },
  },
});

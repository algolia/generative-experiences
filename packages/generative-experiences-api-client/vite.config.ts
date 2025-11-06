import * as path from 'path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outDir: ['dist'],
      rollupTypes: true,
    }),
  ],
  optimizeDeps: { esbuildOptions: { jsx: 'automatic' } },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@algolia/generative-experiences-api-client',
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js';
        }
        if (format === 'cjs') {
          return 'index.cjs';
        }
        return 'index.umd.js';
      },
    },
    rollupOptions: {
      external: [
        // Mark these as external to avoid bundling them
        '@algolia/client-search',
        'algoliasearch',
        'algoliasearch-helper',
      ],
      output: [
        {
          format: 'umd',
          dir: path.resolve(__dirname, 'dist/'),
          entryFileNames: 'index.umd.js',
          name: 'AlgoliaGenerativeExperiencesApiClient',
          globals: {
            '@algolia/client-search': 'AlgoliaClientSearch',
            algoliasearch: 'algoliasearch',
            'algoliasearch-helper': 'algoliasearchHelper',
          },
        },
        {
          format: 'es',
          dir: path.resolve(__dirname, 'dist/'),
          entryFileNames: 'index.js',
        },
        {
          format: 'cjs',
          dir: path.resolve(__dirname, 'dist/'),
          entryFileNames: 'index.cjs',
        },
      ],
    },
  },
});

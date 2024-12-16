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
      fileName: 'index',
    },
    rollupOptions: {
      output: [
        {
          format: 'umd',
          dir: path.resolve(__dirname, 'dist/'),
          entryFileNames: 'index.umd.js',
          name: '@algolia/generative-experiences-api-client',
        },
        {
          format: 'esm',
          dir: path.resolve(__dirname, 'dist/'),
          entryFileNames: 'index.js',
        },
      ],
    },
  },
});

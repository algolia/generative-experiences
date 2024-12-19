import * as path from 'path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outDir: ['dist'],
      rollupTypes: true,
    }),
    react({ jsxRuntime: 'classic' }),
    visualizer({
      filename: 'rollup-plugin-visualizer.html',
    }),
  ],
  optimizeDeps: { esbuildOptions: { jsx: 'automatic' } },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@algolia/generative-experiences-react',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: [
        {
          format: 'umd',
          dir: path.resolve(__dirname, 'dist/'),
          entryFileNames: 'index.umd.js',
          name: '@algolia/generative-experiences-react',
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

import * as path from 'path';

import preact from '@preact/preset-vite';
import tailwindcss from '@vituum/vite-plugin-tailwindcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outDir: ['dist'],
      rollupTypes: true,
    }),
    preact(),
    tailwindcss(),
  ],
  optimizeDeps: { esbuildOptions: { jsx: 'automatic' } },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'playground-js',
      fileName: 'index',
    },
  },
});

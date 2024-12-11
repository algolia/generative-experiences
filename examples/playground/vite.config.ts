import * as path from 'path';

import react from '@vitejs/plugin-react';
import tailwindcss from '@vituum/vite-plugin-tailwindcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      outDir: ['dist'],
      rollupTypes: true,
    }),
    react({ jsxRuntime: 'classic' }),
    tailwindcss(),
  ],
  optimizeDeps: { esbuildOptions: { jsx: 'automatic' } },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'playground',
      fileName: 'index',
    },
  },
});

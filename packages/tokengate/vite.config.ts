import {resolve} from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@shopify/tokengate',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'react',
        },
      },
    },
  },
});

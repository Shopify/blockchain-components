import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    assetsDir: '',
    target: 'es2021',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@shopify/gate-context-client',
      fileName: 'index',
    },
    rollupOptions: {
      input: './src/index.ts',
      output: {
        format: 'esm',
      },
    },
  },
});

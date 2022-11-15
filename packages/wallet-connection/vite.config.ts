import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@shopify/wallet-connection',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'wagmi'],
      output: {
        globals: {
          react: 'react',
          wagmi: 'wagmi',
        },
      },
    },
  },
});

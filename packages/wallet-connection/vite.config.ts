import {resolve} from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig({
  plugins: [nodePolyfills(), react()],
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

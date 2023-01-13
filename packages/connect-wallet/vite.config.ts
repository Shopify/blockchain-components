import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {defineConfig} from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
  build: {
    assetsDir: '',
    target: 'es2021',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@shopify/connect-wallet',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['wagmi'],
      input: './src/index.ts',
      output: {
        format: 'esm',
        globals: {
          react: 'React',
          wagmi: 'wagmi',
        },
      },
    },
  },
  plugins: [peerDepsExternal(), nodePolyfills(), react()],
});

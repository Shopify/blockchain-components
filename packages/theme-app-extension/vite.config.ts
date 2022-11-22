import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), react()],
  build: {
    rollupOptions: {
      input: './src/index.tsx',
      output: {entryFileNames: '[name].js'},
    },
  },
});

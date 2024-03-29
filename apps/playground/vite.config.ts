import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), react()],
  define: {
    global: 'globalThis',
  },
  server: {host: true},
  build: {
    assetsDir: '',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: './src/index.tsx',
      output: {
        inlineDynamicImports: true,
        entryFileNames: '[name].js',
      },
    },
  },
});

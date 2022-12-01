import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), react()],
  build: {
    rollupOptions: {
      external: ['ethers', 'react', 'wagmi'],
      input: './src/index.tsx',
      output: {
        entryFileNames: '[name].js',
        globals: {
          ethers: 'ethers',
          react: 'React',
          wagmi: 'wagmi',
        },
      },
    },
  },
});

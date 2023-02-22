// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference types="vitest" />

import {defineConfig} from 'vite';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    exclude: ['**/dist', 'node_modules'],
    globals: true,
    include: ['**/*.(test|spec).(js|jsx|ts|tsx)'],
    setupFiles: ['./vitestSetup.ts'],
  },
});

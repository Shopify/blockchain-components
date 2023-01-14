/* eslint-disable no-process-env */
import {defineConfig, Options} from 'tsup';

const BASE_CONFIG: Options = {
  entry: ['./src/index.ts'],
  external: ['react', 'styled-components'],
  format: ['esm', 'cjs'],
  platform: 'browser',
  target: 'esnext',
};

export default defineConfig(
  process.env.DEV
    ? {
        ...BASE_CONFIG,
      }
    : {
        ...BASE_CONFIG,
        clean: true,
        dts: true,
      },
);

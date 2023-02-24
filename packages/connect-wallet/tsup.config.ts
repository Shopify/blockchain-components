/* eslint-disable no-process-env */
import {defineConfig, Options} from 'tsup';

const BASE_CONFIG: Options = {
  entry: ['./src/index.ts'],
  external: [
    'ethers',
    'react',
    'redux',
    'redux-persist',
    'styled-components',
    'wagmi',
  ],
  format: ['esm'],
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

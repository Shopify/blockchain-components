import {providers} from 'ethers';
import {mainnet} from 'wagmi/chains';

// These all get mocked inside of the fetchEns.test.ts file.
export const mainnetAlchemyProvider = new providers.AlchemyProvider(
  mainnet.network,
  'apiKey',
);

export const mainnetPublicProvider = new providers.StaticJsonRpcProvider(
  mainnet.rpcUrls.default.http[0],
  mainnet.network,
);

export const mainnetPublicFallbackProvider = new providers.FallbackProvider([
  mainnetPublicProvider,
  mainnetPublicProvider,
]);

export const mainnetMixedFallbackProvider = new providers.FallbackProvider([
  mainnetAlchemyProvider,
  mainnetPublicProvider,
]);

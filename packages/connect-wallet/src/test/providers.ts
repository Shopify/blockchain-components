import {PublicClient, createPublicClient, fallback, http} from 'viem';
import {mainnet} from 'viem/chains';

// These all get mocked inside of the fetchEns.test.ts file.
export const mainnetAlchemyProvider: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/<apiKey>'),
});

export const mainnetPublicProvider: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(mainnet.rpcUrls.default.http[0]),
});

export const mainnetPublicFallbackProvider: PublicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http(mainnet.rpcUrls.default.http[0]),
    http(mainnet.rpcUrls.default.http[0]),
  ]),
});

export const mainnetMixedFallbackProvider: PublicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http('https://eth-mainnet.g.alchemy.com/v2/<apiKey>'),
    http(mainnet.rpcUrls.default.http[0]),
  ]),
});

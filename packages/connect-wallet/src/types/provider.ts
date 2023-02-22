import {providers} from 'ethers';

export type EthereumProviderType =
  | providers.AlchemyProvider
  | providers.BaseProvider
  | providers.FallbackProvider
  | providers.InfuraProvider
  | providers.JsonRpcProvider
  | providers.Provider;

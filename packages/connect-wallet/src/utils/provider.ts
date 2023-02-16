import {Chain} from '@wagmi/core';
import {providers} from 'ethers';

import {EthereumProviderType} from '../types/provider';

interface ProviderCheckProps {
  chain: Chain;
  provider: EthereumProviderType;
}

// Detects if the provider is a fallback provider. This is needed because
// fallback provider is a complex provider construct that is composed of
// many providers, requiring us to loop through provider constructs to
// detect if a provider is using only the public provider.
export const isFallbackProviderType = (
  provider: EthereumProviderType,
): provider is providers.FallbackProvider => {
  return 'providerConfigs' in provider;
};

// Detects if a given provider is utilizing only the default provider
export const isDefaultProvider = ({chain, provider}: ProviderCheckProps) => {
  const isFallbackProvider = isFallbackProviderType(provider);

  const defaultUrl = chain.rpcUrls.default.http[0];

  if (isFallbackProvider) {
    return provider.providerConfigs.every(
      ({provider: currentProvider}: {provider: EthereumProviderType}) =>
        'connection' in currentProvider &&
        currentProvider.connection.url === defaultUrl,
    );
  } else {
    return 'connection' in provider && provider.connection.url === defaultUrl;
  }
};

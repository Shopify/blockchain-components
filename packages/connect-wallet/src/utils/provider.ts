import {providers} from 'ethers';
import {Chain} from 'wagmi';

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
  const defaultUrl = chain.rpcUrls.default.http[0];
  const isFallbackProvider = isFallbackProviderType(provider);

  const isUsingDefaultUrl = (provider_: EthereumProviderType) =>
    'connection' in provider_ && provider_.connection.url === defaultUrl;

  if (isFallbackProvider) {
    return provider.providerConfigs.every(({provider: currentProvider}) =>
      isUsingDefaultUrl(currentProvider),
    );
  }

  return isUsingDefaultUrl(provider);
};

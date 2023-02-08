import {createAsyncThunk} from '@reduxjs/toolkit';
import {Address, Chain} from '@wagmi/core';
import {providers} from 'ethers';

type ProviderType =
  | providers.AlchemyProvider
  | providers.BaseProvider
  | providers.FallbackProvider
  | providers.InfuraProvider
  | providers.JsonRpcProvider
  | providers.Provider;

interface ProviderCheckProps {
  chain: Chain;
  provider: ProviderType;
}

interface FetchEnsProps extends ProviderCheckProps {
  address: Address;
}

interface FetchEnsPayload {
  address: Address;
  ensName: string | undefined;
}

// Detects if the provider is a fallback provider. This is needed because
// fallback provider is a complex provider construct that is composed of
// many providers, requiring us to loop through provider constructs to
// detect if a provider is using only the public provider.
const isFallbackProviderType = (
  provider: ProviderType,
): provider is providers.FallbackProvider => {
  return 'providerConfigs' in provider;
};

// Detects if a given provider is utilizing the public provider url.
const providerIsUsingPublicUrl = ({chain, provider}: ProviderCheckProps) => {
  const defaultUrl = chain.rpcUrls.default.http[0];

  return 'connection' in provider && provider.connection.url === defaultUrl;
};

// Runs a check against the provider, outputting a warning if the provider
// present is using only the public provider.
const checkProviderType = ({chain, provider}: ProviderCheckProps) => {
  // If the ENS lookup was run using only a public provider dispatch
  // information the console informing the user that the lookup could
  // fail and that the provider might hit a rate limit.
  const isFallbackProvider = isFallbackProviderType(provider);

  let isPublicOnly = false;

  if (isFallbackProvider) {
    isPublicOnly = provider.providerConfigs.every(
      ({provider: currentProvider}) =>
        providerIsUsingPublicUrl({chain, provider: currentProvider}),
    );
  } else {
    isPublicOnly = providerIsUsingPublicUrl({chain, provider});
  }

  if (isPublicOnly) {
    console.warn(
      `@shopify/connect-wallet -- \`fetchEns\` dispatched with only a public provider present.`,
    );
  }
};

export const fetchEns = createAsyncThunk(
  'wallet/fetchEns',
  async ({address, chain, provider}: FetchEnsProps, thunkApi) => {
    checkProviderType({chain, provider});

    const payload: FetchEnsPayload = {address, ensName: undefined};
    const ensName = await provider.lookupAddress(address);

    if (ensName === null) {
      return thunkApi.fulfillWithValue(payload);
    }

    const resolvedAddress = await provider.resolveName(ensName);

    if (resolvedAddress === address) {
      payload.ensName = ensName;
    }

    return thunkApi.fulfillWithValue(payload);
  },
);

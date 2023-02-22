import {
  mainnet,
  mainnetAlchemyProvider,
  mainnetMixedFallbackProvider,
  mainnetPublicFallbackProvider,
  mainnetPublicProvider,
} from '../test/providers';

import {isDefaultProvider, isFallbackProviderType} from './provider';

type Chain = Parameters<typeof isDefaultProvider>[0]['chain'];
// This can be addressed when we're able to utilize ESM modules in
// the test environment.
const chain = mainnet as Chain;

describe('isFallbackProviderType', () => {
  it('returns true when the provider type is a fallback provider', () => {
    expect(isFallbackProviderType(mainnetMixedFallbackProvider)).toBe(true);
    expect(isFallbackProviderType(mainnetPublicFallbackProvider)).toBe(true);
  });

  it('returns false when the provider type is not a fallback provider', () => {
    expect(isFallbackProviderType(mainnetAlchemyProvider)).toBe(false);
    expect(isFallbackProviderType(mainnetPublicProvider)).toBe(false);
  });
});

describe('isDefaultProvider', () => {
  it('returns true when given a public only provider', () => {
    expect(isDefaultProvider({chain, provider: mainnetPublicProvider})).toBe(
      true,
    );

    expect(
      isDefaultProvider({
        chain,
        provider: mainnetPublicFallbackProvider,
      }),
    ).toBe(true);
  });

  it('returns false when given a provider that has at least one provider that is not a public provider', () => {
    expect(isDefaultProvider({chain, provider: mainnetAlchemyProvider})).toBe(
      false,
    );

    expect(
      isDefaultProvider({
        chain,
        provider: mainnetMixedFallbackProvider,
      }),
    ).toBe(false);
  });
});

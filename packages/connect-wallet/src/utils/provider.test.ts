import {mainnet} from 'wagmi/chains';

import {
  mainnetAlchemyProvider,
  mainnetMixedFallbackProvider,
  mainnetPublicFallbackProvider,
  mainnetPublicProvider,
} from '../test/providers';

import {isDefaultProvider} from './provider';

// describe('isFallbackProviderType', () => {
//   it('returns true when the provider type is a fallback provider', () => {
//     expect(isFallbackProviderType(mainnetMixedFallbackProvider)).toBe(true);
//     expect(isFallbackProviderType(mainnetPublicFallbackProvider)).toBe(true);
//   });

//   it('returns false when the provider type is not a fallback provider', () => {
//     expect(isFallbackProviderType(mainnetAlchemyProvider)).toBe(false);
//     expect(isFallbackProviderType(mainnetPublicProvider)).toBe(false);
//   });
// });

describe('isDefaultProvider', () => {
  it('returns true when given a public only provider', () => {
    expect(
      isDefaultProvider({chain: mainnet, provider: mainnetPublicProvider}),
    ).toBe(true);

    expect(
      isDefaultProvider({
        chain: mainnet,
        provider: mainnetPublicFallbackProvider,
      }),
    ).toBe(true);
  });

  it('returns false when given a provider that has at least one provider that is not a public provider', () => {
    expect(
      isDefaultProvider({chain: mainnet, provider: mainnetAlchemyProvider}),
    ).toBe(false);

    expect(
      isDefaultProvider({
        chain: mainnet,
        provider: mainnetMixedFallbackProvider,
      }),
    ).toBe(false);
  });
});

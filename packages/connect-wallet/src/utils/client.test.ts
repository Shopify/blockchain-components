import {mainnet} from 'wagmi/chains';

import {
  mainnetAlchemyProvider,
  mainnetMixedFallbackProvider,
  mainnetPublicFallbackProvider,
  mainnetPublicProvider,
} from '../test/providers';

import {isDefaultClient} from './client';

describe('isDefaultProvider', () => {
  it('returns true when given a public only provider', () => {
    expect(
      isDefaultClient({chain: mainnet, client: mainnetPublicProvider}),
    ).toBe(true);

    expect(
      isDefaultClient({
        chain: mainnet,
        client: mainnetPublicFallbackProvider,
      }),
    ).toBe(true);
  });

  it('returns false when given a provider that has at least one provider that is not a public provider', () => {
    expect(
      isDefaultClient({chain: mainnet, client: mainnetAlchemyProvider}),
    ).toBe(false);

    expect(
      isDefaultClient({
        chain: mainnet,
        client: mainnetMixedFallbackProvider,
      }),
    ).toBe(false);
  });
});

import {vi} from 'vitest';
import {mainnet} from 'wagmi';

import {fetchEns} from './fetchEns';
import {addWallet} from './walletSlice';

import {store} from '~/test/configureStore';
import {DEFAULT_WALLET} from '~/test/fixtures/wallet';
import {mainnetPublicProvider} from '~/test/providers';
import {Wallet} from '~/types/wallet';

const defaultAddress = DEFAULT_WALLET.address;

vi.mock('ethers', async () => {
  const ethers = (await vi.importActual('ethers')) as any;

  const lookupAddress = vi.fn((address: string) => {
    if (address === '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3') {
      return 'tobi.eth';
    }

    // Ignore any other test invocations.
    return null;
  });

  const resolveName = vi.fn((ensName: string) => {
    if (ensName === 'tobi.eth') {
      return '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3';
    }

    // Resolve to the default wallet address.
    return '0x5ea9681C3Ab9B5739810F8b91aE65EC47de62119';
  });

  const providerOverrides = {
    lookupAddress,
    resolveName,
  };

  return {
    ...ethers,
    providers: {
      ...ethers.providers,
      AlchemyProvider: vi.fn(() => providerOverrides),
      FallbackProvider: vi.fn(() => providerOverrides),
      StaticJsonRpcProvider: vi.fn(() => providerOverrides),
    },
  };
});

describe('fetchEns', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not update the active wallet with a displayName value when an ensName is not resolved', async () => {
    store.dispatch(addWallet(DEFAULT_WALLET));

    expect(store.getState().wallet.activeWallet).toMatchObject(DEFAULT_WALLET);

    await store.dispatch(
      fetchEns({
        address: defaultAddress,
        chain: mainnet,
        provider: mainnetPublicProvider,
      }),
    );

    expect(store.getState().wallet.activeWallet).toMatchObject(DEFAULT_WALLET);
  });

  it('updates the active wallet with a displayName value when an ensName is resolved', async () => {
    const testWallet: Wallet = {
      ...DEFAULT_WALLET,
      address: '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3',
    };

    store.dispatch(addWallet(testWallet));

    expect(store.getState().wallet.activeWallet).toMatchObject(testWallet);

    const response = await store.dispatch(
      fetchEns({
        address: '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3',
        chain: mainnet,
        provider: mainnetPublicProvider,
      }),
    );

    expect(response).toMatchObject({
      payload: {
        address: '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3',
        ensName: 'tobi.eth',
      },
    });

    expect(store.getState().wallet.activeWallet).toMatchObject({
      ...testWallet,
      displayName: 'tobi.eth',
    });
  });
});

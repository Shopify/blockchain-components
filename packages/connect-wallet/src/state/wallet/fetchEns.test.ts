import {act, renderHook} from '@testing-library/react';
import {vi} from 'vitest';
import {mainnet} from 'wagmi';

import {FetchEnsProps} from '~/state/types';
import {DEFAULT_WALLET} from '~/test/fixtures/wallet';
import {mainnetPublicProvider} from '~/test/providers';
import {useTestStore} from '~/test/store';
import {Wallet} from '~/types/wallet';

const defaultAddress = DEFAULT_WALLET.address;

vi.mock('./fetchEns', () => {
  const fetchEns = vi.fn((props: FetchEnsProps) => {
    if (props.address === '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3') {
      return 'tobi.eth';
    }

    // Ignore any other test invocations.
    return undefined;
  });

  return {
    fetchEns,
  };
});

describe('fetchEns', () => {
  const {result} = renderHook(() => useTestStore((state) => state.wallet));
  const {addWallet, fetchEns} = result.current;

  afterEach(() => {
    vi.clearAllMocks();
    const state = useTestStore.getState();

    // Replace state after each test.
    act(() => useTestStore.setState(state, true));
  });

  it('does not update the active wallet with a displayName value when an ensName is not resolved', async () => {
    // const mock = vi.fn().mockImplementationOnce()
    act(() => addWallet(DEFAULT_WALLET));

    expect(useTestStore.getState().wallet.activeWallet).toMatchObject(
      DEFAULT_WALLET,
    );

    await act(async () => {
      await fetchEns({
        address: defaultAddress,
        chain: mainnet,
        provider: mainnetPublicProvider,
      });
    });

    expect(useTestStore.getState().wallet.activeWallet).toMatchObject(
      DEFAULT_WALLET,
    );
  });

  it('updates the active wallet with a displayName value when an ensName is resolved', async () => {
    const testWallet: Wallet = {
      ...DEFAULT_WALLET,
      address: '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3',
    };

    act(() => addWallet(testWallet));

    expect(useTestStore.getState().wallet.activeWallet).toMatchObject(
      testWallet,
    );

    await act(async () => {
      await fetchEns({
        address: '0x486D582eed105cEf4e4Aa270C93b1e03Fe5B04F3',
        chain: mainnet,
        provider: mainnetPublicProvider,
      });
    });

    expect(useTestStore.getState().wallet.activeWallet).toMatchObject({
      ...testWallet,
      displayName: 'tobi.eth',
    });
  });
});

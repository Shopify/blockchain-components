import {vi} from 'vitest';

import {addWallet, setPendingWallet} from '../slices/walletSlice';
import {preloadedState, storeWithLogger as store} from '../test/configureStore';
import {ALTERNATE_WALLET, DEFAULT_WALLET} from '../test/fixtures/wallet';

const addedWalletState = {
  ...preloadedState,
  wallet: {
    ...preloadedState.wallet,
    activeWallet: DEFAULT_WALLET,
    connectedWallets: [DEFAULT_WALLET],
  },
};

const pendingAltWalletState = {
  ...addedWalletState,
  wallet: {
    ...addedWalletState.wallet,
    pendingWallet: ALTERNATE_WALLET,
  },
};

const addedTwoWalletsWithPendingWalletState = {
  ...pendingAltWalletState,
  wallet: {
    ...pendingAltWalletState.wallet,
    activeWallet: ALTERNATE_WALLET,
    connectedWallets: [DEFAULT_WALLET, ALTERNATE_WALLET],
  },
};

const addedTwoWalletsState = {
  ...addedTwoWalletsWithPendingWalletState,
  wallet: {
    ...addedTwoWalletsWithPendingWalletState.wallet,
    activeWallet: ALTERNATE_WALLET,
    connectedWallets: [DEFAULT_WALLET, ALTERNATE_WALLET],
    pendingWallet: undefined,
  },
};

describe('loggerMiddleware', () => {
  const spyLog = vi.spyOn(console, 'log');

  it('With multiple actions being dispatched', () => {
    const steps = [
      {
        action: addWallet,
        payload: DEFAULT_WALLET,
        expectedPrevState: preloadedState,
        expectedNextState: addedWalletState,
      },
      {
        action: setPendingWallet,
        payload: ALTERNATE_WALLET,
        expectedPrevState: addedWalletState,
        expectedNextState: pendingAltWalletState,
      },
      {
        action: addWallet,
        payload: ALTERNATE_WALLET,
        expectedPrevState: pendingAltWalletState,
        expectedNextState: addedTwoWalletsWithPendingWalletState,
      },
      {
        action: setPendingWallet,
        payload: undefined,
        expectedPrevState: addedTwoWalletsWithPendingWalletState,
        expectedNextState: addedTwoWalletsState,
      },
    ];

    steps.forEach(({action, payload, expectedNextState, expectedPrevState}) => {
      vi.clearAllMocks();
      store.dispatch(action(payload as any));

      // Test the first message logged
      expect(spyLog.mock.calls[0][0]).toContain(
        `@shopify/connect-wallet%c: ${action.type}`,
      );

      // Test the previous state
      expect(spyLog.mock.calls[1][0]).toContain('previous state:');
      expect(spyLog.mock.calls[1][2]).toEqual(
        expect.objectContaining(expectedPrevState),
      );

      // Test the action and payload
      expect(spyLog.mock.calls[2][0]).toContain('action:');
      expect(spyLog.mock.calls[2][2]).toEqual(
        expect.objectContaining({
          type: action.type,
          payload,
        }),
      );

      // Test the next state
      expect(spyLog.mock.calls[3][0]).toContain('next state:');
      expect(spyLog.mock.calls[3][2]).toEqual(
        expect.objectContaining(expectedNextState),
      );
    });
  });
});

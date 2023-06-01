import {act, renderHook} from '@testing-library/react';
import {vi} from 'vitest';

import {ALTERNATE_WALLET, DEFAULT_WALLET} from '~/test/fixtures/wallet';
import {useTestLoggerStore} from '~/test/store';

const addedWalletState = {
  modal: {
    connectionStatus: 'Connecting',
    error: undefined,
    history: [],
    open: false,
    route: 'Connect',
    signing: false,
  },
  wallet: {
    activeWallet: DEFAULT_WALLET,
    connectedWallets: [DEFAULT_WALLET],
    message: undefined,
    pendingConnector: undefined,
    pendingWallet: undefined,
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
  const {result} = renderHook(() =>
    useTestLoggerStore((state) => state.wallet),
  );

  const spyLog = vi.spyOn(console, 'log');
  const {addWallet, setPendingWallet} = result.current;

  it('With multiple actions being dispatched', () => {
    const steps = [
      {
        action: addWallet,
        payload: DEFAULT_WALLET,
        expectedPrevState: {
          modal: {
            connectionStatus: 'Connecting',
            error: undefined,
            history: [],
            open: false,
            route: 'Connect',
            signing: false,
          },
          wallet: {
            activeWallet: undefined,
            connectedWallets: [],
            message: undefined,
            pendingConnector: undefined,
            pendingWallet: undefined,
          },
        },
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
      const actionType = `wallet/${action.name.toString()}`;

      act(() => action(payload as any));

      // Test the first message logged
      expect(spyLog.mock.calls[0][0]).toContain(
        `@shopify/connect-wallet%c: ${actionType}`,
      );

      // Test the previous state
      expect(spyLog.mock.calls[1][0]).toContain('previous state:');
      const previousStateObject = spyLog.mock.calls[1][2];

      expect(previousStateObject.modal).toEqual(
        expect.objectContaining(expectedPrevState.modal),
      );
      expect(previousStateObject.wallet).toEqual(
        expect.objectContaining(expectedPrevState.wallet),
      );

      // Test the action and payload
      expect(spyLog.mock.calls[2][0]).toContain('action:');
      expect(spyLog.mock.calls[2][2]).toEqual(
        expect.objectContaining({
          type: actionType,
          payload,
        }),
      );

      // Test the next state
      expect(spyLog.mock.calls[3][0]).toContain('next state:');
      const nextStateObject = spyLog.mock.calls[3][2];

      expect(nextStateObject.modal).toEqual(
        expect.objectContaining(expectedNextState.modal),
      );
      expect(nextStateObject.wallet).toEqual(
        expect.objectContaining(expectedNextState.wallet),
      );
    });
  });
});

import {vi} from 'vitest';

import {
  addWallet,
  setActiveWallet,
  setPendingWallet,
  validatePendingWallet,
} from '../slices/walletSlice';
import {store} from '../test/configureStore';
import {
  INVALID_SIGNATURE_RESPONSE,
  VALID_SIGNATURE_RESPONSE,
} from '../test/fixtures/signature';
import {DEFAULT_WALLET} from '../test/fixtures/wallet';
import {ConnectWalletError} from '../utils/error';

import {buildOnConnectMiddleware} from './onConnectMiddleware';

describe('onConnectMiddleware', () => {
  const effectFn = vi.fn();

  beforeEach(() => {
    const listener = buildOnConnectMiddleware(({wallet}) => effectFn(wallet));

    store.dispatch(listener);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('addWallet', () => {
    it('runs the effect when addWallet is dispatched', () => {
      store.dispatch(addWallet(DEFAULT_WALLET));

      expect(effectFn).toHaveBeenCalledWith(DEFAULT_WALLET);
    });
  });

  describe('setActiveWallet', () => {
    it('runs the effect when setActiveWallet payload is a wallet', () => {
      store.dispatch(setActiveWallet(DEFAULT_WALLET));

      expect(effectFn).toHaveBeenCalledWith(DEFAULT_WALLET);
    });

    it('does not run the effect when setActiveWallet payload is undefined', () => {
      store.dispatch(setActiveWallet(undefined));

      expect(effectFn).not.toHaveBeenCalled();
    });
  });

  describe('validatePendingWallet', () => {
    it('runs the effect when validatePendingWallet payload is a valid signed message', async () => {
      store.dispatch(setPendingWallet(DEFAULT_WALLET));

      await store.dispatch(validatePendingWallet(VALID_SIGNATURE_RESPONSE));

      expect(effectFn).toHaveBeenCalledWith(
        expect.objectContaining({...DEFAULT_WALLET}),
      );
    });

    it('does not run the effect when validatePendingWallet payload is not a valid signed message', async () => {
      store.dispatch(setPendingWallet(DEFAULT_WALLET));

      await expect(
        store.dispatch(validatePendingWallet(INVALID_SIGNATURE_RESPONSE)),
      ).rejects.toThrow(
        new ConnectWalletError(
          'Address that signed message does not match the connected address',
        ),
      );
    });
  });
});

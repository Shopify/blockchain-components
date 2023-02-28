import {isAnyOf} from '@reduxjs/toolkit';
import type {ListenerEffect} from '@reduxjs/toolkit';

import {
  addWallet,
  setActiveWallet,
  validatePendingWallet,
} from '../slices/walletSlice';
import {AppDispatch, RootState} from '../store/configureStore';
import {addListener} from '../store/listenerMiddleware';
import {GuardedType} from '../types/generics';
import {Wallet} from '../types/wallet';

const matcher = isAnyOf(
  addWallet,
  setActiveWallet,
  validatePendingWallet.fulfilled,
);

type ListenerEffectType = ListenerEffect<
  GuardedType<typeof matcher>,
  RootState,
  AppDispatch
>;

type EffectAction = Parameters<ListenerEffectType>['0'];
type EffectState = Parameters<ListenerEffectType>['1'];
interface EffectCallbackProps {
  state: EffectState;
  wallet: Wallet;
}

const isWalletPayload = (
  payload: EffectAction['payload'],
): payload is Wallet => {
  return payload !== undefined && 'address' in payload;
};

/**
 * Creates a listener that runs an effect when:
 * - a wallet is added via `addWallet`
 * - a wallet is set as the activeWallet via `setActiveWallet`
 * - a wallet is validated after signing via `validatePendingWallet`
 *
 * **NOTE**: The listener created is not automatically dispatched, this must be
 * done manually.
 *
 * @param effect Callback function which receives a Wallet type.
 */
export const buildOnConnectMiddleware = (
  effect?: ({state, wallet}: EffectCallbackProps) => void,
) => {
  return addListener({
    matcher,
    effect: (action, state) => {
      let walletToDispatch: Wallet | undefined;

      if (action.type === 'wallet/validatePendingWallet/fulfilled') {
        // Since the `validatePendingWallet` action ran we know that we
        // need to find the wallet from the list of connected wallets.
        const signatureResponse = action.meta.arg;
        const {address, signature} = signatureResponse;

        const {connectedWallets} = state.getState().wallet;
        walletToDispatch = connectedWallets.find(
          (wallet) =>
            wallet.address === address && wallet.signature === signature,
        );
      }

      if (isWalletPayload(action.payload)) {
        walletToDispatch = action.payload;
      }

      if (walletToDispatch) {
        return effect?.({state, wallet: walletToDispatch});
      }
    },
  });
};

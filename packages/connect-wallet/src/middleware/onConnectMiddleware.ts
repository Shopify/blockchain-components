import {isAnyOf} from '@reduxjs/toolkit';
import type {ListenerEffect} from '@reduxjs/toolkit';

import {
  addWallet,
  fetchDelegations,
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
  fetchDelegations.fulfilled,
);

type ListenerEffectType = ListenerEffect<
  GuardedType<typeof matcher>,
  RootState,
  AppDispatch
>;

type EffectState = Parameters<ListenerEffectType>['1'];
interface EffectCallbackProps {
  state: EffectState;
  wallet: Wallet;
}

/**
 * Creates a listener that runs an effect when:
 * - a wallet is added via `addWallet`
 * - a wallet is set as the activeWallet via `setActiveWallet`
 * - a wallet is validated after signing via `validatePendingWallet`
 * - the Delegate Cash vaults are added to the wallet via `fetchDelegations`
 *
 * **NOTE**: The listener created is not automatically dispatched, this must be
 * done manually.
 *
 * @param effect Callback function which receives a Wallet type.
 */
export const buildOnConnectMiddleware = (
  effect?: ({state, wallet}: EffectCallbackProps) => void,
  enableDelegateCash?: boolean,
) => {
  return addListener({
    matcher,
    effect: (action, state) => {
      // If Delegate Cash is enabled, we need to wait until we fetch the delegations
      // to dispatch the `onConnect` callback so that we also include the delegate-cash vaults.
      if (
        action.type !== 'wallet/fetchDelegations/fulfilled' &&
        enableDelegateCash
      ) {
        return;
      }

      const {activeWallet} = state.getState().wallet;

      if (activeWallet) {
        return effect?.({state, wallet: activeWallet});
      }
    },
  });
};

import {create} from 'zustand';
import {persist, subscribeWithSelector} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {logger} from './middleware/loggerMiddleware';
import {createModalState} from './modal/modalState';
import type {CombinedState} from './types';
import {createWalletState} from './wallet/walletState';

export const useStore = create<CombinedState>()(
  logger(
    persist(
      immer(
        subscribeWithSelector((...api) => ({
          modal: createModalState(...api),
          wallet: createWalletState(...api),
        })),
      ),
      {
        name: 'shopify-connect-wallet-store',
        partialize: (state) => ({
          wallet: {
            connectedWallets: state.wallet.connectedWallets,
          },
        }),
        merge: (persistedState, currentState) => {
          // persistedState is unknown, so we need to cast it to CombinedState | undefined
          const typedPersistedState = persistedState as
            | CombinedState
            | undefined;

          return {
            modal: currentState.modal,
            wallet: {
              ...currentState.wallet,
              ...(typedPersistedState?.wallet || {}),
            },
          };
        },
      },
    ),
  ),
);

import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {createModalState} from './modal/modalState';
import type {CombinedState} from './types';
import {createWalletState} from './wallet/walletState';

export const useStore = create<CombinedState>()(
  persist(
    immer((...api) => ({
      modal: createModalState(...api),
      wallet: createWalletState(...api),
    })),
    {
      name: 'shopify-connect-wallet-store',
      partialize: (state) => ({
        wallet: {
          connectedWallets: state.wallet.connectedWallets,
        },
      }),
    },
  ),
);

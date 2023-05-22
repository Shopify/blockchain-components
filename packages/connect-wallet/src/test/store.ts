import {create} from 'zustand';
import {subscribeWithSelector} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {createModalState} from '~/state/modal/modalState';
import {CombinedState} from '~/state/types';
import {createWalletState} from '~/state/wallet/walletState';

// when creating a store, we get its initial state, create a reset function and add it in the set
export const useTestStore = create<CombinedState>()(
  immer(
    subscribeWithSelector((...api) => ({
      modal: createModalState(...api),
      wallet: createWalletState(...api),
    })),
  ),
);

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SerializedConnector} from '../types/connector';
import {Wallet} from '../types/wallet';

export interface WalletSliceType {
  addressToVerify: string | undefined;
  connectedWallets: Wallet[];
  message?: string;
  pendingConnector: SerializedConnector | undefined;
  _persist: any;
}

export const initialState: WalletSliceType = {
  addressToVerify: undefined,
  connectedWallets: [],
  message: undefined,
  pendingConnector: undefined,
  _persist: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<Wallet>) => {
      /**
       * Prevent duplicate wallet addresses from being added to state.
       */
      if (
        state.connectedWallets.some(
          (wallet) => wallet.address === action.payload.address,
        )
      ) {
        return;
      }

      state.connectedWallets.push(action.payload);
    },
    clearSignatureState: (state) => {
      /**
       * In this action, we're clearing all state keys that are related
       * to the signature/signing action.
       */
      state.addressToVerify = initialState.addressToVerify;
      state.message = initialState.message;
      state.pendingConnector = initialState.pendingConnector;
    },
    setAddressToVerify: (state, action: PayloadAction<string | undefined>) => {
      state.addressToVerify = action.payload;
    },
    setMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
    },
    setPendingConnector: (
      state,
      action: PayloadAction<SerializedConnector | undefined>,
    ) => {
      state.pendingConnector = action.payload;
    },
    removeWallet: (state, action: PayloadAction<Wallet>) => {
      state.connectedWallets = state.connectedWallets.filter(
        (wallet) => wallet.address !== action.payload.address,
      );
    },
    updateWallet: (state, action: PayloadAction<Wallet>) => {
      state.connectedWallets = state.connectedWallets.map((wallet) => {
        if (wallet.address !== action.payload.address) {
          return wallet;
        }

        return {
          ...wallet,
          ...action.payload,
        };
      });
    },
  },
});

export const {
  addWallet,
  clearSignatureState,
  setAddressToVerify,
  setMessage,
  setPendingConnector,
  removeWallet,
  updateWallet,
} = walletSlice.actions;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {verifyMessage} from 'ethers/lib/utils';
import {SiweMessage} from 'siwe';

import {SerializedConnector} from '../types/connector';
import {SignatureResponse, Wallet} from '../types/wallet';
import {ConnectWalletError} from '../utils/error';

export interface WalletSliceType {
  connectedWallets: Wallet[];
  message?: string;
  pendingConnector: SerializedConnector | undefined;
  pendingWallet: Wallet | undefined;
  _persist: any;
}

export const initialState: WalletSliceType = {
  connectedWallets: [],
  message: undefined,
  pendingConnector: undefined,
  pendingWallet: undefined,
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
      state.message = initialState.message;
      state.pendingConnector = initialState.pendingConnector;
      state.pendingWallet = initialState.pendingWallet;
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
    setPendingWallet: (state, action: PayloadAction<Wallet | undefined>) => {
      state.pendingWallet = action.payload;
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
    /**
     * Validates whether the signature provided is valid proof of ownership
     * given the current `message` value.
     *
     * If the signature is valid, the wallet is moved from `pendingWallet` to
     * `connectedWallets`.
     *
     * **NOTE:** This does not handle cleanup of the signature state.
     * That is handled by clearSignatureState and should be dispatched as a
     * separate action.
     */
    validatePendingWallet: (
      state,
      action: PayloadAction<SignatureResponse>,
    ) => {
      // Ensure that we have a message and a pending wallet in state.
      if (!action.payload || !state.pendingWallet) {
        throw new ConnectWalletError(
          'Incomplete payload during signature validation',
        );
      }

      const {message, signature} = action.payload;
      const validatorMessage = new SiweMessage(JSON.parse(message));

      // Make copies of everything we are utilizing.
      const pendingWallet = {...state.pendingWallet};

      /**
       * Utilize `verifyMessage` from ethers to recover the signer address
       * from the signature.
       */
      const signerAddress = verifyMessage(
        validatorMessage.prepareMessage(),
        signature,
      );

      /**
       * If the addresses are not the same, then we should return an
       * error indicating that failure so we can properly inform the user.
       */

      if (state.pendingWallet.address !== signerAddress) {
        throw new ConnectWalletError('Invalid signature');
      }

      /**
       * We need to know now whether we are adding or updating a wallet.
       * At the moment I'm unsure that the signMessage will function without
       * having requireSignature defined as true. Perhaps something to look into.
       */
      if (
        state.connectedWallets.some(
          (wallet) => wallet.address === pendingWallet.address,
        )
      ) {
        state.connectedWallets.map((wallet) => {
          if (wallet.address !== pendingWallet.address) {
            return wallet;
          }

          return {
            ...wallet,
            message,
            signature,
            signed: true,
            signedOn: new Date().toISOString(),
          };
        });
      } else {
        state.connectedWallets.push({
          ...pendingWallet,
          message,
          signature,
          signed: true,
          signedOn: new Date().toISOString(),
        });
      }
    },
  },
});

export const {
  addWallet,
  clearSignatureState,
  setMessage,
  setPendingConnector,
  setPendingWallet,
  removeWallet,
  updateWallet,
  validatePendingWallet,
} = walletSlice.actions;

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
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

/**
 * Begins the validation process after a signature is provided.
 *
 * Utilizes SiweMessage.validate to confirm nonces match and
 * ethers verifyMessage to ensure the recovered address matches
 * the address provided via the signature payload.
 *
 * There are follow up state actions that run after this which
 * are responsible for updating connectedWallets in the event
 * of a succesful signature or error handling in the event
 * that there is a mismatch in the provided message.
 *
 * **NOTE:** This does not handle cleanup of the signature state.
 * That is handled by clearSignatureState and should be dispatched as a
 * separate action.
 */
export const validatePendingWallet = createAsyncThunk(
  'wallet/validatePendingWallet',
  async (response: SignatureResponse, thunkApi) => {
    if (!response) {
      return thunkApi.rejectWithValue(
        'Missing payload during signature validation',
      );
    }

    const {address, message, nonce, signature} = response;
    const siweMessage = new SiweMessage(JSON.parse(message));

    // Validate nonce via Siwe
    const fields = await siweMessage.validate(signature);

    /**
     * Utilize `verifyMessage` from ethers to recover the signer address
     * from the signature.
     */
    const recoveredAddress = verifyMessage(fields.toMessage(), signature);

    if (address !== recoveredAddress) {
      return thunkApi.rejectWithValue(
        'Address that signed message does not match the connected address',
      );
    }

    if (fields.nonce !== nonce) {
      return thunkApi.rejectWithValue('Signature nonce mismatch');
    }

    return thunkApi.fulfillWithValue({valid: true});
  },
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(validatePendingWallet.fulfilled, (state, action) => {
      /**
       * This is not likely to occur since the asyncThunk function for this
       * only fulfills when an error is not caught. All other cases are
       * funneled through the rejection method.
       */
      if (!action.payload.valid) {
        throw new ConnectWalletError(
          'An error was raised during wallet validation',
        );
      }

      /**
       * Ensure that we have a pending wallet in state in which we can gather
       * connector information from.
       */
      if (!state.pendingWallet) {
        throw new ConnectWalletError(
          'There is not a wallet pending validation',
        );
      }

      /**
       * Ensure that we have access to the argument provided to validatePendingWallet
       * as we need to store record of the message and signature.
       */
      if (!action.meta.arg) {
        throw new ConnectWalletError(
          'Missing payload during signature validation',
        );
      }

      const {message, signature} = action.meta.arg;

      /**
       * Make a copy of the pending wallet to ensure we maintain access to required
       * information (this is an effect of an async thunk)
       */
      const pendingWallet = {...state.pendingWallet};
      const newWallet: Wallet = {
        ...pendingWallet,
        message,
        signature,
        signedOn: new Date().toISOString(),
      };

      /**
       * The following should update a wallet if it exists in state
       * already, which shouldn't occur, but is a fallback here.
       * is dispatched and the wallet exists in our store already.
       */
      if (
        state.connectedWallets.some(
          (wallet) => wallet.address === newWallet.address,
        )
      ) {
        state.connectedWallets.map((wallet) => {
          if (wallet.address !== pendingWallet.address) {
            return wallet;
          }

          return {
            ...wallet,
            ...newWallet,
          };
        });
      } else {
        state.connectedWallets.push(newWallet);
      }
    });
    builder.addCase(validatePendingWallet.rejected, (_, action) => {
      let errorMessage = 'An error was raised during wallet validation';

      if (action.error.message) {
        errorMessage = action.error.message;
      }

      if (action.meta.rejectedWithValue && typeof action.payload === 'string') {
        errorMessage = action.payload;
      }

      throw new ConnectWalletError(errorMessage);
    });
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
} = walletSlice.actions;

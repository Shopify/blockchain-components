import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {verifyMessage} from 'ethers/lib/utils';
import {SiweMessage} from 'siwe';

import {SerializedConnector} from '../../types/connector';
import {SignatureResponse, Wallet} from '../../types/wallet';
import {ConnectWalletError} from '../../utils/error';

export interface WalletSliceType {
  activeWallet?: Wallet;
  connectedWallets: Wallet[];
  message?: string;
  pendingConnector: SerializedConnector | undefined;
  pendingWallet: Wallet | undefined;
  _persist: any;
}

export const initialState: WalletSliceType = {
  activeWallet: undefined,
  connectedWallets: [],
  message: undefined,
  pendingConnector: undefined,
  pendingWallet: undefined,
  _persist: '',
};

/**
 * Begins the validation process after a signature is provided.
 *
 * Utilizes SiweMessage.validate to validate that the signature
 * is a valid signature for the provided message.
 *
 * There are follow up state actions that run after this which
 * are responsible for updating connectedWallets in the event
 * of a succesful signature or error handling in the event
 * that there is a mismatch in the provided message.
 *
 * **NOTE:** This does not handle cleanup of the signature state.
 * That is handled by the actions which follow validatePendingWallet.
 */
export const validatePendingWallet = createAsyncThunk(
  'wallet/validatePendingWallet',
  (response: SignatureResponse, thunkApi) => {
    const {address, message, nonce, signature} = response;
    const fields = JSON.parse(message);

    const siweMessage = new SiweMessage(fields);

    /**
     * Utilize `verifyMessage` from ethers to recover the signer address
     * from the signature.
     */
    const recoveredAddress = verifyMessage(
      siweMessage.prepareMessage(),
      signature,
    );

    if (address !== recoveredAddress) {
      return thunkApi.rejectWithValue(
        'Address that signed message does not match the connected address',
      );
    }

    if (fields.nonce !== nonce) {
      return thunkApi.rejectWithValue('Signature nonce mismatch');
    }

    // We cannot utilize SIWE's validate or verify methods because they
    // require .decode for a class that we aren't able to polyfill in
    // vite environments.
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

      // Set the activeWallet to the newly connected wallet.
      state.activeWallet = action.payload;
    },
    setActiveWallet: (state, action: PayloadAction<Wallet | undefined>) => {
      state.activeWallet = action.payload;
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

      // If we are disconnecting the activeWallet then we should reset activeWallet
      if (state.activeWallet?.address === action.payload.address) {
        state.activeWallet = undefined;
      }
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

      const {message, signature} = action.meta.arg;
      const siweMessage = new SiweMessage(JSON.parse(message));
      const signedMessage = siweMessage.prepareMessage();

      /**
       * Make a copy of the pending wallet to ensure we maintain access to required
       * information (this is an effect of an async thunk)
       */
      const pendingWallet = {...state.pendingWallet};
      const newWallet: Wallet = {
        ...pendingWallet,
        message: signedMessage,
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
        state.connectedWallets = state.connectedWallets.map((wallet) => {
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

      state.activeWallet = newWallet;
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
  setActiveWallet,
  setPendingConnector,
  setPendingWallet,
  removeWallet,
  updateWallet,
} = walletSlice.actions;

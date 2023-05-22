import {SiweMessage} from 'siwe';

import type {StateSlice, WalletStateDefintion, WalletStateType} from '../types';

import {fetchDelegations} from './fetchDelegations';
import {fetchEns} from './fetchEns';
import {validatePendingWallet} from './validatePendingWallet';

import {Wallet} from '~/types/wallet';
import {ConnectWalletError} from '~/utils/error';

const initialWalletState: WalletStateDefintion = {
  activeWallet: undefined,
  connectedWallets: [],
  message: undefined,
  pendingConnector: undefined,
  pendingWallet: undefined,
};

export const createWalletState: StateSlice<WalletStateType> = (set, get) => ({
  ...initialWalletState,
  addWallet: (payload) =>
    set(
      (state) => {
        // Prevent duplicate wallet addresses from being added to state.
        if (
          state.wallet.connectedWallets.some(
            ({address}) => address === payload.address,
          )
        ) {
          return;
        }

        state.wallet.connectedWallets.push(payload);

        // Set the activeWallet to the newly connected wallet.
        state.wallet.activeWallet = payload;
      },
      false,
      {
        type: 'wallet/addWallet',
        payload,
      },
    ),
  fetchDelegates: async ({address}) => {
    const vaults = await fetchDelegations(address);

    set(
      (state) => {
        // Update wallet for connectedWallets key value.
        const connectedWallet = state.wallet.connectedWallets.find(
          (wallet) => wallet.address === address,
        );

        if (connectedWallet) {
          connectedWallet.vaults = vaults;
        }

        // Update wallet for activeWallet key value.
        if (state.wallet.activeWallet?.address === address) {
          state.wallet.activeWallet.vaults = vaults;
        }
      },
      false,
      {
        type: 'wallet/fetchDelegates',
        payload: address,
      },
    );
  },
  fetchEns: async (payload) => {
    const ensName = await fetchEns(payload);

    set(
      (state) => {
        state.wallet.connectedWallets = state.wallet.connectedWallets.map(
          (wallet) => {
            if (wallet.address !== payload.address) {
              return wallet;
            }

            return {
              ...wallet,
              displayName: ensName,
            };
          },
        );

        if (state.wallet.activeWallet?.address === payload.address) {
          state.wallet.activeWallet.displayName = ensName;
        }
      },
      false,
      {
        type: 'wallet/fetchEns',
        payload,
      },
    );
  },
  setActiveWallet: (payload) =>
    set(
      (state) => {
        state.wallet.activeWallet = payload;
      },
      false,
      {
        type: 'wallet/setActiveWallet',
        payload,
      },
    ),
  setPendingConnector: (payload) =>
    set(
      (state) => {
        state.wallet.pendingConnector = payload;
      },
      false,
      {
        type: 'wallet/setPendingConnector',
        payload,
      },
    ),
  setPendingWallet: (payload) =>
    set(
      (state) => {
        state.wallet.pendingWallet = payload;
      },
      false,
      {
        type: 'wallet/setPendingWallet',
        payload,
      },
    ),
  removeWallet: (payload) =>
    set(
      (state) => {
        state.wallet.connectedWallets = state.wallet.connectedWallets.filter(
          ({address}) => address !== payload.address,
        );

        // If we are disconnecting the activeWallet then we should reset activeWallet
        if (state.wallet.activeWallet?.address === payload.address) {
          state.wallet.activeWallet = undefined;
        }
      },
      false,
      {
        type: 'wallet/removeWallet',
        payload,
      },
    ),
  updateWallet: (payload) =>
    set(
      (state) => {
        state.wallet.connectedWallets = state.wallet.connectedWallets.map(
          (wallet) => {
            if (wallet.address !== payload.address) {
              return wallet;
            }

            return {
              ...wallet,
              ...payload,
            };
          },
        );

        if (state.wallet.activeWallet?.address === payload.address) {
          state.wallet.activeWallet = {
            ...state.wallet.activeWallet,
            ...payload,
          };
        }
      },
      false,
      {
        type: 'wallet/updateWallet',
        payload,
      },
    ),
  validatePendingWallet: (payload) => {
    try {
      /**
       * Ensure that we have a pending wallet in state in which we can gather
       * connector information from.
       */
      const pendingWallet = get().wallet.pendingWallet;

      if (!pendingWallet) {
        throw new ConnectWalletError(
          'There is not a wallet pending validation',
        );
      }

      // We know if a wallet is valid or not based on whether or not
      // an error was thrown.
      validatePendingWallet(payload);

      const {message, signature} = payload;

      // eslint-disable-next-line no-warning-comments
      // TODO: Remove the signature from the stored state.
      // Instead, we should offer an `onMessageSigned` hook to `useConnectWallet`.
      const siweMessage = new SiweMessage(JSON.parse(message));
      const signedMessage = siweMessage.prepareMessage();

      const newWallet: Wallet = {
        ...pendingWallet,
        // See note above about removing the storage of the message.
        message: signedMessage,
        signature,
        signedOn: new Date().toISOString(),
      };

      set(
        (state) => {
          /**
           * The following should update a wallet if it exists in state
           * already, which shouldn't occur, but is a fallback.
           */
          if (
            state.wallet.connectedWallets.some(
              (wallet) => wallet.address === newWallet.address,
            )
          ) {
            state.wallet.connectedWallets = state.wallet.connectedWallets.map(
              (wallet) => {
                if (wallet.address !== pendingWallet.address) {
                  return wallet;
                }

                return {
                  ...wallet,
                  ...newWallet,
                };
              },
            );
          } else {
            state.wallet.connectedWallets.push(newWallet);
          }

          state.wallet.activeWallet = newWallet;
          state.wallet.pendingWallet = undefined;
        },
        false,
        {
          type: 'wallet/validatePendingWallet',
          payload,
        },
      );
    } catch (error) {
      // eslint-disable-next-line no-process-env
      if (process.env.NODE_ENV === 'production') {
        console.error(error);
      }

      throw error;
    }
  },
});

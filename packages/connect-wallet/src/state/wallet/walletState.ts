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
  addWallet: (wallet) =>
    set((state) => {
      // Prevent duplicate wallet addresses from being added to state.
      if (
        state.wallet.connectedWallets.some(
          ({address}) => address === wallet.address,
        )
      ) {
        return;
      }

      state.wallet.connectedWallets.push(wallet);

      // Set the activeWallet to the newly connected wallet.
      state.wallet.activeWallet = wallet;
    }),
  fetchDelegates: async ({address}) => {
    const vaults = await fetchDelegations(address);

    set((state) => {
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
    });
  },
  fetchEns: async (props) => {
    const ensName = await fetchEns(props);

    set((state) => {
      state.wallet.connectedWallets = state.wallet.connectedWallets.map(
        (wallet) => {
          if (wallet.address !== props.address) {
            return wallet;
          }

          return {
            ...wallet,
            displayName: ensName,
          };
        },
      );

      if (state.wallet.activeWallet?.address === props.address) {
        state.wallet.activeWallet.displayName = ensName;
      }
    });
  },
  setActiveWallet: (wallet) =>
    set((state) => (state.wallet.activeWallet = wallet)),
  setPendingConnector: (value) =>
    set((state) => (state.wallet.pendingConnector = value)),
  setPendingWallet: (value) =>
    set((state) => (state.wallet.pendingWallet = value)),
  removeWallet: (wallet) =>
    set((state) => {
      state.wallet.connectedWallets = state.wallet.connectedWallets.filter(
        ({address}) => address !== wallet.address,
      );

      // If we are disconnecting the activeWallet then we should reset activeWallet
      if (state.wallet.activeWallet?.address === wallet.address) {
        state.wallet.activeWallet = undefined;
      }
    }),
  updateWallet: (update) =>
    set((state) => {
      state.wallet.connectedWallets = state.wallet.connectedWallets.map(
        (wallet) => {
          if (wallet.address !== update.address) {
            return wallet;
          }

          return {
            ...wallet,
            ...update,
          };
        },
      );

      if (state.wallet.activeWallet?.address === update.address) {
        state.wallet.activeWallet = {
          ...state.wallet.activeWallet,
          ...update,
        };
      }
    }),
  validatePendingWallet: (signatureResponse) => {
    try {
      // We know if a wallet is valid or not based on whether or not
      // an error was thrown.
      validatePendingWallet(signatureResponse);

      const pendingWallet = get().wallet.pendingWallet;

      /**
       * Ensure that we have a pending wallet in state in which we can gather
       * connector information from.
       */
      if (!pendingWallet) {
        throw new ConnectWalletError(
          'There is not a wallet pending validation',
        );
      }

      const {message, signature} = signatureResponse;

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

      set((state) => {
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
      });
    } catch (error) {
      console.error(error);
      // This means our wallet was not valid.
    }
  },
});

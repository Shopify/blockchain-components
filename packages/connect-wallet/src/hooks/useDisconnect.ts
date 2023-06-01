import {publishEvent, eventNames} from '@shopify/blockchain-components';
import {useCallback} from 'react';
import {useDisconnect as wagmiUseDisconnect, useAccount} from 'wagmi';

import {useStore} from '~/state';
import {ConnectWalletError} from '~/utils/error';

export const useDisconnect = () => {
  const {activeWallet, connectedWallets, removeWallet, setActiveWallet} =
    useStore((state) => state.wallet);
  const {disconnect} = wagmiUseDisconnect();

  const {address: connectedAddress} = useAccount({
    onDisconnect: () => {
      if (activeWallet) {
        /**
         * Ensure that if we have an activeWallet that we call
         * the remove function to clean up the connectedWallets.
         *
         * This will also ensure that the onDisconnect callback
         * is run via the useConnectWalletCallbacks.
         *
         * We early exit here because removeWallet will set
         * activeWallet to undefined for us and we don't want to
         * dispatch onDisconnect numerous times.
         */
        removeWallet(activeWallet);
        return;
      }

      setActiveWallet(undefined);
    },
  });

  const handleDisconnect = useCallback(
    (address?: string) => {
      const addressToDisconnect = address || (connectedAddress as string);
      publishEvent(eventNames.CONNECT_WALLET_ON_DISCONNECT_EVENT, {
        address: addressToDisconnect,
      });

      if (!addressToDisconnect) {
        console.error(
          new ConnectWalletError(
            'There is not a connected wallet nor was a wallet address provided to the disconnect function',
          ),
        );
      }

      /**
       * Find the wallet in our store and remove it.
       *
       * If we don't find the wallet for some reason we can
       * assume there is stale state and still perform the disconnect.
       *
       * Another assumption being made here is that we don't have
       * multiple of the same address in our store. Since we prevent
       * the addition of any wallets that have a matching address, this
       * is a relatively safe assumption.
       */
      const walletToDisconnect = connectedWallets.find(
        (wallet) => wallet.address === addressToDisconnect,
      );

      if (walletToDisconnect) {
        removeWallet(walletToDisconnect);
      }

      /**
       * Guard the disconnect invocation by checking to see if the address
       * matches the currently connected / active wallet.
       */
      if (addressToDisconnect === connectedAddress) {
        disconnect();
      }
    },
    [connectedAddress, connectedWallets, disconnect, removeWallet],
  );

  return {disconnect: handleDisconnect};
};

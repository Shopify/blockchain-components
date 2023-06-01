import {eventNames, publishEvent} from '@shopify/blockchain-components';
import {useEffect} from 'react';

import {useConnectWalletProps} from './types';

import {useStore} from '~/state';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {onConnect, onDisconnect} = props || {};

  /**
   * Add the onConnect callback listeners.
   *
   * This listener will run immediately after activeWallet
   * is set to a non-undefined value.
   */
  useEffect(() => {
    const listener = useStore.subscribe(
      (state) => state.wallet.activeWallet,
      (wallet, prevWallet) => {
        if (wallet !== undefined && prevWallet === undefined) {
          // Publish the onConnect event.
          publishEvent(eventNames.CONNECT_WALLET_ON_CONNECT_EVENT, {
            address: wallet.address,
            vaults: wallet.vaults,
            connector: wallet.connectorId,
          });

          // Run the provided onConnect callback.
          onConnect?.(wallet);
        }
      },
    );

    // Clean up the subscriber.
    return () => {
      listener();
    };
  }, [onConnect]);

  // Add the onDisconnect callback listeners.
  useEffect(() => {
    const listener = useStore.subscribe(
      (state) => state.wallet.connectedWallets,
      (next, prev) => {
        // Check the length to see if the updatedWallets has fewer
        // items in it than the previous wallets.
        if (next.length < prev.length) {
          /**
           * Find the difference in the the state value.
           *
           * It should almost always only be a single wallet, but
           * we will have an array of wallets in the difference return
           * so we will just map through and call the callback for
           * each wallet in the diff.
           */
          const diff = prev.filter((wallet) => !next.includes(wallet));

          // Run the callbacks on each wallet in the diff.
          diff.forEach((wallet) => {
            onDisconnect?.(wallet);
          });
        }
      },
    );

    // Clean up the subscriber.
    return () => {
      listener();
    };
  }, [onDisconnect]);
};

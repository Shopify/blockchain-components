import {useCallback} from 'react';
import {useDisconnect as wagmiUseDisconnect, useAccount} from 'wagmi';

import {removeWallet} from '../slices/walletSlice';

import {useAppDispatch, useAppSelector} from './useAppState';

export const useDisconnect = () => {
  const dispatch = useAppDispatch();
  const {disconnect} = wagmiUseDisconnect();
  const {address: connectedAddress} = useAccount();
  const {connectedWallets} = useAppSelector((state) => state.wallet);

  const handleDisconnect = useCallback(
    (address?: string) => {
      const addressToDisconnect = address || (connectedAddress as string);

      if (!addressToDisconnect) {
        throw new Error(
          'There is not a connected wallet nor was a wallet address provided to the disconnect function.',
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
        dispatch(removeWallet(walletToDisconnect));

        // @TODO: we need to figure out how to get the callback in this hook
        // onDisconnect?.(walletToDisconnect);
      }

      /**
       * Guard the disconnect invocation by checking to see if the address
       * matches the currently connected / active wallet.
       */
      if (addressToDisconnect === connectedAddress) {
        disconnect();
      }
    },
    [connectedAddress, connectedWallets, disconnect, dispatch],
  );
  return {disconnect: handleDisconnect};
};

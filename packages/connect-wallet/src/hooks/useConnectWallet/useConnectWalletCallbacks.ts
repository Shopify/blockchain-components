import {useCallback, useContext, useEffect} from 'react';
import {Connector, useAccount} from 'wagmi';

import {ModalContext} from '../../providers/ModalProvider';
import {validatePendingWallet} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {SignatureResponse, Wallet} from '../../types/wallet';
import {ConnectWalletError} from '../../utils/error';
import {useAppDispatch, useAppSelector} from '../useAppState';
import {useOrderAttribution} from '../useOrderAttribution';

import {useConnectWalletProps} from './types';

export const useConnectWalletCallbacks = (props?: useConnectWalletProps) => {
  const {
    messageSignedOrderAttributionMode,
    onConnect,
    onDisconnect,
    onMessageSigned,
  } = props || {};
  const {requireSignature} = useContext(ModalContext);
  const dispatch = useAppDispatch();
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );

  const attributeOrder = useOrderAttribution();

  const handleAttribution = useCallback(
    async (response: SignatureResponse) => {
      if (messageSignedOrderAttributionMode === 'disabled') return;

      if (messageSignedOrderAttributionMode === 'ignoreErrors') {
        if (!response?.address) return;

        // when `messageSignedOrderAttributionMode` is set to `ignoreErrors`,
        // we don't want to block the caller from continuing, so we
        // just console log the error to fail silently. Note this is a non-awaited
        // promise.
        attributeOrder({address: response.address}).catch((error) => {
          console.error(
            'Error attributing order--ignoring due to orderAttributionMode=ignoreErrors',
            error,
          );
        });
        return;
      }

      // by default we require attribution
      if (!response?.address) {
        throw new ConnectWalletError('No address found in signature response');
      }

      // since the attribution mode is `required`, we want to propagate any errors that occur here.
      await attributeOrder({address: response.address});
    },
    [messageSignedOrderAttributionMode, attributeOrder],
  );

  // Define event listeners.
  useEffect(() => {
    if (requireSignature) {
      const unsubscribeToMessageSigned = dispatch(
        addListener({
          actionCreator: validatePendingWallet,
          effect: (action, state) => {
            // pendingWallet does not
            const {pendingWallet} = state.getState().wallet;
            const signature = action.payload;

            /**
             * pendingWallet _should_ be defined here since it does not
             * get reset during the validatePendingWallet action. However,
             *  we can exit in the event that it is undefined.
             */
            if (!pendingWallet) {
              return;
            }

            const {address, message} = pendingWallet;

            const response: SignatureResponse = {
              address,
              message,
              signature,
            };

            onMessageSigned?.(response);
            handleAttribution(response);
          },
        }),
      );

      return unsubscribeToMessageSigned;
    }
  }, [dispatch, handleAttribution, onMessageSigned, requireSignature]);

  const handleConnect = useCallback(
    ({
      address,
      connector,
      isReconnected,
    }: {
      address?: string;
      connector?: Connector;
      isReconnected: boolean;
    }) => {
      if (!address) {
        return;
      }

      /**
       * Wagmi makes use of isReconnected to rehydrate the client.
       * We need to make sure that we can re-dispatch the onConnect
       * callback for token validation.
       */
      if (isReconnected) {
        const reconnectedWallet = connectedWallets.find(
          (wallet) => wallet.address === address,
        );

        if (reconnectedWallet) {
          onConnect?.(reconnectedWallet);
          return;
        }
      }

      /**
       * Check to ensure we have a pending connector before proceeding.
       *
       * We require information from the pending connector to determine
       * where the connection originated (for UX purposes).
       *
       * The only exception here is if the connector is an injected
       * connector because they reconnect automatically. This should
       * only affect Coinbase Wallet and MetaMask.
       */
      if (!pendingConnector && !connector) {
        return;
      }

      const wallet: Wallet = {
        address,
        connectorId: pendingConnector?.id || connector?.id,
        connectorName: pendingConnector?.name || connector?.name,
        // If signatures are required set signed to false
        signed: requireSignature ? false : undefined,
      };

      // Call the onConnect callback provided via props
      onConnect?.(wallet);
    },
    [connectedWallets, onConnect, pendingConnector, requireSignature],
  );

  const {isDisconnected, isConnected} = useAccount({
    onDisconnect,
    onConnect: handleConnect,
  });

  return {
    isConnected,
    isDisconnected,
  };
};

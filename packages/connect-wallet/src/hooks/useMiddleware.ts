import {useEffect} from 'react';
import {useAccount, useNetwork, useProvider} from 'wagmi';

import {buildOnConnectMiddleware} from '../middleware/onConnectMiddleware';
import {
  addWallet,
  attributeOrder,
  fetchEns,
  fetchDelegations,
  setActiveWallet,
  setPendingWallet,
} from '../slices/walletSlice';
import {addListener} from '../store/listenerMiddleware';
import {OrderAttributionMode} from '../types/orderAttribution';
import {Wallet} from '../types/wallet';

import {useAppDispatch, useAppSelector} from './useAppState';
import {useSignMessage} from './useSignMessage';

interface UseMiddlewareProps {
  enableDelegateCash?: boolean;
  orderAttributionMode: OrderAttributionMode;
  requireSignature?: boolean;
}

export const useMiddleware = ({
  enableDelegateCash,
  orderAttributionMode,
  requireSignature,
}: UseMiddlewareProps) => {
  const dispatch = useAppDispatch();
  const {connectedWallets, pendingConnector} = useAppSelector(
    (state) => state.wallet,
  );
  const {chain} = useNetwork();
  const provider = useProvider();
  const {signMessage} = useSignMessage();

  useAccount({
    onConnect: ({address, connector, isReconnected}) => {
      if (!address) {
        return;
      }

      const reconnectedWallet: Wallet | undefined = connectedWallets.find(
        (wallet) => wallet.address === address,
      );

      if (requireSignature) {
        /**
         * Check if the wallet has already signed. If so, we can set
         * the active wallet and not require a new signature.
         */
        if (isReconnected && reconnectedWallet?.signature) {
          return dispatch(setActiveWallet(reconnectedWallet));
        }

        /**
         * Check to ensure we have connector data before proceeding. We
         * need connector for injected connectors such as Coinbase Wallet
         * and MetaMask. Otherwise, utilize pendingConnector value.
         */
        if (!pendingConnector && !connector) {
          return;
        }

        const wallet: Wallet = {
          address,
          connectorId: pendingConnector?.id || connector?.id,
          connectorName: pendingConnector?.name || connector?.name,
        };

        return dispatch(setPendingWallet(wallet));
      }

      /**
       * If we don't require a signature and we have a reconnected
       * wallet then we can set the active wallet.
       */
      if (reconnectedWallet) {
        return dispatch(setActiveWallet(reconnectedWallet));
      }

      // Exit if we don't have pendingConnector information.
      if (!pendingConnector) {
        return;
      }

      // This means that the user just connected their wallet.
      dispatch(
        addWallet({
          address,
          connectorId: pendingConnector.id,
          connectorName: pendingConnector.name,
        }),
      );
    },
  });

  /**
   * Pending wallet listener
   *
   * Utilized to request signature verification.
   */
  useEffect(() => {
    if (requireSignature) {
      return dispatch(
        addListener({
          actionCreator: setPendingWallet,
          effect: (action, _) => {
            const wallet = action.payload;

            if (!wallet) {
              return;
            }

            signMessage(wallet);
          },
        }),
      );
    }
  }, [dispatch, signMessage, requireSignature]);

  /**
   * Fetch delegations listener
   *
   * This listener will run after the delegations are fetched and
   * will attribute the wallet addresses to the order.
   *
   * Complete flow diagram of connecting a wallet: https://tinyurl.com/4dbfcm5w
   */
  useEffect(() => {
    return dispatch(
      addListener({
        actionCreator: fetchDelegations.fulfilled,
        effect: (action, state) => {
          const {address, vaults} = action.payload;
          state.dispatch(
            attributeOrder({
              orderAttributionMode,
              wallet: {address, vaults},
            }),
          );
        },
      }),
    );
  }, [dispatch, orderAttributionMode]);

  /**
   * onConnect listener (internal)
   *
   * This listener will run order attribution functionality.
   */
  useEffect(() => {
    const listener = buildOnConnectMiddleware(({state, wallet}) => {
      /**
       * This will re-run the query for ENS names every time that
       * the page reloads as well. Which might be desired if a user
       * buys an ENS in between connecting their wallet. However, it
       * could lead to excessive calls to the chain.
       */
      if (chain) {
        const {unsupported, ...rest} = chain;
        state.dispatch(
          fetchEns({address: wallet.address, chain: {...rest}, provider}),
        );
      }
      /**
       * This will fetch the delegate-cash delegations for the wallet.
       *
       * Complete flow diagram of connecting a wallet: https://tinyurl.com/4dbfcm5w
       */
      state.dispatch(
        fetchDelegations({walletAddress: wallet.address, enableDelegateCash}),
      );
    });

    return dispatch(listener);
  }, [chain, dispatch, enableDelegateCash, orderAttributionMode, provider]);
};

import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useAccount, useConnect} from 'wagmi';
import {isAnyOf} from '@reduxjs/toolkit';

import {Modal} from '../../components';
import {ConnectWalletContext} from '../ConnectWalletProvider';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useDisconnect} from '../../hooks/useDisconnect';
import {useSyncSignMessage} from '../../hooks/useSyncSignMessage';
import {
  addWallet,
  attributeOrder,
  fetchDelegates,
  setActiveWallet,
  setPendingConnector,
  setPendingWallet,
  validatePendingWallet,
} from '../../slices/walletSlice';
import {addListener} from '../../store/listenerMiddleware';
import {ConnectionState} from '../../types/connectionState';
import {Wallet} from '../../types/wallet';
import {ConnectWalletError} from '../../utils/error';

import {ModalRoute, ModalContext, ModalProviderValue} from './context';

export const ModalProvider: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch();
  const {connectedWallets, pendingConnector, pendingWallet} = useAppSelector(
    (state) => state.wallet,
  );
  const {allowDelegates, requireSignature, orderAttributionMode} =
    useContext(ConnectWalletContext);
  const {disconnect} = useDisconnect();
  const {signing, signMessage} = useSyncSignMessage();

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

  const [active, setActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>(
    ConnectionState.Connecting,
  );
  const [error, setError] = useState<Error>();
  const [route, setRoute] = useState(ModalRoute.Connect);
  const [history, setHistory] = useState<ModalRoute[]>([]);

  const clearError = useCallback(() => {
    setError(undefined);
  }, [setError]);

  const cleanupSignatureState = useCallback(() => {
    if (route !== ModalRoute.Signature) {
      return;
    }

    disconnect(pendingWallet?.address);
    clearError();
  }, [clearError, disconnect, pendingWallet?.address, route]);

  const handleNavigate = useCallback(
    (screenName: ModalRoute) => {
      setHistory([...history, screenName]);
      setRoute(screenName);
    },
    [history],
  );

  /**
   * Performs the basic close and reset functionality
   * for the modal.
   */
  const resetModal = useCallback(() => {
    // Clear the pendingConnector + pendingWallet
    dispatch(setPendingConnector(undefined));
    dispatch(setPendingWallet(undefined));
    setActive(false);
    setHistory([]);
    setRoute(ModalRoute.Connect);
  }, [dispatch]);

  /**
   * Runs the default close + reset functionality
   * as well as the signature cleanup functionality.
   *
   * Signature cleanup should only be performed
   * when the user dismisses the modal while signing or
   * when pressing "Back" while signing.
   */
  const handleCloseModal = useCallback(() => {
    resetModal();
    cleanupSignatureState();
  }, [cleanupSignatureState, resetModal]);

  const handleGoBack = useCallback(() => {
    cleanupSignatureState();

    if (history.length) {
      const newHistory = history.slice(0, history.length - 1);

      /**
       * If the new history contains more than one entry, we can
       * use the last entry in the history array as our new screen.
       * Otherwise, we go back to the first screen,
       */
      const newScreen = newHistory.length
        ? newHistory[newHistory.length - 1]
        : ModalRoute.Connect;

      setHistory(newHistory);
      setRoute(newScreen);
    }
  }, [cleanupSignatureState, history]);

  /**
   * ## requestSignature
   *
   * Uses an optional message parameter. If no message is passed as a param, then
   * the function will utilize the message stored in state (if present).
   *
   * If a stored message is not present and a message is not provided,
   * the signature request will fail.
   */
  const requestSignature = useCallback(
    async (wallet?: Wallet) => {
      if (!requireSignature) {
        throw new ConnectWalletError(
          'Signatures can only be requested on connect when requireSignature is true',
        );
      }

      if (!wallet) {
        throw new ConnectWalletError(
          'No wallet provided to requestSignature function',
        );
      }

      // If the modal is not present, ensure that we open it.
      if (!active) {
        setRoute(ModalRoute.Signature);
        setActive(true);
      }

      try {
        const signedMessage = await signMessage(wallet);
        /**
         * Note: We will only move past the validatePendingWallet action
         * when the signed message is decrypted to match the address
         * matching the pending wallet and the nonces match.
         *
         * In the event that the following fails (throws an error due to
         * mismatched addresses) we will set the error state for the
         * signature modal and allow the user to try again.
         */
        await dispatch(validatePendingWallet(signedMessage));

        /**
         * Close the modal using `resetModal`.
         *
         * Signature cleanup should only be performed
         * when the user dismisses the modal while signing or
         * when pressing "Back" while signing, so we utilize
         * resetModal here to ensure the wallet
         * is not disconnected.
         */
        resetModal();

        // Return the verification response.
        return signedMessage;
      } catch (error: any) {
        /**
         * Set the error in state, resulting in an updated UI state for
         * the signature modal. The user can attempt to sign the message
         * with the correct wallet again.
         */
        setError(error);
      }
    },
    [requireSignature, active, signMessage, dispatch, resetModal],
  );

  const {connect} = useConnect({
    onMutate: ({connector}) => {
      if (connector.ready) {
        setConnectionStatus(ConnectionState.Connecting);
      } else {
        setConnectionStatus(ConnectionState.Unavailable);
      }
    },
    onSettled: (_, error) => {
      if (error) {
        if (error.message === 'User rejected request') {
          setConnectionStatus(ConnectionState.Rejected);
          return;
        }

        if (error.message !== 'Connector already connected') {
          setConnectionStatus(ConnectionState.Failed);
          console.error(
            `Caught error while attempting to connect with ${pendingConnector?.name} - ${error}`,
          );
          return;
        }
      }

      setConnectionStatus(ConnectionState.Connected);

      /**
       * We should close the modal if we're not utilizing requireSignature,
       * otherwise we should navigate to a new screen. This is wrapped in a
       * setTimeout so we can show the user that their connection succeeded.
       */
      setTimeout(() => {
        if (requireSignature) {
          handleNavigate(ModalRoute.Signature);
        } else {
          handleCloseModal();
        }
      }, 500);
    },
  });

  // when a wallet gets connected, then attribute the wallet address
  // to the order.
  useEffect(() => {
    return dispatch(
      addListener({
        actionCreator: validatePendingWallet.fulfilled,
        effect: (action, listenerApi) => {
          listenerApi.dispatch(
            attributeOrder({
              orderAttributionMode,
              wallet: action.meta.arg,
            }),
          );
        },
      }),
    );
  }, [dispatch, orderAttributionMode]);

  // when a wallet gets connected, then attribute the wallet address
  // to the order.
  useEffect(() => {
    return dispatch(
      addListener({
        matcher: isAnyOf(addWallet, setActiveWallet),
        effect: (action, listenerApi) => {
          const payload = (action as any)?.payload || {};
          if (!hasAddress(payload)) return;

          listenerApi.dispatch(
            attributeOrder({
              orderAttributionMode,
              wallet: payload,
            }),
          );

          function hasAddress(payload: any): payload is {address: string} {
            if (!payload) return false;
            if (!payload.address) return false;

            return true;
          }
        },
      }),
    );
  }, [dispatch, orderAttributionMode]);

  // when a wallet is connected for the first time, fetch the delegates (if enabled)
  useEffect(() => {
    if (allowDelegates) {
      return dispatch(
        addListener({
          matcher: isAnyOf(addWallet, validatePendingWallet.fulfilled),
          effect: (action, state) => {
            let addressToDispatch: string;

            // This is validatePendingWallet.fulfilled
            if (action.type === 'wallet/validatePendingWallet/fulfilled') {
              const {address} = action.meta.arg;
              addressToDispatch = address;
            } else {
              addressToDispatch = action.payload.address;
            }

            state.dispatch(fetchDelegates(addressToDispatch));
          },
        }),
      );
    }
  }, [allowDelegates, dispatch]);

  useEffect(() => {
    if (requireSignature) {
      const unsubscribeSetPendingWallet = dispatch(
        addListener({
          actionCreator: setPendingWallet,
          effect: (action, _) => {
            const wallet = action.payload;

            if (!wallet) {
              return;
            }

            requestSignature(wallet);
          },
        }),
      );

      return unsubscribeSetPendingWallet;
    }
  }, [dispatch, requestSignature, requireSignature]);

  const contextValue: ModalProviderValue = useMemo(() => {
    return {
      active,
      clearError,
      closeModal: handleCloseModal,
      connect,
      connectionStatus,
      error,
      navigation: {
        goBack: handleGoBack,
        navigate: handleNavigate,
        route,
      },
      openModal: () => setActive(true),
      requestSignature,
      signing,
    };
  }, [
    active,
    clearError,
    connect,
    connectionStatus,
    error,
    handleCloseModal,
    handleGoBack,
    handleNavigate,
    requestSignature,
    route,
    signing,
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

import {PropsWithChildren, useCallback, useMemo, useState} from 'react';
import {useConnect} from 'wagmi';

import {Modal} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useDisconnect} from '../../hooks/useDisconnect';
import {useSyncSignMessage} from '../../hooks/useSyncSignMessage';
import {
  clearSignatureState,
  setMessage,
  setPendingConnector,
  setPendingWallet,
  validatePendingWallet,
} from '../../slices/walletSlice';
import {ConnectionState} from '../../types/connectionState';
import {ModalProviderProps} from '../../types/provider';

import {ModalRoute, ModalContext, ModalProviderValue} from './context';

export const ModalProvider: React.FC<PropsWithChildren<ModalProviderProps>> = ({
  children,
  requireSignature,
}) => {
  const dispatch = useAppDispatch();
  const {message, pendingConnector, pendingWallet} = useAppSelector(
    (state) => state.wallet,
  );
  const {disconnect} = useDisconnect();
  const {signing, signMessage} = useSyncSignMessage();

  const [active, setActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>(
    ConnectionState.Connecting,
  );
  const [error, setError] = useState<Error>();
  const [route, setRoute] = useState(ModalRoute.Connect);
  const [history, setHistory] = useState<ModalRoute[]>([]);

  const handleNavigate = useCallback(
    (screenName: ModalRoute) => {
      setHistory([...history, screenName]);
      setRoute(screenName);
    },
    [history],
  );

  const handleCloseModal = useCallback(() => {
    // Clear the pending connector
    if (pendingConnector || pendingWallet) {
      dispatch(setPendingConnector(undefined));
      dispatch(setPendingWallet(undefined));
    }

    setActive(false);
    setHistory([]);
    setRoute(ModalRoute.Connect);
  }, [dispatch, pendingConnector, pendingWallet]);

  const clearError = useCallback(() => {
    setError(undefined);
  }, [setError]);

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
    async (props?: {message?: string}) => {
      if (!pendingWallet) {
        throw new Error('There are no connected wallets.');
      }

      let messageToSign = message;

      if (props?.message) {
        dispatch(setMessage(props.message));
        messageToSign = props.message;
      }

      if (!messageToSign) {
        throw new Error('A message has not yet been provided.');
      }

      // If the modal is not present, ensure that we open it.
      if (!active) {
        setRoute(ModalRoute.Signature);
        setActive(true);
      }

      try {
        const verificationResponse = await signMessage({
          address: pendingWallet.address,
          message: messageToSign,
        });

        if (verificationResponse?.signature) {
          try {
            /**
             * Note: We will only move past the validatePendingWallet action
             * when the signed message is decrypted to match the address
             * matching the pending wallet.
             *
             * In the event that the following fails (throws an error due to
             * mismatched addresses) we will set the error state for the
             * signature modal and allow the user to try again.
             */
            dispatch(validatePendingWallet(verificationResponse.signature));

            // Clear our verification state
            dispatch(clearSignatureState());

            // Close the modal.
            handleCloseModal();

            // Return the verification response.
            return verificationResponse;
          } catch (error: any) {
            /**
             * Set the error in state, resulting in an updated UI state for
             * the signature modal. The user can attempt to sign the message
             * with the correct wallet again.
             */
            setError(error);
          }
        }
      } catch (error: any) {
        setError(error);
      }
    },
    [active, dispatch, handleCloseModal, message, pendingWallet, signMessage],
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

  const handleGoBack = useCallback(() => {
    if (route === ModalRoute.Signature) {
      dispatch(clearSignatureState());
      disconnect(pendingWallet?.address);
      setConnectionStatus(ConnectionState.Connecting);
      setHistory([]);
      setRoute(ModalRoute.Connect);
      return;
    }

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
      return;
    }

    return undefined;
  }, [disconnect, dispatch, history, pendingWallet?.address, route]);

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
      requireSignature,
      signing,
      signMessage: requestSignature,
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
    requireSignature,
    route,
    signing,
    requestSignature,
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

import {FC, PropsWithChildren, useCallback, useMemo} from 'react';

import {SignatureModal} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useWallet} from '../../hooks/useWallet';
import {useWalletConnectDeeplink} from '../../hooks/useWalletConnectDeeplink';
import {
  clearSignatureState,
  setMessage,
  updateWallet,
} from '../../slices/walletSlice';
import {SignatureProviderProps} from '../../types/provider';

import {SignatureContext, SignatureProviderValue} from './context';

export {SignatureContext};
export type {SignatureProviderValue};

export const SignatureProvider: FC<
  PropsWithChildren<SignatureProviderProps>
> = ({children, signOnConnect}: PropsWithChildren<SignatureProviderProps>) => {
  const dispatch = useAppDispatch();
  const {addressToVerify, connectedWallets, message} = useAppSelector(
    (state) => state.wallet,
  );
  const {deleteKey} = useWalletConnectDeeplink();

  const {signing, signMessage} = useWallet({signOnConnect});

  /**
   * ## requestSignature
   *
   * Uses an optional message parameter. If no message is passed as a param, then
   * the function will utilize the message stored in state (if present).
   *
   * If a stored message is not present AND a message is not provided,
   * the signature request will fail.
   */
  const requestSignature = useCallback(
    async (props?: {message?: string}) => {
      if (!connectedWallets.length || !addressToVerify) {
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

      try {
        const walletAwaitingSignature = connectedWallets.find(
          (wallet) => wallet.address === addressToVerify,
        );

        if (!walletAwaitingSignature) {
          throw new Error(
            'Error locating wallet in local data store staged for a signature.',
          );
        }

        const verificationResponse = await signMessage({
          address: addressToVerify,
          message: messageToSign,
        });

        if (verificationResponse?.signature) {
          // const get the wallet by addressToVerify

          dispatch(
            updateWallet({
              ...walletAwaitingSignature,
              message: messageToSign,
              signature: verificationResponse.signature,
              signed: true,
              signedOn: new Date().toISOString(),
            }),
          );

          // Clear our verification state
          dispatch(clearSignatureState());
        }

        return verificationResponse;
      } catch (error) {
        /**
         * Cancel the verification process and disconnect the wallet.
         * In the future we can consider adding a `try again` button instead
         * which then allows the user to request another signature.
         */
        dispatch(clearSignatureState());
        deleteKey();
        console.error('ERROR', error);
      }
    },
    [
      connectedWallets,
      addressToVerify,
      message,
      dispatch,
      signMessage,
      deleteKey,
    ],
  );

  const contextValue = useMemo(() => {
    return {
      signing,
      signMessage: requestSignature,
      signOnConnect,
    };
  }, [requestSignature, signOnConnect, signing]);

  return (
    <SignatureContext.Provider value={contextValue}>
      <SignatureModal />
      {children}
    </SignatureContext.Provider>
  );
};

import {FC, PropsWithChildren, useCallback, useMemo, useState} from 'react';

import {SignatureModal} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useWallet} from '../../hooks/useWallet';
import {
  clearSignatureState,
  setMessage,
  validatePendingWallet,
} from '../../slices/walletSlice';
import {SignatureProviderProps} from '../../types/provider';

import {SignatureContext, SignatureProviderValue} from './context';

export {SignatureContext};
export type {SignatureProviderValue};

export const SignatureProvider: FC<
  PropsWithChildren<SignatureProviderProps>
> = ({
  children,
  requireSignature,
}: PropsWithChildren<SignatureProviderProps>) => {
  const [error, setError] = useState();
  const dispatch = useAppDispatch();
  const {message, pendingWallet} = useAppSelector((state) => state.wallet);
  const {disconnect, signing, signMessage} = useWallet({requireSignature});

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

      try {
        const verificationResponse = await signMessage({
          address: pendingWallet.address,
          message: messageToSign,
        });

        if (verificationResponse?.signature) {
          try {
            /**
             * Note that at the moment we do not clearly communicate when
             * the following fails. We do have a catch for errors that we
             * throw from the reducer. However, we don't have a toast or
             * any other form of communicating this failure to users.
             */
            dispatch(validatePendingWallet(verificationResponse.signature));
          } catch (error) {
            /**
             * We need to disconnect the wallet that is connected in order
             * to support subsequent connection attempts.
             */
            disconnect();
            console.error(error);
          } finally {
            // Clear our verification state
            dispatch(clearSignatureState());
          }
        }

        return verificationResponse;
      } catch (error: any) {
        /**
         * Cancel the verification process and disconnect the wallet.
         * In the future we can consider adding a `try again` button instead
         * which then allows the user to request another signature.
         */
        setError(error);
      }
    },
    [disconnect, dispatch, message, pendingWallet, signMessage],
  );

  const contextValue = useMemo(() => {
    return {
      signing,
      signMessage: requestSignature,
      requireSignature,
    };
  }, [requestSignature, requireSignature, signing]);

  return (
    <SignatureContext.Provider value={contextValue}>
      <SignatureModal error={error} clearError={clearError} />
      {children}
    </SignatureContext.Provider>
  );
};

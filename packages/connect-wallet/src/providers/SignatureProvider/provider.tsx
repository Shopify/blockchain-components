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
  const {signing, signMessage} = useWallet();

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
    },
    [dispatch, message, pendingWallet, signMessage],
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

import {useCallback} from 'react';
import {useAccount, useSignMessage} from 'wagmi';

import {
  SignMessageProps,
  SignatureResponse,
  UseWalletProps,
  UseWalletResponse,
} from '../types/wallet';

export function useWallet(props?: UseWalletProps): UseWalletResponse {
  const {onMessageSigned} = props || {};
  const {isConnecting} = useAccount();
  const {error, isLoading, signMessageAsync} = useSignMessage();

  const signMessage = useCallback(
    async ({address, message}: SignMessageProps) => {
      try {
        const signature = await signMessageAsync({message});

        const response: SignatureResponse = {
          address,
          message,
          signature,
        };

        onMessageSigned?.(response);

        return response;
      } catch (caughtError) {
        // If the error was returned by the use sign message hook then return that.
        // We should probably add some more verbose error handling in here as well.
        const finalError =
          error || caughtError || new Error('Verification process failed.');
        throw finalError;
      }
    },
    [error, onMessageSigned, signMessageAsync],
  );

  return {
    connecting: isConnecting,
    signing: isLoading,
    signMessage,
  };
}

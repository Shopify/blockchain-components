import {useCallback} from 'react';
import {useAccount, useSignMessage} from 'wagmi';

import {
  SignMessageProps,
  SignatureResponse,
  UseWalletResponse,
} from '../types/wallet';

export function useSyncSignMessage(): UseWalletResponse {
  const {isConnecting} = useAccount();
  const {isLoading, signMessageAsync} = useSignMessage();

  const signMessage = useCallback(
    async ({address, message}: SignMessageProps) => {
      try {
        const signature = await signMessageAsync({message});

        const response: SignatureResponse = {
          address,
          message,
          signature,
        };

        return response;
      } catch (error) {
        // If the error was returned by the use sign message hook then return that.
        // We should probably add some more verbose error handling in here as well.
        throw error || new Error('Verification process failed.');
      }
    },
    [signMessageAsync],
  );

  return {
    connecting: isConnecting,
    signing: isLoading,
    signMessage,
  };
}

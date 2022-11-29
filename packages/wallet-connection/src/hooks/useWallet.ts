import {useCallback, useMemo} from 'react';
import {useAccount, useDisconnect, useSignMessage} from 'wagmi';

import {
  SignMessageProps,
  SignatureResponse,
  UseWalletProps,
  UseWalletResponse,
} from '../types/wallet';

export function useWallet({
  onConnect,
  onMessageSigned,
}: UseWalletProps): UseWalletResponse {
  const {address, connector, isConnecting} = useAccount();
  const {disconnect} = useDisconnect();

  const {error, isLoading, signMessageAsync} = useSignMessage();

  useMemo(() => {
    if (address) {
      const value = {
        address,
        connector: connector?.id,
        connectedAt: new Date().toISOString(),
      };

      onConnect?.(value);

      return value;
    }

    onConnect?.();
  }, [address, connector]);

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
      } catch {
        // If the error was returned by the use sign message hook then return that.
        // We should probably add some more verbose error handling in here as well.
        throw error || new Error('Verification process failed.');
      }
    },
    [onMessageSigned, signMessageAsync],
  );

  return {
    connecting: isConnecting,
    disconnect,
    signing: isLoading,
    signMessage,
  };
}

import {useCallback, useEffect} from 'react';
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

  useEffect(() => {
    if (address && connector?.id && connector.name) {
      const value = {
        address,
        connectorId: connector.id,
        connectorName: connector.name,
        connectedAt: new Date().toISOString(),
      };

      onConnect?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, connector?.id, connector?.name]);

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
    [error, onMessageSigned, signMessageAsync],
  );

  return {
    connecting: isConnecting,
    disconnect,
    signing: isLoading,
    signMessage,
  };
}

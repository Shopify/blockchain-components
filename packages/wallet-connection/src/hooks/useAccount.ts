import {useCallback, useMemo} from 'react';
import {useAccount as useWagmiAccount, useSignMessage} from 'wagmi';

export interface ConnectedAccount {
  /**
   * The public address of the connected wallet.
   */
  address: string;
  /**
   * ISO datetime string in which this address was connected.
   */
  connectedAt?: string;
  /**
   * The connector associated with how this address was connected.
   * This is particularly helpful for when a user wants to disconnect
   * their wallet and informing the user of how it was connected so
   * they can disconnect externally.
   */
  connector?: string;
}

interface VerifyProps {
  address: string;
  message: string;
}

interface VerificationResponse {
  address?: string;
  message?: string;
  signature?: string;
}

interface UseAccountResponse {
  account: ConnectedAccount | undefined;
  connecting: boolean;
  verify: (args: VerifyProps) => Promise<VerificationResponse | undefined>;
  verifying?: boolean;
}

export function useAccount(): UseAccountResponse {
  const {address, connector, isConnecting} = useWagmiAccount();

  /**
   * We could consider adding these accounts to context with a persisted state
   * in the future, allowing for accounts to be injected into the provider
   * (e.g. loaded from a server / api), and for mantaining a list of
   * wallets have already been verified.
   */
  const account = useMemo(() => {
    if (address) {
      return {
        address,
        connector: connector?.id,
        connectedAt: new Date().toISOString(),
      };
    }
  }, [address, connector]);

  const {error, isLoading, signMessageAsync} = useSignMessage();

  const verify = useCallback(
    async ({
      address,
      message,
    }: VerifyProps): Promise<VerificationResponse | undefined> => {
      try {
        const signature = await signMessageAsync({message});

        return {
          address,
          message,
          signature,
        };
      } catch {
        // If the error was returned by the use sign message hook then return that.
        // We should probably add some more verbose error handling in here as well.
        return error || new Error('Verification process failed.');
      }
    },
    [signMessageAsync],
  );

  return {
    account,
    connecting: isConnecting,
    verify,
    verifying: isLoading,
  };
}

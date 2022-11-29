export interface ConnectedWallet {
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

export interface SignMessageProps {
  address: string;
  message: string;
}

export type SignatureResponse =
  | {
      address?: string;
      message?: string;
      signedMessage?: string;
    }
  | undefined;

export interface Wallet extends ConnectedWallet {
  /**
   * Whether the wallet has completed verification.
   */
  signed?: boolean;
  /**
   * ISO datetime string in which the wallet was verified.
   */
  signedOn?: string;
}

export interface UseWalletProps {
  onConnect?: (wallet?: ConnectedWallet) => void;
  onMessageSigned?: (response: SignatureResponse) => void;
}

export interface UseWalletResponse {
  connecting: boolean;
  disconnect: () => void;
  signing?: boolean;
  signMessage: (args: SignMessageProps) => Promise<SignatureResponse>;
}

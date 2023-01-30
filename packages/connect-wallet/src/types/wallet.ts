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
   * The connector id associated with how this address was connected.
   * This is particularly helpful for when a user wants to disconnect
   * their wallet and informing the user of how it was connected so
   * they can disconnect externally.
   */
  connectorId?: string;
  /**
   * The connector name associated with how this address was connected.
   */
  connectorName?: string;
}

export type SignatureResponse =
  | {
      address: string;
      message: string;
      nonce: string;
      signature: string;
    }
  | undefined;

export interface Wallet extends ConnectedWallet {
  /**
   * The message which the wallet signed. Will be undefined
   * in the event that the wallet has not yet signed the message.
   */
  message?: string;
  /**
   * The signed message from the signature transaction. Will be
   * undefined in the event that the wallet has not yet signed the message.
   */
  signature?: string;
  /**
   * ISO datetime string in which the wallet was verified.
   */
  signedOn?: string;
}

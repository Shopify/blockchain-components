export enum EventBusEvent {
  RequestWalletVerificationMessage = 'RequestWalletVerificationMessage',
  WalletVerificationMessageGenerated = 'WalletVerificationMessageGenerated',
}

export type Payload = {
  /**
   * Verification message response.
   */
  verification?: {
    message: string;
    // iso date?
    generatedAt: string;
  };
};

export type PayloadErrors = {
  /**
   * Any errors included during the event bus payload.
   */
  userErrors?: {
    message: string;
    internalError: Error;
  }[];
};

export type VerificationMessageInput = {
  address: string;
};

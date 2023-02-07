export class ConnectWalletError extends Error {
  constructor(message: string) {
    super(message);
    this.message = `@shopify/connect-wallet -- ${message}.`;
  }
}

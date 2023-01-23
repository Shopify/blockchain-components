import {Wallet, SignatureResponse} from '../../types/wallet';

/**
 * Dictates how we will handle automatic order attribution. If
 * set to `required`, any error that occurs with the attribution
 * will be thrown.
 *
 * If set to `ignoreErrors`, any error that occurs with the attribution
 * will be logged to the console and otherwise ignored.
 *
 * If set to `disabled`, no order attribution will be attempted.
 */
export type MessageSignedOrderAttributionMode =
  | 'required'
  | 'ignoreErrors'
  | 'disabled';

export interface useConnectWalletProps {
  onConnect?: (wallet?: Wallet) => void;
  onDisconnect?: (wallet?: Wallet) => void;
  onMessageSigned?: (response: SignatureResponse) => void;
  /**
   * Defaults to 'required'.
   */
  messageSignedOrderAttributionMode?: MessageSignedOrderAttributionMode;
}

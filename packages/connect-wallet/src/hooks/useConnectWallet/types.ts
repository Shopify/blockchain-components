import {Wallet} from '../../types/wallet';

export interface useConnectWalletProps {
  onConnect?: (wallet: Wallet) => void;
  onDisconnect?: (wallet?: Wallet) => void;
}

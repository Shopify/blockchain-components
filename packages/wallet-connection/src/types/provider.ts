import {ThemeProps} from 'shared';
import {Chain} from 'wagmi';

import {Wallet} from './wallet';

export interface SignatureProviderProps {
  signOnConnect?: boolean;
}

export type ProviderProps = ThemeProps &
  SignatureProviderProps & {
    chains: Chain[];
    wallet?: Wallet;
  };

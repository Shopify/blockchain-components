import {Chain} from '@wagmi/core';
import {ThemeProps} from 'shared';

import {Wallet} from './wallet';

export interface SignatureProviderProps {
  signOnConnect?: boolean;
}

export type ProviderProps = ThemeProps &
  SignatureProviderProps & {
    chains: Chain[];
    wallet?: Wallet;
  };

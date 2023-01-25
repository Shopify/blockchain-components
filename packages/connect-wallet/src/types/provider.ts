import {Chain} from '@wagmi/core';
import {ThemeProps} from 'shared';

import {Wallet} from './wallet';

export interface ModalProviderProps {
  requireSignature?: boolean;
}

export type ProviderProps = ThemeProps &
  ModalProviderProps & {
    chains: Chain[];
    wallet?: Wallet;
  };

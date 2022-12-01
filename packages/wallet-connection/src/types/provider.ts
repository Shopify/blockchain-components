import {ThemeProps} from 'shared';
import {Chain} from 'wagmi';

import {Wallet} from './wallet';

export type ProviderProps = ThemeProps & {
  chains: Chain[];
  wallet?: Wallet;
};

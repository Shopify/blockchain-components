import {ThemeProps} from 'shared';

import {Wallet} from './wallet';

export type ProviderProps = ThemeProps & {
  wallet?: Wallet;
};

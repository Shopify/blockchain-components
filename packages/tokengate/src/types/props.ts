import type {CustomTitles} from './customTitles';
import type {Reaction} from './reaction';
import type {RedemptionLimit} from './redemptionLimit';
import type {Requirements} from './requirements';
import type {UnlockingToken} from './unlockingToken';

export interface TokengateProps {
  connectButton: JSX.Element;
  connectedButton?: JSX.Element;
  isLoading?: boolean;
  isLocked?: boolean;
  isSoldOut?: boolean;
  isConnected: boolean;
  requirements?: Requirements;
  unlockingTokens?: UnlockingToken[];
  exclusiveCustomTitles?: CustomTitles;
  discountCustomTitles?: CustomTitles;
  active?: {
    start?: string;
    end?: string;
  };
  reaction?: Reaction;
  redemptionLimit?: RedemptionLimit;
}

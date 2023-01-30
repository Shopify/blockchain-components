import {ReactNode} from 'react';
import {ThemeProps} from 'shared';

export interface Condition {
  name?: string;
  imageUrl?: string;
  collectionAddress: string;
}

export interface Requirements {
  conditions: Condition[];
  logic: 'ANY' | 'ALL';
}

export interface UnlockingToken {
  name: string;
  imageUrl: string;
  collectionName: string;
  collectionAddress: string;
  consumedRedemptionLimit?: number;
}

export interface CustomTitles {
  lockedTitle?: string;
  lockedSubtitle?: string;
  unlockedTitle?: string;
  unlockedSubtitle?: string;
  unlockedSubtitleWithRedemptionLimit?: string;
}

export interface RedemptionLimit {
  total: number;
  perToken: number;
}

export interface Reaction {
  type: 'exclusive_access' | 'discount';
  discount?: {
    type: 'percentage' | 'amount';
    value: number;
  };
}

export type TokengateProps = ThemeProps & {
  connectButton: ReactNode;
  connectedButton?: ReactNode;
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
};

export const instanceOfUnlockingToken = (
  object: any,
): object is UnlockingToken => {
  return 'token' in object;
};

export const instanceOfCondition = (object: any): object is Condition => {
  return !('token' in object);
};

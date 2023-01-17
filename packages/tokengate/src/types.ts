import {ReactNode} from 'react';
import {ThemeProps} from 'shared';

export interface Condition {
  name: string;
  conditionsDescription: string;
  imageUrl: string;
  collectionAddress: string;
}

export interface GateRequirement {
  conditions: Condition[];
  operator: 'OR' | 'AND';
}

export interface UnlockingToken {
  token: {
    title: string;
    mediaUrl: string;
    contractName: string;
    contractAddress: string;
    totalOrderLimit?: number;
    consumedOrderLimit?: number;
  };
}

export interface CustomTitles {
  lockedTitle?: string;
  lockedSubtitle?: string;
  unlockedTitle?: string;
  unlockedSubtitle?: string;
  unlockedSubtitleWithOrderLimit?: string;
}

export type TokengateProps = ThemeProps & {
  connectButton: ReactNode;
  connectedButton?: ReactNode;
  isLoading?: boolean;
  isLocked: boolean;
  isSoldOut?: boolean;
  isConnected: boolean;
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
  exclusiveCustomTitles?: CustomTitles;
  discountCustomTitles?: CustomTitles;
  active?: {
    start?: string;
    end?: string;
  };
  reaction: {
    type: 'exclusive_access' | 'discount';
  };
};

export const instanceOfUnlockingToken = (
  object: any,
): object is UnlockingToken => {
  return 'token' in object;
};

export const instanceOfCondition = (object: any): object is Condition => {
  return !('token' in object);
};

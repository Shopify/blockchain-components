import {ReactNode} from 'react';
import {ThemeProps} from 'shared';

export interface TokenSeries {
  name: string;
  conditionsDescription: string;
  imageUrl: string;
  contractAddress: string;
}

export interface GateRequirement {
  id: string;
  tokenSeries: TokenSeries[];
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
  discount?: number;
  unlockingTokens?: UnlockingToken[];
  exclusiveCustomTitles?: CustomTitles;
  discountCustomTitles?: CustomTitles;
  availableDate?: string;
};

export const instanceOfUnlockingToken = (
  object: any,
): object is UnlockingToken => {
  return 'token' in object;
};

export const instanceOfTokenSeries = (object: any): object is TokenSeries => {
  return 'conditionsDescription' in object;
};

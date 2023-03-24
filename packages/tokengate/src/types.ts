import {ReactNode} from 'react';

export enum Marketplace {
  Blur = 'Blur',
  CoinbaseNft = 'Coinbase NFT',
  LooksRare = 'LooksRare',
  MagicEden = 'MagicEden',
  OpenSea = 'OpenSea',
  Rarible = 'Rarible',
  SuperRare = 'SuperRare',
}

interface CustomLink {
  label: string;
  marketplace?: never;
  icon?: JSX.Element;
  imageUrl?: string;
  url: string;
}

interface MarketplaceLink {
  label?: never;
  marketplace: `${Marketplace}`;
  icon?: never;
  imageUrl?: never;
  url: string;
}

export type LinkType = CustomLink | MarketplaceLink;

export interface Condition {
  name?: string;
  imageUrl?: string;
  contractAddress?: string;
  links?: LinkType[];
  description?: ReactNode;
}

export interface Requirements {
  conditions: Condition[];
  logic: 'ANY' | 'ALL';
}

export interface UnlockingToken {
  name: string;
  imageUrl: string;
  collectionName: string;
  contractAddress: string;
  consumedRedemptionLimit?: number;
}

export interface CustomTitles {
  lockedTitle?: ReactNode;
  lockedSubtitle?: ReactNode;
  unlockedTitle?: ReactNode;
  unlockedSubtitle?: ReactNode;
  unlockedSubtitleWithRedemptionLimit?: ReactNode;
}

export interface RedemptionLimit {
  total: number;
  perToken: number;
}

interface DiscountReaction {
  type: 'discount';
  discount: {
    type: 'amount' | 'percentage';
    value: number;
  };
}

interface ExclusiveAccessReaction {
  type: 'exclusive_access';
  discount?: never;
}

export type Reaction = DiscountReaction | ExclusiveAccessReaction;

export interface TokengateProps {
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
}

export const instanceOfUnlockingToken = (
  object: any,
): object is UnlockingToken => {
  return 'token' in object;
};

export const instanceOfCondition = (object: any): object is Condition => {
  return !('token' in object);
};

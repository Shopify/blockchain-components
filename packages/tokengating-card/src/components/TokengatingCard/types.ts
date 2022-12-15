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
    totalOrderLimit?: string;
    consumedOrderLimit?: string;
  };
}

export interface Wallet {
  address?: string;
  ensName?: string;
  icon?: React.ReactNode;
}

export interface CustomTitles {
  lockedTitle?: string;
  lockedSubtitle?: string;
  unlockedTitle?: string;
  unlockedSubtitle?: string;
}

export interface TokengatingCardProps {
  isLoading?: boolean;
  isLocked: boolean;
  isSoldOut?: boolean;
  onConnectWallet: () => void;
  onConnectedWalletActions: () => void;
  wallet?: Wallet;
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
  exclusiveCustomTitles?: CustomTitles;
  availableDate?: string;
}

export const instanceOfUnlockingToken = (
  object: any,
): object is UnlockingToken => {
  return 'token' in object;
};

export const instanceOfTokenSeries = (object: any): object is TokenSeries => {
  return 'conditionsDescription' in object;
};

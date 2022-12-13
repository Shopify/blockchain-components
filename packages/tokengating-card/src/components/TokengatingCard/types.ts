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
    orderLimit: string;
  };
}

export interface TokengatingCardProps {
  isLoading?: boolean;
  isLocked: boolean;
  isSoldOut?: boolean;
  lockedTitle?: string;
  lockedSubtitle?: string;
  unlockedTitle?: string;
  unlockedSubtitle?: string;
  onConnectWallet: () => void;
  onConnectedWalletActions: () => void;
  wallet?: {
    address?: string;
    ensName?: string;
    icon?: React.ReactNode;
  };
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
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

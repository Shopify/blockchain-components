interface TokenSeries {
  name: string;
  conditionsDescription: string;
  imageUrl: string;
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
  };
}

export interface TokengatingCardProps {
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
  availableDate: string;
}

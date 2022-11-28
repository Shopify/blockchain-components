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
  title: string;
  mediaUrl: string;
  tokenId: string;
  contractName: string;
}

export interface TokengatingCardProps {
  isLocked: boolean;
  lockedTitle?: string;
  lockedSubtitle?: string;
  unlockedTitle?: string;
  unlockedSubtitle?: string;
  onConnectWallet: () => void;
  onConnectedWalletActions: () => void;
  address?: string | undefined;
  ensName?: string;
  icon?: React.ReactNode;
  gateRequirement?: GateRequirement;
  unlockingTokens?: UnlockingToken[];
}

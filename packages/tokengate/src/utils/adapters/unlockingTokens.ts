import {UnlockingToken} from '../../types';

interface PreviousUnlockingToken {
  token: {
    title: string;
    mediaUrl: string;
    contractName: string;
    contractAddress: string;
    consumedOrderLimit?: number;
  };
}

const adaptUnlockingToken = (
  unlockingToken: PreviousUnlockingToken,
): UnlockingToken => ({
  name: unlockingToken.token.title,
  imageUrl: unlockingToken.token.mediaUrl,
  collectionName: unlockingToken.token.contractName,
  collectionAddress: unlockingToken.token.contractAddress,
  consumedRedemptionLimit: unlockingToken.token.consumedOrderLimit,
});

export const adaptUnlockingTokens = (
  unlockingTokens?: PreviousUnlockingToken[],
): UnlockingToken[] | undefined => {
  if (!unlockingTokens) return;

  return unlockingTokens.map(adaptUnlockingToken);
};

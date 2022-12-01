import {
  UnlockingToken,
  instanceOfUnlockingToken,
  TokenSeriesWithBadge,
} from '../TokengatingCard/types';

export const getTokenInfo = (token: UnlockingToken | TokenSeriesWithBadge) => {
  if (instanceOfUnlockingToken(token)) {
    return {
      title: token.token.title,
      subtitle: token.token.contractName,
      imageUrl: token.token.mediaUrl,
    };
  }

  return {
    title: token.name,
    subtitle: token.conditionsDescription,
    imageUrl: token.imageUrl,
    badge: token.badge,
  };
};

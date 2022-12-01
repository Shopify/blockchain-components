import {
  UnlockingToken,
  TokenSeries,
  instanceOfUnlockingToken,
} from '../TokengatingCard/types';

export const getTokenInfo = (token: UnlockingToken | TokenSeries) => {
  if (instanceOfUnlockingToken(token)) {
    return {
      title: token.token.title,
      subtitle: token.token.contractName,
      imageUrl: token.token.mediaUrl,
      round: false,
    };
  }

  return {
    title: token.name,
    subtitle: token.conditionsDescription,
    imageUrl: token.imageUrl,
    round: true
  };
};
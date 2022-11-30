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
      rounded: true,
    };
  }

  return {
    title: token.name,
    subtitle: token.conditionsDescription,
    imageUrl: token.imageUrl,
    rounded: false
  };
};

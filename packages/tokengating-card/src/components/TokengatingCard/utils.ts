import {TokengatingCardProps} from './types';

export enum TokengateCardSection {
  TokengateRequirements = 'TokengateRequirements',
  TokenList = 'TokenList',
  ConnectWallet = 'ConnectWallet',
  ConnectedWallet = 'ConnectedWallet',
  UnavailableTokengate = 'UnavailableTokengate',
}

export const useTokengateCardState = ({
  address,
  isLocked,
  lockedTitle,
  lockedSubtitle,
  unlockedTitle,
  unlockedSubtitle,
}: Pick<
  TokengatingCardProps,
  | 'address'
  | 'isLocked'
  | 'lockedTitle'
  | 'lockedSubtitle'
  | 'unlockedTitle'
  | 'unlockedSubtitle'
>) => {
  if (address && !isLocked) {
    return {
      title: unlockedTitle || 'Exclusive unlocked',
      subtitle:
        unlockedSubtitle || 'Your token got you access to this product!',
      sections: [
        TokengateCardSection.TokenList,
        TokengateCardSection.ConnectedWallet,
      ],
    };
  }

  return {
    title: lockedTitle || 'Holder exclusive',
    subtitle: lockedSubtitle || 'To unlock this product, you need:',
    sections: [
      TokengateCardSection.TokengateRequirements,
      TokengateCardSection.ConnectWallet,
    ],
  };
};

import {TokengatingCardProps} from './types';

export enum TokengateCardSection {
  TokengateRequirement = 'TokengateRequirement',
  TokenList = 'TokenList',
  ConnectWallet = 'ConnectWallet',
  ConnectedWallet = 'ConnectedWallet',
  AvailableSoon = 'AvailableSoon',
  SoldOut = 'SoldOut',
}

export const useTokengateCardState = ({
  wallet,
  availableDate,
  isLocked,
  isSoldOut,
  lockedTitle,
  lockedSubtitle,
  unlockedTitle,
  unlockedSubtitle,
}: Pick<
  TokengatingCardProps,
  | 'wallet'
  | 'isLocked'
  | 'isSoldOut'
  | 'lockedTitle'
  | 'lockedSubtitle'
  | 'unlockedTitle'
  | 'unlockedSubtitle'
  | 'availableDate'
>) => {
  if (wallet?.address && !isLocked) {
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

  if (isSoldOut) {
    return {
      title: lockedTitle || 'Holder exclusive',
      subtitle: lockedSubtitle || 'To unlock this product, you need:',
      sections: [
        TokengateCardSection.TokengateRequirement,
        TokengateCardSection.SoldOut,
      ],
    };
  }

  const now = new Date();
  const dateObject = availableDate ? new Date(availableDate) : null;

  if (dateObject && dateObject > now) {
    return {
      title: lockedTitle || 'Holder exclusive',
      subtitle: lockedSubtitle || 'To unlock this product, you need:',
      sections: [
        TokengateCardSection.TokengateRequirement,
        TokengateCardSection.AvailableSoon,
      ],
    };
  }

  return {
    title: lockedTitle || 'Holder exclusive',
    subtitle: lockedSubtitle || 'To unlock this product, you need:',
    sections: [
      TokengateCardSection.TokengateRequirement,
      TokengateCardSection.ConnectWallet,
    ],
  };
};

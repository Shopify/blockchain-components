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
  unlockingTokens,
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
  | 'unlockingTokens'
>) => {
  const lockedTitleWithDefault = lockedTitle || 'Holder exclusive';
  const lockedSubtitleWithDefault =
    lockedSubtitle || 'To unlock this product, you need:';
  const unlockedTitleWithDefault = unlockedTitle || 'Exclusive unlocked';
  const unlockedSubtitleWithDefault =
    unlockedSubtitle || 'Your token got you access to this product!';

  if (wallet?.address && !isLocked) {
    return {
      title: unlockedTitleWithDefault,
      subtitle: unlockedSubtitleWithDefault,
      sections: [
        TokengateCardSection.TokenList,
        TokengateCardSection.ConnectedWallet,
      ],
    };
  }

  if (wallet?.address && isLocked && unlockingTokens) {
    return {
      title: unlockedTitleWithDefault,
      subtitle: unlockedSubtitleWithDefault,
      sections: [
        TokengateCardSection.TokengateRequirement,
        TokengateCardSection.ConnectedWallet,
      ],
    };
  }

  if (isSoldOut) {
    return {
      title: lockedTitleWithDefault,
      subtitle: lockedSubtitleWithDefault,
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
      title: lockedTitleWithDefault,
      subtitle: lockedSubtitleWithDefault,
      sections: [
        TokengateCardSection.TokengateRequirement,
        TokengateCardSection.AvailableSoon,
      ],
    };
  }

  return {
    title: lockedTitleWithDefault,
    subtitle: lockedSubtitleWithDefault,
    sections: [
      TokengateCardSection.TokengateRequirement,
      TokengateCardSection.ConnectWallet,
    ],
  };
};

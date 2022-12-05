import {TokengatingCardProps} from './types';

export enum TokengateCardSection {
  TokengateRequirement = 'TokengateRequirement',
  TokengateRequirementMissingTokens = 'TokengateRequirementMissingTokens',
  UnlockingTokens = 'UnlockingTokens',
  ConnectWallet = 'ConnectWallet',
  ConnectedWallet = 'ConnectedWallet',
  AvailableSoon = 'AvailableSoon',
  SoldOut = 'SoldOut',
}

export const useTokengateCardState = (
  tokengatingCardProps: TokengatingCardProps,
) => {
  return {
    sections: getSections(tokengatingCardProps),
    ...getTitleAndSubtitle(tokengatingCardProps),
  };
};

export const getSections = ({
  wallet,
  availableDate,
  isLocked,
  isSoldOut,
  unlockingTokens,
}: TokengatingCardProps) => {
  if (wallet?.address && !isLocked) {
    return [
      TokengateCardSection.UnlockingTokens,
      TokengateCardSection.ConnectedWallet,
    ];
  }

  if (wallet?.address && isLocked && unlockingTokens) {
    return [
      TokengateCardSection.TokengateRequirementMissingTokens,
      TokengateCardSection.ConnectedWallet,
    ];
  }

  if (isSoldOut) {
    return [
      TokengateCardSection.TokengateRequirement,
      TokengateCardSection.SoldOut,
    ];
  }

  const now = new Date();
  const dateObject = availableDate ? new Date(availableDate) : null;

  if (dateObject && dateObject > now) {
    return [
      TokengateCardSection.TokengateRequirement,
      TokengateCardSection.AvailableSoon,
    ];
  }

  return [
    TokengateCardSection.TokengateRequirement,
    TokengateCardSection.ConnectWallet,
  ];
};

export const getTitleAndSubtitle = ({
  isLocked,
  lockedTitle,
  lockedSubtitle,
  unlockedTitle,
  unlockedSubtitle,
}: TokengatingCardProps) => {
  if (isLocked) {
    return {
      title: lockedTitle || 'Holder exclusive',
      subtitle: lockedSubtitle || 'To unlock this product, you need:',
    };
  }

  return {
    title: unlockedTitle || 'Exclusive unlocked',
    subtitle: unlockedSubtitle || 'Your token got you access to this product!',
  };
};

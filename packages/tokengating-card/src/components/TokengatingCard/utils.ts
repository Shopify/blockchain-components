import {TokengatingCardProps} from './types';

export enum TokengateCardSection {
  TokengateRequirement = 'TokengateRequirement',
  TokengateRequirementMissingTokens = 'TokengateRequirementMissingTokens',
  UnlockingTokens = 'UnlockingTokens',
  ConnectWallet = 'ConnectWallet',
  ConnectedWallet = 'ConnectedWallet',
  AvailableSoon = 'AvailableSoon',
  SoldOut = 'SoldOut',
  TokengateRequirementSkeleton = 'TokengateRequirementSkeleton',
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
  isLoading,
}: TokengatingCardProps) => {
  if (isLoading) {
    return [
      TokengateCardSection.TokengateRequirementSkeleton,
      TokengateCardSection.ConnectWallet,
    ];
  }

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

  const now = new Date();
  const dateObject = availableDate ? new Date(availableDate) : null;

  if (isSoldOut && dateObject && dateObject > now) {
    return [
      TokengateCardSection.TokengateRequirement,
      TokengateCardSection.AvailableSoon,
    ];
  }

  if (true) {
    return [
      TokengateCardSection.TokengateRequirement,
      TokengateCardSection.SoldOut,
    ];
  }

  return [
    TokengateCardSection.TokengateRequirement,
    TokengateCardSection.ConnectWallet,
  ];
};

export const getTitleAndSubtitle = ({
  isLocked,
  exclusiveCustomTitles,
}: TokengatingCardProps) => {
  const {lockedTitle, lockedSubtitle, unlockedTitle, unlockedSubtitle} =
    exclusiveCustomTitles ?? {};
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

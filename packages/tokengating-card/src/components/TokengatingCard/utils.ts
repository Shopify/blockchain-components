import {TokengatingCardProps, UnlockingToken} from './types';

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

export const getTitleAndSubtitle = (props: TokengatingCardProps) => {
  const {isLocked, exclusiveCustomTitles} = props;

  const {
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
    unlockedSubtitleWithOrderLimit,
  } = exclusiveCustomTitles ?? {};

  if (isLocked) {
    return {
      title: lockedTitle || 'Holder exclusive',
      subtitle: lockedSubtitle || 'To unlock this product, you need:',
    };
  }

  if (getCombinedOrderLimit(props)) {
    return {
      title: unlockedTitle || 'Exclusive unlocked',
      subtitle:
        unlockedSubtitleWithOrderLimit ||
        `You can buy up to ${getCombinedOrderLimit(props)} with your
      tokens.`,
    };
  }

  return {
    title: unlockedTitle || 'Exclusive unlocked',
    subtitle: unlockedSubtitle || 'Your token got you access to this product!',
  };
};

const getCombinedOrderLimit = ({unlockingTokens}: TokengatingCardProps) => {
  const initialValue = 0;
  const combinedOrderLimit = unlockingTokens?.reduce(
    (accumulator: number, unlockingToken: UnlockingToken) => {
      if (!unlockingToken.token.totalOrderLimit) return accumulator;

      return accumulator + unlockingToken.token.totalOrderLimit;
    },
    initialValue,
  );

  return combinedOrderLimit && combinedOrderLimit > 0
    ? combinedOrderLimit
    : undefined;
};

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
  OrderLimitReached = 'OrderLimitReached',
}

export const useTokengateCardState = (
  tokengatingCardProps: TokengatingCardProps,
) => {
  return {
    sections: getSections(tokengatingCardProps),
    ...getTitleAndSubtitle(tokengatingCardProps),
  };
};

export const getSections = (props: TokengatingCardProps) => {
  const {
    wallet,
    availableDate,
    isLocked,
    isSoldOut,
    unlockingTokens,
    isLoading,
  } = props;

  if (isLoading) {
    return [
      TokengateCardSection.TokengateRequirementSkeleton,
      TokengateCardSection.ConnectWallet,
    ];
  }

  if (wallet?.address && !isLocked && getCombinedConsumedOrderLimit(props)) {
    return [
      TokengateCardSection.UnlockingTokens,
      TokengateCardSection.ConnectedWallet,
      TokengateCardSection.OrderLimitReached,
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

  if (getCombinedTotalOrderLimit(props)) {
    return {
      title: unlockedTitle || 'Exclusive unlocked',
      subtitle:
        unlockedSubtitleWithOrderLimit ||
        `You can buy up to ${getCombinedTotalOrderLimit(
          props,
        )} with your tokens.`,
    };
  }

  return {
    title: unlockedTitle || 'Exclusive unlocked',
    subtitle: unlockedSubtitle || 'Your token got you access to this product!',
  };
};

const getCombinedTotalOrderLimit = ({
  unlockingTokens,
}: TokengatingCardProps) => {
  const initialValue = 0;
  const combinedTotalOrderLimit = unlockingTokens?.reduce(
    (accumulator: number, unlockingToken: UnlockingToken) => {
      if (!unlockingToken.token.totalOrderLimit) return accumulator;

      return accumulator + unlockingToken.token.totalOrderLimit;
    },
    initialValue,
  );

  return combinedTotalOrderLimit && combinedTotalOrderLimit > 0
    ? combinedTotalOrderLimit
    : undefined;
};

const getCombinedConsumedOrderLimit = ({
  unlockingTokens,
}: TokengatingCardProps) => {
  const initialValue = 0;
  const combinedConsumedOrderLimit = unlockingTokens?.reduce(
    (accumulator: number, unlockingToken: UnlockingToken) => {
      if (!unlockingToken.token.consumedOrderLimit) return accumulator;

      return accumulator + unlockingToken.token.consumedOrderLimit;
    },
    initialValue,
  );

  return combinedConsumedOrderLimit && combinedConsumedOrderLimit > 0
    ? combinedConsumedOrderLimit
    : undefined;
};

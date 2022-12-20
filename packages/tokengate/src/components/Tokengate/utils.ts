import {useI18n} from '@shopify/react-i18n';

import {TokengateProps, UnlockingToken} from './types';

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

export const useTokengateCardState = (tokengateProps: TokengateProps) => {
  return {
    sections: getSections(tokengateProps),
    ...useTitleAndSubtitle(tokengateProps),
  };
};

export const getSections = (tokengateProps: TokengateProps) => {
  const {
    wallet,
    availableDate,
    isLocked,
    isSoldOut,
    unlockingTokens,
    isLoading,
  } = tokengateProps;

  if (isLoading) {
    return [
      TokengateCardSection.TokengateRequirementSkeleton,
      TokengateCardSection.ConnectWallet,
    ];
  }

  if (
    wallet?.address &&
    !isLocked &&
    getCombinedConsumedOrderLimit(tokengateProps)
  ) {
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

export const useTitleAndSubtitle = (tokengateProps: TokengateProps) => {
  const {isLocked, exclusiveCustomTitles} = tokengateProps;
  const [i18n] = useI18n();

  const {
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
    unlockedSubtitleWithOrderLimit,
  } = exclusiveCustomTitles ?? {};

  if (isLocked) {
    return {
      title: lockedTitle || i18n.translate('TokengatingCard.locked.title'),
      subtitle:
        lockedSubtitle || i18n.translate('TokengatingCard.locked.subtitle'),
    };
  }

  const orderLimit = getCombinedTotalOrderLimit(tokengateProps);

  if (orderLimit) {
    return {
      title: unlockedTitle || i18n.translate('TokengatingCard.unlocked.title'),
      subtitle:
        unlockedSubtitleWithOrderLimit ||
        i18n.translate('TokengatingCard.unlocked.subtitle', {
          orderLimit,
        }),
    };
  }

  return {
    title: unlockedTitle || i18n.translate('TokengatingCard.unlocked.title'),
    subtitle:
      unlockedSubtitle ||
      i18n.translate('TokengatingCard.unlocked.subtitleDefault'),
  };
};

const getCombinedTotalOrderLimit = ({unlockingTokens}: TokengateProps) => {
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

const getCombinedConsumedOrderLimit = ({unlockingTokens}: TokengateProps) => {
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

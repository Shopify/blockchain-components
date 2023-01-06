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

export const useTitleAndSubtitle = (props: TokengateProps) => {
  const [i18n] = useI18n();
  const {isLocked, exclusiveCustomTitles, discountCustomTitles, discount} =
    props;
  const orderLimit = getCombinedTotalOrderLimit(props);
  const hasOrderLimit = orderLimit && orderLimit > 0;

  const customTitles = discount ? discountCustomTitles : exclusiveCustomTitles;

  const {
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
    unlockedSubtitleWithOrderLimit,
  } = customTitles ?? {};

  const customTitle = isLocked ? lockedTitle : unlockedTitle;
  const customSubtitle = isLocked ? lockedSubtitle : unlockedSubtitle;

  const i18nKeyFirstLevel = discount ? 'discount' : 'exclusive';
  const i18nKeySecondLevel = isLocked ? 'locked' : 'unlocked';
  const i18nKeyPrefix = `Tokengate.${i18nKeyFirstLevel}.${i18nKeySecondLevel}`;

  const title =
    customTitle || i18n.translate(`${i18nKeyPrefix}.title`, {discount});
  let subtitle =
    customSubtitle ||
    i18n.translate(`${i18nKeyPrefix}.subtitle`, {
      orderLimit,
    });

  if (hasOrderLimit) {
    subtitle =
      unlockedSubtitleWithOrderLimit ||
      i18n.translate(`${i18nKeyPrefix}.subtitleWithOrderLimit`, {
        orderLimit,
      });
  }

  return {
    title,
    subtitle,
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

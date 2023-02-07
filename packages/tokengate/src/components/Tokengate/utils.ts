import {useTranslation} from '../../hooks/useTranslation';
import {TokengateProps, UnlockingToken} from '../../types';

export enum TokengateCardSection {
  TokengateRequirement = 'TokengateRequirement',
  TokengateRequirementMissingTokens = 'TokengateRequirementMissingTokens',
  UnlockingTokens = 'UnlockingTokens',
  ConnectWallet = 'ConnectWallet',
  ConnectedWallet = 'ConnectedWallet',
  AvailableSoon = 'AvailableSoon',
  SoldOut = 'SoldOut',
  TokengateRequirementSkeleton = 'TokengateRequirementSkeleton',
  OrderLimitReachedError = 'OrderLimitReachedError',
  MissingTokensError = 'MissingTokensError',
}

export const useTokengateCardState = (tokengateProps: TokengateProps) => {
  return {
    sections: getSections(tokengateProps),
    ...useTitleAndSubtitle(tokengateProps),
  };
};

export const getSections = (tokengateProps: TokengateProps) => {
  const isLocked = calculatedIsLocked(tokengateProps);
  const {active, isSoldOut, isConnected, unlockingTokens, isLoading} =
    tokengateProps;

  if (isLoading) {
    return [
      TokengateCardSection.TokengateRequirementSkeleton,
      TokengateCardSection.ConnectWallet,
    ];
  }

  if (isConnected && !isLocked && hasReachedOrderLimit(tokengateProps)) {
    return [
      TokengateCardSection.UnlockingTokens,
      TokengateCardSection.ConnectedWallet,
      TokengateCardSection.OrderLimitReachedError,
    ];
  }

  if (isConnected && !isLocked) {
    return [
      TokengateCardSection.UnlockingTokens,
      TokengateCardSection.ConnectedWallet,
    ];
  }

  if (isConnected && isLocked && unlockingTokens) {
    return [
      TokengateCardSection.TokengateRequirementMissingTokens,
      TokengateCardSection.ConnectedWallet,
      TokengateCardSection.MissingTokensError,
    ];
  }

  if (isSoldOut) {
    return [
      TokengateCardSection.TokengateRequirement,
      TokengateCardSection.SoldOut,
    ];
  }

  const now = new Date();
  const dateObject = active?.start ? new Date(active.start) : null;

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

const useTokengateI18n = (props: TokengateProps) => {
  const isLocked = calculatedIsLocked(props);

  const {t} = useTranslation('Tokengate');
  const i18nKeyFirstLevel = isDiscountGate(props) ? 'discount' : 'exclusive';
  const i18nKeySecondLevel = isLocked ? 'locked' : 'unlocked';
  const i18nKeyPrefix = `${i18nKeyFirstLevel}.${i18nKeySecondLevel}`;
  return (key: string, vars: any) => t(`${i18nKeyPrefix}.${key}`, vars);
};

export const useTitleAndSubtitle = (props: TokengateProps) => {
  const translateTokengateI18n = useTokengateI18n(props);
  const {
    exclusiveCustomTitles,
    discountCustomTitles,
    redemptionLimit,
    reaction,
  } = props;
  const isLocked = calculatedIsLocked(props);
  const hasRedemption = redemptionLimit && redemptionLimit.total > 0;

  const customTitles = isDiscountGate(props)
    ? discountCustomTitles
    : exclusiveCustomTitles;

  const {
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
    unlockedSubtitleWithRedemptionLimit,
  } = customTitles ?? {};

  const customTitle = isLocked ? lockedTitle : unlockedTitle;
  const customSubtitle = isLocked ? lockedSubtitle : unlockedSubtitle;

  const discountText =
    reaction?.discount?.type === 'percentage'
      ? `${reaction.discount.value}%`
      : `$${reaction?.discount?.value}`;
  const title =
    customTitle || translateTokengateI18n('title', {discount: discountText});
  let subtitle =
    customSubtitle ||
    translateTokengateI18n('subtitle', {
      hasRedemption,
    });

  if (hasRedemption && !isLocked) {
    subtitle =
      unlockedSubtitleWithRedemptionLimit ||
      translateTokengateI18n('subtitleWithOrderLimit', {
        orderLimit: redemptionLimit.total,
      });
  }

  return {
    title,
    subtitle,
  };
};

const getCombinedConsumedOrderLimit = ({unlockingTokens}: TokengateProps) => {
  const initialValue = 0;
  const combinedConsumedOrderLimit = unlockingTokens?.reduce(
    (accumulator: number, unlockingToken: UnlockingToken) => {
      if (!unlockingToken.consumedRedemptionLimit) return accumulator;

      return accumulator + unlockingToken.consumedRedemptionLimit;
    },
    initialValue,
  );

  return combinedConsumedOrderLimit && combinedConsumedOrderLimit > 0
    ? combinedConsumedOrderLimit
    : undefined;
};

const hasReachedOrderLimit = (props: TokengateProps) => {
  const orderLimit = props.redemptionLimit?.total;
  const consumedOrderLimit = getCombinedConsumedOrderLimit(props);
  return orderLimit && consumedOrderLimit && consumedOrderLimit >= orderLimit;
};

const isDiscountGate = (props: TokengateProps) => {
  return props.reaction?.type === 'discount' && props.reaction.discount;
};

export const calculatedIsLocked = (props: TokengateProps) => {
  const {unlockingTokens, requirements, isConnected, isLocked} = props;

  // Default to isLocked when provided
  if (isLocked !== undefined) return isLocked;

  if (!isConnected || !unlockingTokens || unlockingTokens.length === 0)
    return true;

  const arrayLogicFunction = requirements?.logic === 'ALL' ? 'every' : 'some';

  const hasTokenForAllConditions = requirements?.conditions[arrayLogicFunction](
    (condition) =>
      Boolean(
        unlockingTokens.find(
          (unlockingToken) =>
            unlockingToken.collectionAddress.toLowerCase() ===
            condition.collectionAddress.toLowerCase(),
        ),
      ),
  );

  return !hasTokenForAllConditions;
};

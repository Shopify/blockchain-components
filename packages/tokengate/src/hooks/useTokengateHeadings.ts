import {useTranslation} from './useTranslation';

import {i18n} from '~/providers/I18nProvider';
import type {
  CustomTitles,
  Reaction,
  RedemptionLimit,
  UnlockingToken,
} from '~/types';

export interface UseTokengateHeadingsProps {
  exclusiveCustomTitles?: CustomTitles;
  discountCustomTitles?: CustomTitles;
  locked: boolean;
  reaction?: Reaction;
  redemptionLimit?: RedemptionLimit;
  unlockingTokens?: UnlockingToken[];
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const useTokengateHeadings = ({
  discountCustomTitles,
  exclusiveCustomTitles,
  locked,
  reaction,
  redemptionLimit,
}: UseTokengateHeadingsProps) => {
  const type = reaction?.type === 'discount' ? reaction.type : 'exclusive';
  const {t} = useTranslation('Tokengate');
  const i18nKeyPrefix = `${type}.${locked ? 'locked' : 'unlocked'}`;
  const customTitles =
    type === 'discount' ? discountCustomTitles : exclusiveCustomTitles;

  const {
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
    unlockedSubtitleWithRedemptionLimit,
  } = customTitles ?? {};

  const reactionValue =
    typeof reaction?.discount?.value === 'number'
      ? reaction.discount.value
      : parseFloat(reaction?.discount?.value || '0');

  const discount =
    reaction?.discount?.type === 'percentage'
      ? `${reactionValue.toFixed(0)}%`
      : CURRENCY_FORMATTER.format(reactionValue);

  const customTitle = locked ? lockedTitle : unlockedTitle;
  const customSubtitle = locked ? lockedSubtitle : unlockedSubtitle;
  const hasRedemption = redemptionLimit && redemptionLimit.total > 0;

  if (customTitle && typeof customTitle === 'string') {
    i18n.addResource('en', 'Tokengate', 'customTitle', customTitle);
  }

  const title = customTitle
    ? t('customTitle', {value: discount})
    : t(`${i18nKeyPrefix}.title`, {value: discount});

  let subtitle =
    customSubtitle ||
    t(`${i18nKeyPrefix}.subtitle`, {
      hasRedemption,
    });

  if (hasRedemption && !locked) {
    subtitle =
      unlockedSubtitleWithRedemptionLimit ||
      t(`${i18nKeyPrefix}.subtitleWithOrderLimit`, {
        orderLimit: redemptionLimit.total,
      });
  }

  return {
    title,
    subtitle,
  };
};

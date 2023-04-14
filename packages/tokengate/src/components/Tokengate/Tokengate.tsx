import {
  useComponentRenderedTracking,
  eventNames,
  publishEvent,
} from '@shopify/blockchain-components';
import {ReactNode, Fragment, useMemo, useEffect} from 'react';

import {ButtonWrapper} from '../ButtonWrapper';
import {Card} from '../Card';
import {Error} from '../Error';
import {TokengateRequirements} from '../TokengateRequirements';
import {UnlockingTokens} from '../UnlockingTokens';
import {useTranslation} from '../../hooks/useTranslation';
import {TokengateProps} from '../../types';

import {TokengateCardSection, useTokengateCardState} from './utils';

export const Tokengate = (props: TokengateProps) => {
  const {t} = useTranslation('Tokengate');
  const {
    connectButton,
    connectedButton,
    active,
    requirements,
    unlockingTokens,
    redemptionLimit,
  } = props;
  const {title, subtitle, sections, isLocked, hasRequirementsNotMet} =
    useTokengateCardState(props);

  // Analytics
  useComponentRenderedTracking(eventNames.TOKENGATE_COMPONENT_RENDERED);
  useEffect(() => {
    if (!isLocked) publishEvent(eventNames.TOKENGATE_ON_UNLOCK_EVENT);
  }, [isLocked]);
  useEffect(() => {
    if (hasRequirementsNotMet)
      publishEvent(eventNames.TOKENGATE_ON_REQUIREMENTS_NOT_MET_EVENT);
  }, [hasRequirementsNotMet]);

  const sectionMapping: {[key in TokengateCardSection]: ReactNode} = useMemo(
    () => ({
      [TokengateCardSection.ConnectWallet]: (
        <ButtonWrapper
          button={connectButton}
          text={
            active?.end
              ? {key: 'activeEnd', value: new Date(active.end)}
              : undefined
          }
          textColor="secondary"
          translationNamespace="Buttons"
        />
      ),
      [TokengateCardSection.ConnectedWallet]: connectedButton ?? connectButton,
      [TokengateCardSection.UnlockingTokens]: (
        <UnlockingTokens
          unlockingTokens={unlockingTokens}
          redemptionLimit={redemptionLimit}
        />
      ),
      [TokengateCardSection.TokengateRequirement]: (
        <TokengateRequirements requirements={requirements} />
      ),
      [TokengateCardSection.TokengateRequirementMissingTokens]: (
        <TokengateRequirements
          requirements={requirements}
          unlockingTokens={unlockingTokens}
          hasMissingTokens
        />
      ),
      [TokengateCardSection.AvailableSoon]: (
        <ButtonWrapper
          button={{
            disabled: true,
            label: {
              key: 'activeStart',
              value: active?.start ? new Date(active.start) : undefined,
            },
          }}
          translationNamespace="Buttons"
        />
      ),
      [TokengateCardSection.SoldOut]: (
        <ButtonWrapper
          button={{
            disabled: true,
            label: {key: 'soldOutLabel'},
          }}
          text={{key: 'soldOutDescription'}}
          textColor="secondary"
          translationNamespace="Buttons"
        />
      ),
      [TokengateCardSection.TokengateRequirementSkeleton]: (
        <TokengateRequirements isLoading />
      ),
      [TokengateCardSection.OrderLimitReachedError]: (
        <Error text={t('errors.orderLimitReachedError') as string} />
      ),
      [TokengateCardSection.MissingTokensError]: (
        <Error text={t('errors.missingTokensError') as string} />
      ),
    }),
    [
      active,
      connectButton,
      connectedButton,
      redemptionLimit,
      requirements,
      unlockingTokens,
      t,
    ],
  );

  return (
    <Card title={title as string} subtitle={subtitle as string}>
      {sections.map((section: TokengateCardSection) => (
        <Fragment key={section}>{sectionMapping[section]}</Fragment>
      ))}
    </Card>
  );
};

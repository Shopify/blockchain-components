import {ReactNode, Fragment, useMemo, useEffect} from 'react';
import {ClientAnalytics} from 'shared';

import {AvailableSoonButton} from '../AvailableSoonButton';
import {Card} from '../Card';
import {Error} from '../Error';
import {SoldOutButton} from '../SoldOutButton';
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
  const {title, subtitle, sections} = useTokengateCardState(props);

  useEffect(() => {
    ClientAnalytics.publishEvent(
      ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
    );
  }, []);

  const sectionMapping: {[key in TokengateCardSection]: ReactNode} = useMemo(
    () => ({
      [TokengateCardSection.ConnectWallet]: connectButton,
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
        <AvailableSoonButton availableDate={active?.start} />
      ),
      [TokengateCardSection.SoldOut]: <SoldOutButton />,
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
      active?.start,
      connectButton,
      connectedButton,
      requirements,
      t,
      unlockingTokens,
      redemptionLimit,
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

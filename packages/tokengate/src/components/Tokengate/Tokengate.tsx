import {ReactNode, Fragment, useMemo} from 'react';
import {TokengateProps} from 'types';

import {AvailableSoonButton} from '../AvailableSoonButton';
import {Card} from '../Card';
import {Error} from '../Error';
import {SoldOutButton} from '../SoldOutButton';
import {TokengateRequirement} from '../TokengateRequirement';
import {UnlockingTokens} from '../UnlockingTokens';
import {useTranslation} from '../../hooks/useTranslation';

import {TokengateCardSection, useTokengateCardState} from './utils';

export const Tokengate = (props: TokengateProps) => {
  const {t} = useTranslation('Tokengate');
  const {
    connectButton,
    connectedButton,
    active,
    gateRequirement,
    unlockingTokens,
  } = props;
  const {title, subtitle, sections} = useTokengateCardState(props);

  const sectionMapping: {[key in TokengateCardSection]: ReactNode} = useMemo(
    () => ({
      [TokengateCardSection.ConnectWallet]: connectButton,
      [TokengateCardSection.ConnectedWallet]: connectedButton ?? connectButton,
      [TokengateCardSection.UnlockingTokens]: (
        <UnlockingTokens unlockingTokens={unlockingTokens} />
      ),
      [TokengateCardSection.TokengateRequirement]: (
        <TokengateRequirement gateRequirement={gateRequirement} />
      ),
      [TokengateCardSection.TokengateRequirementMissingTokens]: (
        <TokengateRequirement
          gateRequirement={gateRequirement}
          unlockingTokens={unlockingTokens}
          hasMissingTokens
        />
      ),
      [TokengateCardSection.AvailableSoon]: (
        <AvailableSoonButton availableDate={active?.start} />
      ),
      [TokengateCardSection.SoldOut]: <SoldOutButton />,
      [TokengateCardSection.TokengateRequirementSkeleton]: (
        <TokengateRequirement isLoading />
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
      gateRequirement,
      t,
      unlockingTokens,
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

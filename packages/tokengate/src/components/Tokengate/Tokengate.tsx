import {ReactNode, Fragment, useMemo} from 'react';
import {useI18n} from '@shopify/react-i18n';

import {AvailableSoonButton} from '../AvailableSoonButton';
import {Card} from '../Card';
import {Error} from '../Error';
import {SoldOutButton} from '../SoldOutButton';
import {TokengateRequirement} from '../TokengateRequirement';
import {UnlockingTokens} from '../UnlockingTokens';

import {TokengateCardSection, useTokengateCardState} from './utils';
import {TokengateProps} from './types';

export const Tokengate = (props: TokengateProps) => {
  const [i18n] = useI18n();
  const {
    connectButton,
    connectedButton,
    availableDate,
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
        <AvailableSoonButton availableDate={availableDate} />
      ),
      [TokengateCardSection.SoldOut]: <SoldOutButton />,
      [TokengateCardSection.TokengateRequirementSkeleton]: (
        <TokengateRequirement isLoading />
      ),
      [TokengateCardSection.OrderLimitReachedError]: (
        <Error
          text={i18n.translate('Tokengate.errors.orderLimitReachedError')}
        />
      ),
      [TokengateCardSection.MissingTokensError]: (
        <Error text={i18n.translate('Tokengate.errors.missingTokensError')} />
      ),
    }),
    [
      connectButton,
      connectedButton,
      unlockingTokens,
      gateRequirement,
      availableDate,
      i18n,
    ],
  );

  return (
    <Card title={title} subtitle={subtitle}>
      {sections.map((section: TokengateCardSection) => (
        <Fragment key={section}>{sectionMapping[section]}</Fragment>
      ))}
    </Card>
  );
};

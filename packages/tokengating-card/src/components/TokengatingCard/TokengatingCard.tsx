import {ReactNode, Fragment, useMemo} from 'react';
import {RootProvider} from 'shared';

import {AvailableSoonButton} from '../AvailableSoonButton';
import {Card} from '../Card';
import {OrderLimitReachedWarning} from '../OrderLimitReachedWarning';
import {SoldOutButton} from '../SoldOutButton';
import {TokengateRequirement} from '../TokengateRequirement';
import {UnlockingTokens} from '../UnlockingTokens';

import {TokengateCardSection, useTokengateCardState} from './utils';
import {TokengatingCardProps} from './types';

export const TokengatingCard = (props: TokengatingCardProps) => {
  const {connectButton, availableDate, gateRequirement, unlockingTokens} =
    props;
  const {title, subtitle, sections} = useTokengateCardState(props);

  const sectionMapping: {[key in TokengateCardSection]: ReactNode} = useMemo(
    () => ({
      [TokengateCardSection.ConnectWallet]: connectButton,
      [TokengateCardSection.ConnectedWallet]: connectButton,
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
      [TokengateCardSection.OrderLimitReached]: <OrderLimitReachedWarning />,
    }),
    [connectButton, unlockingTokens, gateRequirement, availableDate],
  );

  return (
    <RootProvider>
      <Card title={title} subtitle={subtitle}>
        {sections.map((section: TokengateCardSection) => (
          <Fragment key={section}>{sectionMapping[section]}</Fragment>
        ))}
      </Card>
    </RootProvider>
  );
};

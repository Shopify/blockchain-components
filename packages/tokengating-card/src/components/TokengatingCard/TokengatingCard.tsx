import {ReactNode, Fragment, useMemo} from 'react';
import {ThemeProvider} from 'shared';

import {AvailableSoonButton} from '../AvailableSoonButton';
import {Card} from '../Card';
import {ConnectedWalletButton} from '../ConnectedWalletButton';
import {ConnectWalletButton} from '../ConnectWalletButton';
import {SoldOutButton} from '../SoldOutButton';
import {TokengateRequirement} from '../TokengateRequirement';
import {UnlockingTokens} from '../UnlockingTokens';

import {TokengateCardSection, useTokengateCardState} from './utils';
import {TokengatingCardProps} from './types';

export const TokengatingCard = (props: TokengatingCardProps) => {
  const {
    onConnectWallet,
    onConnectedWalletActions,
    wallet,
    availableDate,
    gateRequirement,
    unlockingTokens,
  } = props;
  const {title, subtitle, sections} = useTokengateCardState(props);

  const sectionMapping: {[key in TokengateCardSection]: ReactNode} = useMemo(
    () => ({
      [TokengateCardSection.ConnectWallet]: (
        <ConnectWalletButton onConnectWallet={onConnectWallet} />
      ),
      [TokengateCardSection.ConnectedWallet]: (
        <ConnectedWalletButton
          onConnectedWalletActions={onConnectedWalletActions}
          icon={wallet?.icon}
          ensName={wallet?.ensName}
          address={wallet?.address}
        />
      ),
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
    }),
    [
      onConnectWallet,
      onConnectedWalletActions,
      wallet?.icon,
      wallet?.ensName,
      wallet?.address,
      unlockingTokens,
      gateRequirement,
      availableDate,
    ],
  );

  return (
    <ThemeProvider>
      <Card title={title} subtitle={subtitle}>
        {sections.map((section: TokengateCardSection) => (
          <Fragment key={section}>{sectionMapping[section]}</Fragment>
        ))}
      </Card>
    </ThemeProvider>
  );
};

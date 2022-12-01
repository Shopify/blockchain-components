import {ReactNode, Fragment, useMemo} from 'react';
import {Card} from '../Card/Card';
import {ConnectedWalletButton} from '../ConnectedWalletButton/ConnectedWalletButton';
import {ConnectWalletButton} from '../ConnectWalletButton/ConnectWalletButton';
import {TokengateCardSection, useTokengateCardState} from './utils';
import {TokengatingCardProps} from './types';
import {ThemeProvider} from 'shared';
import {AvailableSoonButton} from '../AvailableSoonButton/AvailableSoonButton';
import {SoldOutButton} from '../SoldOutButton/SoldOutButton';
import {TokenList} from '../TokenList/TokenList';
import {TokengateRequirement} from '../TokengateRequirement/TokengateRequirement';

const TokengatingCard = ({
  isLocked,
  isSoldOut,
  lockedTitle,
  lockedSubtitle,
  unlockedTitle,
  unlockedSubtitle,
  onConnectWallet,
  onConnectedWalletActions,
  wallet,
  availableDate,
  gateRequirement,
  unlockingTokens,
}: TokengatingCardProps) => {
  const {title, subtitle, sections} = useTokengateCardState({
    isLocked,
    isSoldOut,
    wallet,
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
    availableDate,
    unlockingTokens,
  });

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
      [TokengateCardSection.TokenList]: <TokenList tokens={unlockingTokens} />,
      [TokengateCardSection.TokengateRequirement]: (
        <TokengateRequirement
          gateRequirement={gateRequirement}
          unlockingTokens={unlockingTokens}
        />
      ),
      [TokengateCardSection.AvailableSoon]: (
        <AvailableSoonButton availableDate={availableDate} />
      ),
      [TokengateCardSection.SoldOut]: <SoldOutButton />,
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

export {TokengatingCard};

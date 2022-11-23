import {useMemo} from 'react';
import {Card} from '../Card/Card';
import {ConnectedWalletButton} from '../ConnectedWalletButton/ConnectedWalletButton';
import {ConnectWalletButton} from '../ConnectWalletButton/ConnectWalletButton';
import {
  TokengatingCardProps,
  TokengateCardSection,
  useTokengateCardState,
} from './utils';
import {ThemeProvider} from 'shared';
import React from 'react';

const TokengatingCard = ({
  isLocked,
  lockedTitle,
  lockedSubtitle,
  unlockedTitle,
  unlockedSubtitle,
  onConnectWallet,
  onConnectedWalletActions,
  address,
  ensName,
  icon,
}: TokengatingCardProps) => {
  const {title, subtitle, sections} = useTokengateCardState({
    isLocked,
    address,
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
  });

  const sectionMapping: {[key in TokengateCardSection]: React.ReactNode} =
    useMemo(
      () => ({
        [TokengateCardSection.ConnectWallet]: (
          <ConnectWalletButton onConnectWallet={onConnectWallet} />
        ),
        [TokengateCardSection.ConnectedWallet]: (
          <ConnectedWalletButton
            onConnectedWalletActions={onConnectedWalletActions}
            icon={icon}
            ensName={ensName}
            address={address}
          />
        ),
        [TokengateCardSection.TokenList]: <div>TokenList</div>,
        [TokengateCardSection.TokengateRequirements]: (
          <div>TokengateRequirements</div>
        ),
        [TokengateCardSection.UnavailableTokengate]: (
          <div>UnavailableTokengate</div>
        ),
      }),
      [],
    );

  return (
    <ThemeProvider>
      <Card title={title} subtitle={subtitle}>
        {sections.map(
          (section: TokengateCardSection) => sectionMapping[section],
        )}
      </Card>
    </ThemeProvider>
  );
};

export {TokengatingCard};

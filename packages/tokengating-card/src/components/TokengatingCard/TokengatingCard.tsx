import {ReactNode, Fragment, useMemo} from 'react';
import {ThemeProvider} from 'shared';
import {Card} from '../Card/Card';
import {ConnectedWalletButton} from '../ConnectedWalletButton/ConnectedWalletButton';
import {ConnectWalletButton} from '../ConnectWalletButton/ConnectWalletButton';
import {TokengateCardSection, useTokengateCardState} from './utils';
import {TokengatingCardProps} from './types';
import {AvailableSoonButton} from '../AvailableSoonButton/AvailableSoonButton';
import {SoldOutButton} from '../SoldOutButton/SoldOutButton';

const TokengatingCard = ({
  isLocked,
  isSoldOut,
  lockedTitle,
  lockedSubtitle,
  unlockedTitle,
  unlockedSubtitle,
  onConnectWallet,
  onConnectedWalletActions,
  address,
  ensName,
  icon,
  availableDate,
  gateRequirement,
}: TokengatingCardProps) => {
  const {title, subtitle, sections} = useTokengateCardState({
    isLocked,
    isSoldOut,
    address,
    lockedTitle,
    lockedSubtitle,
    unlockedTitle,
    unlockedSubtitle,
    availableDate,
  });

  const sectionMapping: {[key in TokengateCardSection]: ReactNode} = useMemo(
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
        <div>
          <h2>TokengateRequirements</h2>
          <code>JSON: { JSON.stringify(gateRequirement) }</code>
        </div>
      ),
      [TokengateCardSection.UnavailableTokengate]: (
        <div>UnavailableTokengate</div>
      ),
      [TokengateCardSection.AvailableSoon]: (
        <AvailableSoonButton availableDate={availableDate} />
      ),
      [TokengateCardSection.SoldOut]: <SoldOutButton />,
    }),
    [],
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

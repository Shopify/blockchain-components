import {Card} from '../Card/Card';
import {ConnectedWalletButton} from '../ConnectedWalletButton/ConnectedWalletButton';
import {ConnectWalletButton} from '../ConnectWalletButton/ConnectWalletButton';
import {ThemeProvider} from 'shared';

interface AppProps {
  isLocked: boolean;
  lockedTitle?: string;
  lockedSubtitle?: string;
  unlockedTitle?: string;
  unlockedSubtitle?: string;
  onConnectWallet: () => void;
  onConnectedWalletActions: () => void;
  address: string;
  ensName?: string;
  icon?: React.ReactNode;
}
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
}: AppProps) => {
  return (
    <ThemeProvider>
      <div className="App">
        {isLocked ? (
          <Card
            title={lockedTitle || 'Holder exclusive'}
            subtitle={lockedSubtitle || 'To unlock this product, you need:'}
            button={<ConnectWalletButton onConnectWallet={onConnectWallet} />}
          ></Card>
        ) : (
          <Card
            title={unlockedTitle || 'Exclusive unlocked'}
            subtitle={
              unlockedSubtitle || 'Your token got you access to this product!'
            }
            button={
              <ConnectedWalletButton
                onConnectedWalletActions={onConnectedWalletActions}
                icon={icon}
                ensName={ensName}
                address={address}
              />
            }
          ></Card>
        )}
      </div>
    </ThemeProvider>
  );
};

export {TokengatingCard};

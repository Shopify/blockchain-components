import {
  ConnectedWalletButtonStyle,
  ConnectedWalletIcon,
  ConnectedWalletButtonText,
} from './style';

interface ConnectedWalletButtonProps {
  onConnectedWalletActions: () => void;
  address?: string;
  ensName?: string;
  icon?: React.ReactNode;
}

const ConnectedWalletButton = ({
  onConnectedWalletActions,
  icon,
  ensName,
  address,
}: ConnectedWalletButtonProps) => (
  <ConnectedWalletButtonStyle
    id="connectWallet"
    onClick={onConnectedWalletActions}
  >
    <ConnectedWalletIcon>{icon}</ConnectedWalletIcon>
    <ConnectedWalletButtonText>{ensName || address}</ConnectedWalletButtonText>
  </ConnectedWalletButtonStyle>
);
export {ConnectedWalletButton};

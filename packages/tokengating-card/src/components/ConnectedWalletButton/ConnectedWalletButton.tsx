import {
  ConnectedWalletButtonStyle,
  ConnectedWalletIcon,
  ConnectedWalletButtonText,
  ConnectedWalletDropdown,
} from './style';
import {IconButton} from 'shared/src/components/IconButton';
import {ChevronDown} from '../../assets/icons/ChevronDown';

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
    <ConnectedWalletDropdown>
      <IconButton icon={ChevronDown} />
    </ConnectedWalletDropdown>
  </ConnectedWalletButtonStyle>
);
export {ConnectedWalletButton};

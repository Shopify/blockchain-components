import {formatWalletAddress} from 'shared';

import {
  ConnectedWalletButtonStyle,
  ConnectedWalletIcon,
  ConnectedWalletAddress,
} from './style';

interface ConnectedWalletButtonProps {
  onConnectedWalletActions: () => void;
  address: string;
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
    {icon && <ConnectedWalletIcon>{icon}</ConnectedWalletIcon>}
    <ConnectedWalletAddress>
      {ensName || formatWalletAddress(address)}
    </ConnectedWalletAddress>
    {/* <ConnectedWalletDropdown>{ChevronDown}</ConnectedWalletDropdown> */}
  </ConnectedWalletButtonStyle>
);
export {ConnectedWalletButton};

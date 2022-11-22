import {ConnectWalletButtonStyle, ConnectWalletButtonText} from './style';

interface ConnectWalletButtonProps {
  onConnectWallet: () => void;
}

const ConnectWalletButton = ({onConnectWallet}: ConnectWalletButtonProps) => (
  <ConnectWalletButtonStyle id="connectWallet" onClick={onConnectWallet}>
    <ConnectWalletButtonText>Connect wallet</ConnectWalletButtonText>
  </ConnectWalletButtonStyle>
);
export {ConnectWalletButton};

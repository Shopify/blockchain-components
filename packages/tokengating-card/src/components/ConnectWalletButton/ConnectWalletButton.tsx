import {Button} from 'shared'

interface ConnectWalletButtonProps {
  onConnectWallet: () => void;
}

const ConnectWalletButton = ({onConnectWallet}: ConnectWalletButtonProps) => (
  <Button
    id="connectWallet"
    label='Connect wallet'
    onClick={onConnectWallet}
  />
);
export {ConnectWalletButton};

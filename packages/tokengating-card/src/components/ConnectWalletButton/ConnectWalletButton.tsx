import {Button} from 'shared';

interface ConnectWalletButtonProps {
  onConnectWallet: () => void;
}

const ConnectWalletButton = ({onConnectWallet}: ConnectWalletButtonProps) => (
  <Button
    id="connectWallet"
    label="Connect wallet"
    className="button button--full-width"
    onClick={onConnectWallet}
  />
);
export {ConnectWalletButton};

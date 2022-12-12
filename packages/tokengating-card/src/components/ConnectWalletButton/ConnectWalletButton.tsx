import {Button} from 'shared/src/components/Button';

interface ConnectWalletButtonProps {
  loading?: boolean;
  onConnectWallet?: () => void;
}

const ConnectWalletButton = ({
  onConnectWallet,
  loading,
}: ConnectWalletButtonProps) => (
  <Button
    id="connectWallet"
    fullWidth
    label="Connect wallet"
    loading={loading}
    onClick={onConnectWallet}
    primary
  />
);
export {ConnectWalletButton};

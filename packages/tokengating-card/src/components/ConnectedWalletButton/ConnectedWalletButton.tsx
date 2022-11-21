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
  <button
    id="connectWallet"
    type="button"
    className="button button--full-width button--secondary"
    onClick={onConnectedWalletActions}
  >
    {icon}
    {ensName || address}
  </button>
);
export {ConnectedWalletButton};

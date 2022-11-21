interface ConnectWalletButtonProps {
  onConnectWallet: () => void;
}

const ConnectWalletButton = ({onConnectWallet}: ConnectWalletButtonProps) => (
  <button
    id="connectWallet"
    type="button"
    className="button button--full-width"
    onClick={onConnectWallet}
  >
    Connect wallet
  </button>
);
export {ConnectWalletButton};

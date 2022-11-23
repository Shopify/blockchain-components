interface ConnectWalletButtonProps {
  onConnectWallet: () => void;
}

const ConnectWalletButton = ({onConnectWallet}: ConnectWalletButtonProps) => (
  // Small test of a button that only uses classes.
  // The commented version uses styled components.
  // I'll keep it here so that we can easily move back to it
  // <ConnectWalletButtonStyle id="connectWallet" onClick={onConnectWallet}>
  //   Connect wallet
  // </ConnectWalletButtonStyle>
  <button
    id="connectWallet"
    onClick={onConnectWallet}
    className="button button--full-width"
  >
    Connect wallet
  </button>
);
export {ConnectWalletButton};

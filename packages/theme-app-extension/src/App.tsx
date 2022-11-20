import {ConnectWalletButton} from '@shopify/wallet-connection';
import './App.css';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  return (
    <>
      <div>Wallet connection</div>
      <ConnectWalletButton label="Connect wallet" />
    </>
  );
}

export default App;

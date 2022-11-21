import {ConnectWalletButton} from '@shopify/wallet-connection';
import {TokengatingCard} from '@shopify/tokengating-card';
import './App.css';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  return (
    <>
      <div>Wallet connection</div>
      <TokengatingCard />
      <ConnectWalletButton label="Connect wallet" />
    </>
  );
}

export default App;

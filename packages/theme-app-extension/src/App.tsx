import {TokengatingCard} from '@shopify/tokengating-card';
import './App.css';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  return (
    <>
      <TokengatingCard
        isLocked={false}
        lockedTitle=""
        lockedSubtitle=""
        unlockedTitle=""
        unlockedSubtitle=""
        onConnectWallet={() => {}}
        onConnectedWalletActions={() => {}}
        address="0x00"
        ensName="ensName"
        icon={<div>icon</div>}
      />
    </>
  );
}

export default App;

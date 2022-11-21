import {useState} from 'react';
import {TokengatingCard} from '@shopify/tokengating-card';
import './App.css';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  // Mock wallet connection for now
  const [isLocked, setIsLocked] = useState(true);
  return (
    <>
      <TokengatingCard
        isLocked={isLocked}
        lockedTitle=""
        lockedSubtitle=""
        unlockedTitle=""
        unlockedSubtitle=""
        onConnectWallet={() => {
          setIsLocked(false);
          console.log('onConnectWallet');
        }}
        onConnectedWalletActions={() => console.log('onConnectedWalletActions')}
        address="0x00"
        ensName="ensName"
        icon={<div>icon</div>}
      />
    </>
  );
}

export default App;

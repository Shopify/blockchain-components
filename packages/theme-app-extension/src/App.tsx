import {useState} from 'react';
import {TokengatingCard} from '@shopify/tokengating-card';
import {useConnectionModal} from '@shopify/wallet-connection';
import './App.css';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  // Mock wallet connection for now
  const {openConnectionModal} = useConnectionModal();
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
          openConnectionModal();
          /**
           * Will come back to this to add connected + verified states.
           */
          setIsLocked(false);
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

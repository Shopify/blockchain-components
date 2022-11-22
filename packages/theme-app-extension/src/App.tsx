import {useState} from 'react';
import {TokengatingCard} from '@shopify/tokengating-card';
import {useConnectionModal} from '@shopify/wallet-connection';
import './DawnVariables.css';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  // Mock wallet connection for now
  const {openModal} = useConnectionModal();
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
          openModal();
          /**
           * Will come back to this to add connected + verified states.
           */
          setIsLocked(false);
        }}
        onConnectedWalletActions={() => console.log('onConnectedWalletActions')}
        address="0x00"
        ensName="snowdevil.eth"
        icon={<div></div>}
      />
    </>
  );
}

export default App;

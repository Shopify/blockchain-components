import {useState} from 'react';
import {TokengatingCard} from '@shopify/tokengating-card';
import {useConnectionModal} from '@shopify/wallet-connection';
import './DawnVariables.css';

interface AppProps {
  serverArguments?: {
    initialState: {
      locked: boolean;
      wallet?: {
        walletAddress: string;
      };
    };
  };
}
function App({serverArguments}: AppProps) {
  // Mock wallet connection for now
  const {openModal} = useConnectionModal();
  const [isLocked, setIsLocked] = useState(
    serverArguments?.initialState?.locked ?? true,
  );
  const [wallet] = useState(serverArguments?.initialState?.wallet);

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
        address={wallet?.walletAddress}
        ensName="snowdevil.eth"
        icon={<div></div>}
      />
    </>
  );
}

export default App;

import {useState} from 'react';
import {
  TokengatingCard,
  GateRequirement,
  UnlockingToken,
} from '@shopify/tokengating-card';
import {useConnectionModal} from '@shopify/wallet-connection';
import './DawnVariables.css';

import './App.css';
import {EventName, RequestWalletVerification} from './types/events';
import {eventBus, useLazyEventBus} from './utils';

interface AppProps {
  serverArguments?: {
    initialState: {
      locked: boolean;
      wallet?: {
        walletAddress: string;
      };
      gateRequirement?: GateRequirement;
      unlockingTokens?: UnlockingToken[];
    };
    setupEventBus: (eventBus: any) => void;
  };
}

function App({serverArguments}: AppProps) {
  // Mock wallet connection for now
  const {openModal} = useConnectionModal();
  const [isLocked, setIsLocked] = useState(
    serverArguments?.initialState?.locked ?? true,
  );
  const [wallet, setWallet] = useState(serverArguments?.initialState?.wallet);

  const [
    requestWalletVerification,
    {
      data: requestWalletVerificationResponse,
      status: requestWalletVerificationStatus,
    },
  ] = useLazyEventBus<RequestWalletVerification>(
    EventName.RequestWalletVerificationMessage,
  );
  console.log({
    verification: requestWalletVerificationResponse?.verification,
    requestWalletVerificationStatus,
  });

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
          setWallet({walletAddress: '0x0'});
          requestWalletVerification({address: '0x0'});
        }}
        onConnectedWalletActions={() => console.log('onConnectedWalletActions')}
        address={wallet?.walletAddress}
        ensName="snowdevil.eth"
        icon={<div></div>}
        gateRequirement={serverArguments?.initialState?.gateRequirement}
        unlockingTokens={serverArguments?.initialState?.unlockingTokens}
      />
    </>
  );
}

export default App;

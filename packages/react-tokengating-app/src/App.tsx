import {useEffect, useState} from 'react';
import {
  TokengatingCard,
  GateRequirement,
  UnlockingToken,
} from '@shopify/tokengating-card';
import {
  Wallet,
  useConnectionModal,
  useWalletConnection,
} from '@shopify/wallet-connection';

import './DawnVariables.css';

import './App.css';
import {EventName, RequestWalletVerificationMessageEvent} from './types/events';
import {eventBus, useLazyEventBus} from './utils';

interface AppProps {
  serverArguments?: {
    initialState: {
      locked: boolean;
      gateRequirement?: GateRequirement;
      unlockingTokens?: UnlockingToken[];
      wallet?: Wallet;
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

  const [
    requestWalletVerification,
    {
      data: requestWalletVerificationResponse,
      status: requestWalletVerificationStatus,
    },
  ] = useLazyEventBus<RequestWalletVerificationMessageEvent>(
    EventName.RequestWalletVerificationMessage,
  );

  console.log({
    verification: requestWalletVerificationResponse?.verification,
    requestWalletVerificationStatus,
  });

  const {signMessage, wallet} = useWalletConnection({
    onConnect: (response) => {
      if (response?.address) {
        requestWalletVerification({address: response.address});
      }
    },
    onMessageSigned: (response) => {
      console.log('signed response', response);
    },
  });

  useEffect(() => {
    if (requestWalletVerificationResponse?.verification?.message) {
      signMessage({
        message: requestWalletVerificationResponse.verification.message,
      });
    }
  }, [requestWalletVerificationResponse?.verification?.message]);

  return (
    <>
      <TokengatingCard
        isLocked={isLocked}
        isSoldOut={false}
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
        address={wallet?.address}
        ensName="snowdevil.eth"
        availableDate="08 September 2022 09:00 UTC"
        icon={<div></div>}
        gateRequirement={serverArguments?.initialState?.gateRequirement}
        unlockingTokens={serverArguments?.initialState?.unlockingTokens}
      />
    </>
  );
}

export default App;

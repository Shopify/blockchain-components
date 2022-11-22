import {useState} from 'react';
import {TokengatingCard} from '@shopify/tokengating-card';
import {useConnectionModal} from '@shopify/wallet-connection';
import './DawnVariables.css';

import './App.css';
import {EventBusEvent, Payload, VerificationMessageInput} from './types/events';
import {eventBus, handleEvent} from './utils';

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
  const [verificationMessage, setVerificationMessage] = useState<
    string | undefined
  >();
  const [wallet] = useState(serverArguments?.initialState?.wallet);

  serverArguments?.initialState?.setupEventBus?.(eventBus);

  const getVerificationMessageAsync = async (walletAddress: string) => {
    const {userErrors, verification} = await handleEvent<
      Payload,
      VerificationMessageInput
    >(
      EventBusEvent.RequestWalletVerificationMessage,
      {address: walletAddress},
      EventBusEvent.WalletVerificationMessageGenerated,
    );

    if (userErrors?.length || !verification) {
      // show a toast or alert the user in another form that the verification message generation failed.
      return;
    }

    setVerificationMessage(verification.message);
  };

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

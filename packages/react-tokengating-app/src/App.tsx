import {useEffect, useState} from 'react';
import {
  TokengatingCard,
  GateRequirement,
  UnlockingToken,
} from '@shopify/tokengating-card';
import {useAccount, useConnectionModal} from '@shopify/wallet-connection';
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

  const {
    account,
    /**
     * Commenting out verify because you probably don't want to
     * be bothered with numerous verification messages during dev.
     */
    // verify
  } = useAccount();

  useEffect(() => {
    const verifyAddress = async () => {
      if (!account) {
        return;
      }

      // const data = await verify({address: account.address, message: 'Testing'});
    };

    /**
     * This is not code for future use, this is just rough dev code for testing the signature process.
     */
    setIsLocked(false);
    verifyAddress();
  }, [account]);

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
        address={account?.address}
        ensName="snowdevil.eth"
        icon={<div></div>}
        gateRequirement={serverArguments?.initialState?.gateRequirement}
        unlockingTokens={serverArguments?.initialState?.unlockingTokens}
      />
    </>
  );
}

export default App;

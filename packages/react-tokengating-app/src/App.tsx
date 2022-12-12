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
  ConnectorIcon,
} from '@shopify/wallet-connection';

import './DawnVariables.css';

import './App.css';
import {
  EventName,
  RequestWalletVerificationMessageEvent,
  CheckIfWalletMeetsRequirementsEvent,
} from './types/events';
import {eventBus, useLazyEventBus} from './utils';

interface AppProps {
  serverArguments?: {
    initialState: {
      isLoading: boolean;
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
      // status: requestWalletVerificationStatus,
    },
  ] = useLazyEventBus<RequestWalletVerificationMessageEvent>(
    EventName.RequestWalletVerificationMessage,
  );

  const [
    checkIfWalletMeetsRequirements,
    {
      data: checkIfWalletMeetsRequirementsResponse,
      // status: checkIfWalletMeetsRequirementsStatus,
    },
  ] = useLazyEventBus<CheckIfWalletMeetsRequirementsEvent>(
    EventName.CheckIfWalletMeetsRequirements,
  );

  const {signMessage, wallet} = useWalletConnection({
    onConnect: (response) => {
      if (response?.address) {
        requestWalletVerification({address: response.address});
      }
    },
    onMessageSigned: (response) => {
      if (!response) return;

      const {address, message, signature} = response;
      checkIfWalletMeetsRequirements({
        address,
        message,
        signature,
      });
    },
  });

  useEffect(() => {
    if (requestWalletVerificationResponse?.verification?.message) {
      signMessage({
        message: requestWalletVerificationResponse.verification.message,
      });
    }
  }, [requestWalletVerificationResponse?.verification?.message]);

  useEffect(() => {
    setIsLocked(!checkIfWalletMeetsRequirementsResponse?.isUnlocked);
  }, [checkIfWalletMeetsRequirementsResponse?.isUnlocked]);

  return (
    <>
      <TokengatingCard
        isLoading={serverArguments?.initialState?.isLoading}
        isLocked={isLocked}
        isSoldOut={false}
        onConnectWallet={openModal}
        onConnectedWalletActions={() => console.log('onConnectedWalletActions')}
        wallet={{
          address: wallet?.address,
          ensName: undefined,
          icon: <ConnectorIcon id={wallet?.connectorId} />,
        }}
        availableDate="08 September 2022 09:00 UTC"
        gateRequirement={serverArguments?.initialState?.gateRequirement}
        unlockingTokens={
          checkIfWalletMeetsRequirementsResponse?.unlockingTokens
        }
      />
    </>
  );
}

export default App;

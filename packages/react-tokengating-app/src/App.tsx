import {
  ConnectButton,
  Wallet,
  useConnectionModal,
  useConnectWallet,
  ConnectorIcon,
} from '@shopify/connect-wallet';
import {Tokengate, GateRequirement, UnlockingToken} from '@shopify/tokengate';
import {useEffect, useState} from 'react';

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
    serverArguments?.initialState.locked ?? true,
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

  const {disconnect, signMessage, wallet} = useConnectWallet({
    onConnect: (response) => {
      if (response?.address) {
        /**
         * If the wallet has already signed a message then check if the
         * wallet satisfies the gate requirements.
         */
        if (response.signed) {
          checkIfWalletMeetsRequirements({
            address: response.address,
            message: response.message,
            signature: response.signature,
          });
          return;
        }

        requestWalletVerification({address: response.address});
      }
    },
    onDisconnect: (response) => {
      // eslint-disable-next-line no-console
      console.log('disconnected wallet with data', response);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestWalletVerificationResponse?.verification?.message]);

  useEffect(() => {
    setIsLocked(!checkIfWalletMeetsRequirementsResponse?.isUnlocked);
  }, [checkIfWalletMeetsRequirementsResponse?.isUnlocked]);

  return (
    <Tokengate
      connectButton={<ConnectButton />}
      isLoading={serverArguments?.initialState.isLoading}
      isLocked={isLocked}
      isSoldOut={false}
      onConnectWallet={openModal}
      onConnectedWalletActions={disconnect}
      wallet={{
        address: wallet?.address,
        ensName: undefined,
        icon: <ConnectorIcon id={wallet?.connectorId} />,
      }}
      availableDate="08 September 2022 09:00 UTC"
      gateRequirement={serverArguments?.initialState.gateRequirement}
      unlockingTokens={checkIfWalletMeetsRequirementsResponse?.unlockingTokens}
    />
  );
}

export default App;

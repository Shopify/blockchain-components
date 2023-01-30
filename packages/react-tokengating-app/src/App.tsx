import {ConnectButton, Wallet, useConnectWallet} from '@shopify/connect-wallet';
import {
  Tokengate,
  adaptRequirements,
  adaptUnlockingTokens,
} from '@shopify/tokengate';
import {useEffect} from 'react';

import './DawnVariables.css';
import {Preview} from './style';
import {
  EventName,
  RequestWalletVerificationMessageEvent,
  CheckIfWalletMeetsRequirementsEvent,
  DisconnectWalletEvent,
} from './types/events';
import {useLazyEventBus} from './utils';

interface AppProps {
  serverArguments?: {
    initialState: {
      isLoading: boolean;
      locked: boolean;
      gateRequirement?: {
        operator: 'OR' | 'AND';
        tokenSeries: {
          name: string;
          imageUrl: string;
          contractAddress: string;
        }[];
      };
      unlockingTokens?: {
        token: {
          title: string;
          mediaUrl: string;
          contractName: string;
          contractAddress: string;
          consumedOrderLimit?: number;
        };
      }[];
      wallet?: Wallet;
    };
    setupEventBus: (eventBus: any) => void;
  };
}

/**
 * With Vite specifically, there is an issue with HMR and fast refresh where any
 * named exports will break the flow. I was beginning to see this issue present
 * in the development environment, and doing the following (anonymous default export)
 * resolved the issue.
 *
 * More here: https://github.com/vitejs/vite/discussions/4577#discussioncomment-1161007
 */
// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function ({serverArguments}: AppProps) {
  const isDev = import.meta.env.DEV;

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

  const [disconnectWallet] = useLazyEventBus<DisconnectWalletEvent>(
    EventName.DisconnectWallet,
  );

  const {signMessage, isConnected} = useConnectWallet({
    messageSignedOrderAttributionMode: 'ignoreErrors',
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
    onDisconnect: () => {
      disconnectWallet({});
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
  }, [
    requestWalletVerificationResponse?.verification?.message,
    requestWalletVerificationResponse?.verification?.generatedAt,
  ]);

  const _TokengateComponent = (
    <Tokengate
      connectButton={<ConnectButton />}
      isLoading={serverArguments?.initialState.isLoading}
      isConnected={isConnected}
      reaction={{
        type: 'exclusive_access',
      }}
      requirements={adaptRequirements(
        serverArguments?.initialState.gateRequirement,
      )}
      unlockingTokens={adaptUnlockingTokens(
        checkIfWalletMeetsRequirementsResponse?.unlockingTokens,
      )}
    />
  );

  if (isDev) {
    return <Preview>{_TokengateComponent}</Preview>;
  }

  return _TokengateComponent;
}

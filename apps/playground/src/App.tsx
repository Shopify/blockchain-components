import {ConnectButton, Wallet, useConnectWallet} from '@shopify/connect-wallet';
import {
  Tokengate,
  adaptRequirements,
  adaptUnlockingTokens,
} from '@shopify/tokengate';

import './DawnVariables.css';
import {Preview} from './style';
import {
  EventName,
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

  const {wallet} = useConnectWallet({
    onConnect: (response) => {
      // This is a good place to utilize toasts and inform the user
      // that their connection was established as expected or run
      // gate check logic.
      checkIfWalletMeetsRequirements({
        address: response.address,
        message: response.message,
        signature: response.signature,
      });
    },
    onDisconnect: () => {
      disconnectWallet({});
    },
  });

  const _TokengateComponent = (
    <Tokengate
      connectButton={<ConnectButton />}
      isLoading={serverArguments?.initialState.isLoading}
      isConnected={Boolean(wallet)}
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

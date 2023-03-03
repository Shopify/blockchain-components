/* eslint-disable no-nested-ternary */
import {ConnectButton, Wallet, useConnectWallet} from '@shopify/connect-wallet';
import {
  Gate,
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

  const isConnected = Boolean(wallet);
  const isUnlocked =
    wallet?.address.toLowerCase() ===
    '0x81afab294Ee6Ad6c62d0f7E58057216FbB2E197c'.toLowerCase();

  const {title, subtitle} =
    isConnected && isUnlocked
      ? {
          title: `You're In`,
          subtitle: (
            <>
              You can <b>buy up to 4</b>
            </>
          ),
        }
      : {
          title: 'Exclusive product!',
          subtitle: `On the allow list? You're in!`,
        };

  const _TokengateComponent = (
    <Gate title={title} subtitle={subtitle}>
      <Gate.Conditions>
        {isConnected ? (
          isUnlocked ? null : (
            <Gate.Condition
              title="You're not on the list!"
              subtitle=""
              badge={Gate.Badges.InvalidCondition}
            />
          )
        ) : (
          <Gate.Condition
            title="Best wallet holders"
            subtitle="Optional description"
          />
        )}
      </Gate.Conditions>
      <ConnectButton />
    </Gate>
  );

  if (isDev) {
    return <Preview>{_TokengateComponent}</Preview>;
  }

  return _TokengateComponent;
}

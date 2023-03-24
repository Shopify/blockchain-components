/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {useCallback, useState} from 'react';
import {ConnectButton, useConnectWallet} from '@shopify/connect-wallet';
import {Tokengate, UnlockingToken} from '@shopify/tokengate';

import {checkIfWalletMeetsRequirements, requirements} from '../fixtures';

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [userTokens, setUserTokens] = useState<UnlockingToken[]>([]);

  const onConnectCallback = useCallback(() => {
    setLoading(true);

    checkIfWalletMeetsRequirements()
      .then((tokens) => {
        setUserTokens(tokens);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          `Error while checking if wallet meets requirements: ${error}`,
        );
      });
  }, []);

  const {wallet} = useConnectWallet({
    onConnect: () => onConnectCallback(),
    onDisconnect: () => setUserTokens([]),
  });

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
      <h1>Welcome to Remix</h1>

      <div style={{width: '400px', margin: '0 auto'}}>
        <Tokengate
          connectButton={<ConnectButton />}
          isConnected={Boolean(wallet)}
          isLoading={loading}
          requirements={requirements}
          unlockingTokens={userTokens}
        />
      </div>
    </div>
  );
}

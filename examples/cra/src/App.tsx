import {useCallback, useState} from 'react';
import {ConnectButton, useConnectWallet} from '@shopify/connect-wallet';
import {Tokengate, UnlockingToken} from '@shopify/tokengate';

import {checkIfWalletMeetsRequirements, requirements} from './fixtures';
import logo from './logo.svg';
import './App.css';

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div style={{width: '400px'}}>
          <Tokengate
            connectButton={<ConnectButton />}
            isConnected={Boolean(wallet)}
            isLoading={loading}
            requirements={requirements}
            unlockingTokens={userTokens}
          />
        </div>
      </header>
    </div>
  );
}

export default App;

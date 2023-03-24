/* eslint-disable @shopify/images-no-direct-imports */
/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {useCallback, useState} from 'react';
import {ConnectButton, useConnectWallet} from '@shopify/connect-wallet';
import {Tokengate, UnlockingToken} from '@shopify/tokengate';

import {checkIfWalletMeetsRequirements, requirements} from './fixtures';
import reactLogo from './assets/react.svg';
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
      <>
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </>

      <h1>Vite + React</h1>
      <div className="card">
        <Tokengate
          connectButton={<ConnectButton />}
          isConnected={Boolean(wallet)}
          isLoading={loading}
          requirements={requirements}
          unlockingTokens={userTokens}
        />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

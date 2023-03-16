/* eslint-disable @shopify/images-no-direct-imports */
/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {ConnectButton} from '@shopify/connect-wallet';

import reactLogo from './assets/react.svg';
import './App.css';

function App() {
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
        <ConnectButton />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {ConnectButton} from '@shopify/connect-wallet';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div style={{width: '200px'}}>
          <ConnectButton />
        </div>
      </header>
    </div>
  );
}

export default App;

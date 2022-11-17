import './App.css';
import {Card} from './components/Card/Card';

interface AppProps {
  state?: string | null;
}
function App({state}: AppProps) {
  return (
    <div className="App">
      {state === 'locked' ? (
        <Card>
          <h2>Holder exclusive</h2>
          <p>To unlock this product, you need:</p>
          <button
            id="connectWallet"
            type="button"
            className="button button--full-width"
          >
            Connect wallet
          </button>
        </Card>
      ) : (
        <Card>
          <h2>Exclusive unlocked</h2>
          <p>Your token got you access to this product!</p>
          <button
            id="connectWallet"
            type="button"
            className="button button--full-width"
          >
            snowdevil.eth
          </button>
        </Card>
      )}
    </div>
  );
}

export default App;

import {Card} from '../Card/Card';
import {ThemeProvider} from 'shared';

interface AppProps {
  state?: string | null;
}
const TokengatingCard = ({state}: AppProps) => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export {TokengatingCard};

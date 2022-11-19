import {TokengatingCard} from '@shopify/tokengating-card';

interface AppProps {
  serverArguments?: any;
}
function App({serverArguments}: AppProps) {
  return <TokengatingCard />;
}

export default App;

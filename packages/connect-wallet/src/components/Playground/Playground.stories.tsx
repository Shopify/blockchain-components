import {WagmiConfig, configureChains, createClient} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

import {ConnectWalletProvider} from '../../providers/ConnectWalletProvider';
import {getDefaultConnectors} from '../../connectors/getDefaultConnectors';
import {ConnectButton} from '..';

const PlaygroundStory = {
  title: 'Connect Wallet',
  component: WagmiConfig,
  argTypes: {
    wallets: {
      control: {type: 'select'},
      options: ['Ethereum'],
    },
  },
};

export default PlaygroundStory;

const Template = ({wallets}: {wallets: 'Ethereum' | 'Solana'}) => {
  const chains = wallets === 'Ethereum' ? [mainnet] : [];
  const {provider, webSocketProvider} = configureChains(chains, [
    publicProvider(),
  ]);

  const {connectors} = getDefaultConnectors({chains});

  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={client}>
      <ConnectWalletProvider chains={chains}>
        <ConnectButton />
      </ConnectWalletProvider>
    </WagmiConfig>
  );
};

export const Playground = Template.bind({
  wallets: 'Ethereum',
});

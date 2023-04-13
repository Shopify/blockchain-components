import type {Meta, StoryObj} from '@storybook/react';
import {WagmiConfig, configureChains, createClient} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import {buildConnectors} from '../../connectors/buildConnectors';
import {ConnectWalletProvider} from '../../providers/ConnectWalletProvider';
import {ConnectButton} from '..';

interface TemplateProps {
  wallets: 'Ethereum' | 'Solana';
  connectScreenHeader?: string;
}

const Component = ({wallets, connectScreenHeader}: TemplateProps) => {
  const chains = wallets === 'Ethereum' ? [mainnet] : [];
  const {provider, webSocketProvider} = configureChains(chains, [
    publicProvider(),
  ]);

  const {connectors, wagmiConnectors} = buildConnectors({chains});

  const client = createClient({
    autoConnect: true,
    connectors: wagmiConnectors,
    provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={client}>
      <ConnectWalletProvider
        chains={chains}
        connectors={connectors}
        customTitles={{connectScreenHeader}}
      >
        <ConnectButton />
      </ConnectWalletProvider>
    </WagmiConfig>
  );
};

const PlaygroundStory: Meta<TemplateProps> = {
  title: 'Connect Wallet',
  component: Component,
};

type Story = StoryObj<TemplateProps>;

export const Playground: Story = {
  args: {
    wallets: 'Ethereum',
    connectScreenHeader: 'Connect Wallet',
  },
  argTypes: {
    wallets: {
      control: 'select',
      options: ['Ethereum'],
    },
  },
  render: (args) => {
    return <Component {...args} />;
  },
};

export default PlaygroundStory;

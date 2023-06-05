import type {Meta, StoryObj} from '@storybook/react';
import {WagmiConfig, configureChains, createConfig} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

import {ConnectButton} from '../ConnectButton';

import {buildConnectors} from '~/connectors/buildConnectors';
import {ConnectWalletProvider} from '~/providers/ConnectWalletProvider';

interface TemplateProps {
  wallets: 'Ethereum' | 'Solana';
  connectScreenHeader?: string;
}

const Component = ({wallets, connectScreenHeader}: TemplateProps) => {
  const chains = wallets === 'Ethereum' ? [mainnet] : [];
  const {publicClient, webSocketPublicClient} = configureChains(chains, [
    publicProvider(),
  ]);

  const {connectors, wagmiConnectors} = buildConnectors({chains});

  const client = createConfig({
    autoConnect: true,
    connectors: wagmiConnectors,
    publicClient,
    webSocketPublicClient,
  });

  return (
    <WagmiConfig config={client}>
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

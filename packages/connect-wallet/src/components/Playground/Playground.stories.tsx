/* eslint-disable @shopify/jsx-no-hardcoded-content */
import type {Meta, StoryObj} from '@storybook/react';
import {Text} from 'shared';
import {WagmiConfig, configureChains, createConfig} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

import {ConnectButton} from '../ConnectButton';

import {buildConnectors} from '~/connectors/buildConnectors';
import {ConnectWalletProvider} from '~/providers/ConnectWalletProvider';

interface TemplateProps {
  connectScreenHeader?: string;
  walletConnectProjectId?: string;
  wallets: 'Ethereum' | 'Solana';
}

const Component = ({
  connectScreenHeader,
  walletConnectProjectId,
  wallets,
}: TemplateProps) => {
  const chains = wallets === 'Ethereum' ? [mainnet] : [];
  const {publicClient, webSocketPublicClient} = configureChains(chains, [
    publicProvider(),
  ]);

  if (!walletConnectProjectId) {
    return (
      <Text>
        No WalletConnect{' '}
        <code className="inline-block sbc-border sbc-rounded-button-small sbc-bg-button-secondary-hover sbc-px-1 sbc-py-1 sbc-border-button-secondary">
          projectId
        </code>{' '}
        provided
      </Text>
    );
  }

  const {connectors, wagmiConnectors} = buildConnectors({
    chains,
    projectId: walletConnectProjectId,
  });

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

const WALLET_CONNECT_PROJECT_ID = import.meta.env
  .STORYBOOK_WALLET_CONNECT_PROJECT_ID;

export const Playground: Story = {
  args: {
    connectScreenHeader: 'Connect Wallet',
    walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
    wallets: 'Ethereum',
  },
  argTypes: {
    walletConnectProjectId: {
      table: {
        disable: true,
      },
    },
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

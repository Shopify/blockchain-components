import type {Meta, StoryObj} from '@storybook/react';
import type {ThemeProps} from 'shared';
import {WagmiConfig, configureChains, createClient} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';

import {getDefaultConnectors} from '../../connectors/getDefaultConnectors';
import {ConnectWalletProvider} from '../../providers/ConnectWalletProvider';
import {ConnectButton} from '..';

type ProviderThemeType = ThemeProps['theme'];

interface TemplateProps {
  theme: ProviderThemeType;
  wallets: 'Ethereum' | 'Solana';
}

const Component = ({theme, wallets}: TemplateProps) => {
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
      <ConnectWalletProvider chains={chains} theme={theme}>
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
  },
  argTypes: {
    wallets: {
      control: 'select',
      options: ['Ethereum'],
    },
  },
  render: (args, {globals: {theme}}) => {
    return <Component {...args} theme={theme} />;
  },
};

export default PlaygroundStory;

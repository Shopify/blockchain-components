import {PropsWithChildren} from 'react';
import {WagmiConfig} from 'wagmi';

import {createWagmiFixture} from './fixtures/wagmi';

import {ConnectWalletProvider} from '~/providers/ConnectWalletProvider';
import type {ProviderProps} from '~/providers/ConnectWalletProvider';

export type PackageContextProps = ProviderProps & {
  config: ReturnType<typeof createWagmiFixture>['config'];
};

export const PackageContext = ({
  children,
  config,
  ...props
}: PropsWithChildren<PackageContextProps>) => {
  return (
    <WagmiConfig config={config}>
      <ConnectWalletProvider {...props}>{children}</ConnectWalletProvider>
    </WagmiConfig>
  );
};

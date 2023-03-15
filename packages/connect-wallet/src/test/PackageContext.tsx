import {PropsWithChildren} from 'react';
import {WagmiConfig} from 'wagmi';

import {ConnectWalletProvider} from '../providers/ConnectWalletProvider';
import type {ProviderProps} from '../providers/ConnectWalletProvider';

import {createWagmiFixture} from './fixtures/wagmi';

export type PackageContextProps = ProviderProps & {
  client: ReturnType<typeof createWagmiFixture>['client'];
};

export const PackageContext = ({
  children,
  client,
  ...props
}: PropsWithChildren<PackageContextProps>) => {
  return (
    <WagmiConfig client={client}>
      <ConnectWalletProvider {...props}>{children}</ConnectWalletProvider>
    </WagmiConfig>
  );
};

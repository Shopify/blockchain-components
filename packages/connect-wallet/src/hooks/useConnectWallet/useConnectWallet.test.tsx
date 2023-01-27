import {renderHook} from '@testing-library/react';
import React, {PropsWithChildren, useMemo} from 'react';

import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {ModalContext, ModalRoute} from '../../providers/ModalProvider';
import {ConnectionState} from '../../types/connectionState';
import {useOrderAttribution} from '../useOrderAttribution';

import {useConnectWallet} from './useConnectWallet';

jest.mock('wagmi', () => {
  return {
    useAccount: jest.fn(() => ({
      isConnecting: true,
    })),
  };
});

jest.mock('@wagmi/core', () => {
  return {
    Chain: jest.fn(),
  };
});

jest.mock('../../providers/ModalProvider', () => {
  return {
    ModalContext: jest.requireActual('../../providers/ModalProvider/context')
      .ModalContext,
  };
});

jest.mock('../../providers/ConnectWalletProvider', () => {
  const actual = jest.requireActual(
    '../../providers/ConnectWalletProvider/context',
  );
  return {
    ConnectWalletContext: actual.ConnectWalletContext,
  };
});

jest.mock('../useOrderAttribution', () => ({
  useOrderAttribution: jest.fn(),
}));

jest.mock('../useAppState', () => ({
  useAppSelector: jest.fn(() => ({
    connectedWallets: [],
    pendingConnector: null,
  })),
}));

jest.mock('../useDisconnect', () => ({
  useDisconnect: jest.fn(() => ({
    disconnect: jest.fn(),
  })),
}));

jest.mock('./useConnectWalletCallbacks', () => ({
  useConnectWalletCallbacks: jest.fn(() => ({})),
}));

describe('useConnectWallet', () => {
  describe('when messageSignedOrderAttributionMode is disabled', () => {
    it('does not call useOrderAttribution callback', async () => {
      const {callback} = mockUseOrderAttribution();
      const current = renderUseConnectWallet({
        messageSignedOrderAttributionMode: 'disabled',
      });

      await current.signMessage({message: 'abc'});

      expect(callback).not.toHaveBeenCalled();
    });
  });
});

function mockUseOrderAttribution(
  callback: ReturnType<typeof useOrderAttribution> = jest.fn(),
) {
  (
    useOrderAttribution as jest.MockedFunction<typeof useOrderAttribution>
  ).mockImplementation(() => callback);
  return {callback};
}

function renderUseConnectWallet(
  props?: Parameters<typeof useConnectWallet>[0],
) {
  const {result} = renderHook(() => useConnectWallet(props), {
    wrapper: TestProvider,
  });
  return result.current;
}

const TestProvider: React.FC<PropsWithChildren<object>> = ({children}) => {
  const connectWalletProviderValue = useMemo(() => ({chains: []}), []);
  const modalProviderValue = useMemo(
    () => ({
      active: false,
      clearError: () => {},
      closeModal: () => {},
      connect: () => {},
      connectionStatus: 'Connecting' as ConnectionState,
      navigation: {
        navigate: () => {},
        route: 'Connect' as ModalRoute,
      },
      openModal: () => {},
      signing: false,
      signMessage: () =>
        Promise.resolve({address: '0x123', message: 'abc', signature: '0x123'}),
    }),
    [],
  );
  return (
    <ConnectWalletContext.Provider value={connectWalletProviderValue}>
      <ModalContext.Provider value={modalProviderValue}>
        {children}
      </ModalContext.Provider>
    </ConnectWalletContext.Provider>
  );
};

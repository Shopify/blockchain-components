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
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('when messageSignedOrderAttributionMode is disabled', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('does not call useOrderAttribution callback', () => {
      const {callback} = mockUseOrderAttribution();
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

// Ignoring this for now so it can be copied over to reference in test utils in another PR.
// @ts-ignore-next-line
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
      requestSignature: () =>
        Promise.resolve({
          address: '0x123',
          message: 'abc',
          nonce: '123',
          signature: '0x123',
        }),
      signing: false,
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

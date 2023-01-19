import {renderHook} from '@testing-library/react';
import React, {PropsWithChildren, useMemo} from 'react';

import {ConnectWalletContext} from '../providers/ConnectWalletProvider';
import {SignatureContext} from '../providers/SignatureProvider';

import {useConnectWallet} from './useConnectWallet';
import {useOrderAttribution} from './useOrderAttribution';

jest.mock('@wagmi/core', () => {
  return {
    Chain: jest.fn(),
  };
});

jest.mock('../providers/SignatureProvider', () => {
  return {
    SignatureContext: jest.requireActual(
      '../providers/SignatureProvider/context',
    ).SignatureContext,
  };
});

jest.mock('../providers/ConnectWalletProvider', () => {
  const actual = jest.requireActual(
    '../providers/ConnectWalletProvider/context',
  );
  return {
    ConnectWalletContext: actual.ConnectWalletContext,
  };
});

jest.mock('./useOrderAttribution', () => ({
  useOrderAttribution: jest.fn(),
}));

jest.mock('./useAppState', () => ({
  useAppSelector: jest.fn(() => ({
    connectedWallets: [],
    pendingConnector: null,
  })),
}));

jest.mock('./useWallet', () => ({
  useWallet: jest.fn(() => ({
    connection: false,
  })),
}));

jest.mock('./useDisconnect', () => ({
  useDisconnect: jest.fn(() => ({
    disconnect: jest.fn(),
  })),
}));

describe('useConnectWallet', () => {
  it('uses the useOrderAttribution hook', () => {
    renderHook(() => useConnectWallet(), {wrapper: TestProvider});
    expect(useOrderAttribution).toHaveBeenCalledTimes(1);
  });

  describe('when messageSignedOrderAttributionMode is required', () => {
    it('propogates promise rejection in the useOrderAttribution callback', async () => {
      mockUseOrderAttribution(getPromiseRejectionCallback());
      const current = renderUseConnectWallet({
        messageSignedOrderAttributionMode: 'required',
      });

      const execute = () => current.signMessage({message: 'abc'});

      await expect(execute).rejects.toThrow(rejectionCallbackMessage);
    });
  });

  describe('when messageSignedOrderAttributionMode is ignoreErrors', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterAll(() => {
      (console.error as jest.Mock).mockRestore();
    });

    it('ignores promise rejection in the useOrderAttribution callback', async () => {
      const {callback} = mockUseOrderAttribution(getPromiseRejectionCallback());
      const current = renderUseConnectWallet({
        messageSignedOrderAttributionMode: 'ignoreErrors',
      });

      await current.signMessage({message: 'abc'});

      expect(callback).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('when messageSignedOrderAttributionMode is default (not specified)', () => {
    it('calls the useOrderAttribution callback', async () => {
      const {callback} = mockUseOrderAttribution();
      const current = renderUseConnectWallet({
        messageSignedOrderAttributionMode: 'required',
      });

      await current.signMessage({message: 'abc'});

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

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

const rejectionCallbackMessage = 'Some error';

function getPromiseRejectionCallback() {
  return jest.fn(() => Promise.reject(new Error(rejectionCallbackMessage)));
}

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
  const signatureProviderValue = useMemo(
    () => ({
      signing: false,
      signMessage: () =>
        Promise.resolve({address: '0x123', message: 'abc', signature: '0x123'}),
    }),
    [],
  );
  return (
    <ConnectWalletContext.Provider value={connectWalletProviderValue}>
      <SignatureContext.Provider value={signatureProviderValue}>
        {children}
      </SignatureContext.Provider>
    </ConnectWalletContext.Provider>
  );
};

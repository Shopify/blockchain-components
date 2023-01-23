import {useCallback} from 'react';

import {SheetContent} from '../style';
import {ConnectorButton} from '../../ConnectorButton';
import {useAppDispatch} from '../../../hooks/useAppState';
import {useWalletConnectDeeplink} from '../../../hooks/useWalletConnectDeeplink';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {setPendingConnector} from '../../../slices/walletSlice';
import {ConnectArgs, Connector} from '../../../types/connector';
import {getBrowserInfo} from '../../../utils/getBrowser';
import {isInstalled} from '../../../utils/isInstalled';

interface ConnectScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  connectors: Connector[];
}

const ConnectScreen = ({connect, connectors}: ConnectScreenProps) => {
  const dispatch = useAppDispatch();
  const {closeModal, navigation} = useModal();
  const {connectUsingWalletConnect} = useWalletConnectDeeplink();

  const {mobilePlatform} = getBrowserInfo();

  const handleConnect = useCallback(
    (connector: Connector) => {
      const {
        connector: wagmiConnector,
        desktopAppLink,
        id,
        marketingSite,
        mobileAppPrefixes,
        name,
        qrCodeSupported,
      } = connector;

      /**
       * This is destructured intentionally.
       *
       * With Redux we cannot store non-serialized data, meaning that
       * anything which is constructed (e.g. a Connector from Wagmi)
       */
      dispatch(
        setPendingConnector({
          desktopAppLink,
          id,
          marketingSite,
          mobileAppPrefixes,
          name,
          qrCodeSupported,
        }),
      );

      connect({connector: wagmiConnector});

      const isWagmiWalletConnect = wagmiConnector.id === 'walletConnect';
      const isWalletConnect =
        connector.id === 'walletConnect' && isWagmiWalletConnect;

      /**
       * We need to take the user to the scan screen under some rather specific
       * conditions. That is, the user is connecting with a WalletConnect connector
       * and is not on mobile OR if the user is connecting with Coinbase but doesn't
       * have the Coinbase extension installed and isn't on a mobile device.
       */
      const shouldUseCoinbaseScanScreen =
        wagmiConnector.id === 'coinbaseWallet' && !isInstalled('Coinbase');

      const shouldUseScanScreen =
        id !== 'ledger' &&
        (isWagmiWalletConnect || shouldUseCoinbaseScanScreen) &&
        !mobilePlatform;

      if (shouldUseScanScreen) {
        navigation.navigate(ModalRoute.Scan);
        return;
      }

      /**
       * If the user chooses Ledger (when we're using Ledger Connect Kit)
       * or WalletConnect and is on mobile close the modal to prevent
       * stacked modals.
       */
      const shouldCloseModal = isWalletConnect && mobilePlatform;

      if (shouldCloseModal) {
        closeModal();
        return;
      }

      /**
       * Check if this connector is using WalletConnect under the hood
       */
      if (connector.id !== 'walletConnect' && isWagmiWalletConnect) {
        connectUsingWalletConnect(connector);
      }

      navigation.navigate(ModalRoute.Connecting);
    },
    [
      closeModal,
      connect,
      connectUsingWalletConnect,
      dispatch,
      mobilePlatform,
      navigation,
    ],
  );

  return (
    <SheetContent rowGap="12px">
      {connectors.map((providedConnector) => {
        const {connector, id, name} = providedConnector;

        if (!connector.ready && !mobilePlatform) {
          return null;
        }

        return (
          <ConnectorButton
            id={id}
            key={id}
            onClick={() => handleConnect(providedConnector)}
            name={name}
          />
        );
      })}
    </SheetContent>
  );
};

export default ConnectScreen;

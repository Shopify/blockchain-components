/* eslint-disable @typescript-eslint/no-misused-promises */
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

  const {mobilePlatform} = getBrowserInfo();
  const {setKey} = useWalletConnectDeeplink();

  const handleConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/require-await
    async (connector: Connector) => {
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

      const isLedgerConnector = connector.id === 'ledger';
      const isLedgerUsingWalletConnect =
        isLedgerConnector && wagmiConnector.id === 'walletConnect';
      const isWagmiWalletConnect = wagmiConnector.id === 'walletConnect';
      const isWalletConnect =
        connector.id === 'walletConnect' && isWagmiWalletConnect;

      // This should only be entered if the user is using Ledger via WalletConnect.
      if (isLedgerUsingWalletConnect) {
        wagmiConnector.on('message', async () => {
          try {
            const {uri} = (await wagmiConnector.getProvider()).connector;

            const deeplinkUri = `${desktopAppLink}${encodeURIComponent(uri)}`;

            /**
             * There is a slight UX gap here where if the user is on Desktop
             * and doesn't have Ledger Live installed then the deeplink will fail
             * to open. Unfortunately there is not a good way to detect custom
             * app protocols in the browser that isn't a hack.
             */
            window.open(deeplinkUri, '_self');
            navigation.navigate(ModalRoute.Connecting);
            return;
          } catch (exception) {
            console.error(
              'Caught exception while attempting to retrieve URI for WalletConnect connector',
            );
          }
        });
      }

      /**
       * We need to take the user to the scan screen under some rather specific
       * conditions. That is, the user is connecting with a WalletConnect connector
       * and is not on mobile OR if the user is connecting with Coinbase but doesn't
       * have the Coinbase extension installed and isn't on a mobile device.
       */
      const shouldUseCoinbaseScanScreen =
        wagmiConnector.id === 'coinbaseWallet' && !isInstalled('Coinbase');

      const shouldUseScanScreen =
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

      // Check for a mobile URI prefix.
      const prefix =
        mobileAppPrefixes?.[mobilePlatform === 'Android' ? 'Android' : 'iOS'];

      /**
       * Check if this connector is using WalletConnect under the hood and
       * whether or not we have a prefix / mobile app available for the platform.
       */
      if (
        connector.id !== 'walletConnect' &&
        isWagmiWalletConnect &&
        mobilePlatform &&
        prefix !== undefined
      ) {
        wagmiConnector.on('message', async () => {
          try {
            const {uri} = (await wagmiConnector.getProvider()).connector;

            const encodedUri =
              mobilePlatform === 'Android' ? uri : encodeURIComponent(uri);

            const deeplinkUri = `${prefix}${encodedUri}`;

            setKey({href: deeplinkUri, name: connector.name});

            if (deeplinkUri.startsWith('http')) {
              const link = document.createElement('a');
              link.href = deeplinkUri;
              link.target = '_blank';
              link.rel = 'noreferrer noopener';
              link.click();
            } else {
              window.location.href = deeplinkUri;
            }
          } catch (error) {
            console.error(
              'Caught exception while attempting to retrieve URI for mobile WC connector',
            );
          }
        });
      }

      navigation.navigate(ModalRoute.Connecting);
    },
    [closeModal, connect, dispatch, mobilePlatform, navigation, setKey],
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

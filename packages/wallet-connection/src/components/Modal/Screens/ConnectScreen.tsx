/* eslint-disable @typescript-eslint/no-misused-promises */
import {useCallback} from 'react';
import {useI18n} from '@shopify/react-i18n';

import {SheetContent, StyledLink} from '../style';
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
  const [i18n] = useI18n();

  const {mobilePlatform} = getBrowserInfo();
  const {setKey} = useWalletConnectDeeplink();

  const handleConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/require-await
    async (connector: Connector) => {
      const {
        browserExtensions,
        connector: wagmiConnector,
        id,
        mobileApps,
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
          browserExtensions,
          id,
          mobileAppPrefixes,
          mobileApps,
          name,
          qrCodeSupported,
        }),
      );

      connect({connector: wagmiConnector});

      /**
       * We need to take the user to the scan screen under some rather specific
       * conditions. That is, the user is connecting with a WalletConnect connector
       * and is not on mobile or if the user is connecting with Coinbase and doesn't
       * have the Coinbase app installed.
       */
      const shouldUseScanScreen =
        (wagmiConnector.id === 'walletConnect' && !mobilePlatform) ||
        (wagmiConnector.id === 'coinbaseWallet' && !isInstalled('Coinbase'));

      if (shouldUseScanScreen) {
        navigation.navigate(ModalRoute.Scan);
        return;
      }

      /**
       * If the user chooses WalletConnect on mobile, close the modal
       * so we're not stacking modals.
       */
      if (
        connector.id === 'walletConnect' &&
        wagmiConnector.id === 'walletConnect' &&
        mobilePlatform
      ) {
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
        wagmiConnector.id === 'walletConnect' &&
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

  const handleWhatAreWallets = useCallback(() => {
    navigation.navigate(ModalRoute.WhatAreWallets);
  }, [navigation]);

  return (
    <SheetContent>
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

      <StyledLink
        aria-label={i18n.translate('modalScreens.ConnectScreen.whatIsAWallet')}
        role="link"
        onClick={handleWhatAreWallets}
      >
        {i18n.translate('modalScreens.ConnectScreen.whatIsAWallet')}
      </StyledLink>
    </SheetContent>
  );
};

export default ConnectScreen;

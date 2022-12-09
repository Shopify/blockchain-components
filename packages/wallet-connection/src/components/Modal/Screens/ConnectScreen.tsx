import {useCallback} from 'react';

import {ConnectArgs} from '@wagmi/core';

import {SheetContent, StyledLink} from '../style';
import {ConnectorButton} from '../../ConnectorButton';
import {useWalletConnectDeeplink} from '../../../hooks/useWalletConnectDeeplink';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {Connector} from '../../../types/connector';
import {getBrowserInfo} from '../../../utils/getBrowser';

interface ConnectScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  connectors: Connector[];
}

const ConnectScreen = ({connect, connectors}: ConnectScreenProps) => {
  const {setPendingConnector} = useWalletConnection();
  const {closeModal, navigation} = useModal();

  const {mobilePlatform} = getBrowserInfo();
  const {setKey} = useWalletConnectDeeplink();

  const handleConnect = useCallback(
    async (connector: Connector) => {
      setPendingConnector(connector);

      const {connector: wagmiConnector, mobileAppPrefixes} = connector;
      connect({connector: wagmiConnector});

      /**
       * If the user chooses a connector that is using WalletConnect
       * as the connector, take the user to the scan screen.
       */
      if (wagmiConnector.id === 'walletConnect' && !mobilePlatform) {
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
    [connect, mobilePlatform, navigation, setKey],
  );

  const handleWhatAreWallets = useCallback(() => {
    navigation.navigate(ModalRoute.WhatAreWallets);
  }, []);

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
        aria-label="What is a wallet?"
        role="link"
        onClick={handleWhatAreWallets}
      >
        What is a wallet?
      </StyledLink>
    </SheetContent>
  );
};

export default ConnectScreen;

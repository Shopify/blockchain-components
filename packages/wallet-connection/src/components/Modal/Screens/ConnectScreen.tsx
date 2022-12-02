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
  const {navigation} = useModal();

  const {mobilePlatform} = getBrowserInfo();
  const {setKey} = useWalletConnectDeeplink();

  const handleConnect = useCallback(
    async (connector: Connector) => {
      setPendingConnector(connector);

      const {connector: wagmiConnector, mobileAppPrefixes} = connector;
      connect({connector: wagmiConnector});

      if (wagmiConnector.id === 'walletConnect' && !mobilePlatform) {
        navigation.navigate(ModalRoute.Scan);
        return;
      }

      const prefix =
        mobileAppPrefixes?.[mobilePlatform === 'Android' ? 'Android' : 'iOS'];

      /**
       * Check if this connector is using WalletConnect
       * under the hood but is not the normal WalletConnect.
       */
      if (
        connector.id !== 'walletConnect' &&
        wagmiConnector.id === 'walletConnect' &&
        mobilePlatform &&
        prefix
      ) {
        wagmiConnector.on('message', async () => {
          try {
            const provider = await wagmiConnector.getProvider();

            const {uri} = provider.connector;
            console.log('uri', uri);

            const mobileUri = `${prefix}${uri}`;
            console.log('mobileUri', mobileUri);
            console.log('mobileUri', mobileUri.split('?')[0]);

            setKey({href: mobileUri, name: connector.name});

            window.location.href = mobileUri;
          } catch (error) {
            console.error(
              'Caught exception while attempting to retrieve URI for mobile WC connector',
            );
          }
        });

        return;
      }

      navigation.navigate(ModalRoute.Connecting);
    },
    [mobilePlatform, navigation],
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

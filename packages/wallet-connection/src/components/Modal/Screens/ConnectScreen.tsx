import {useCallback} from 'react';

import {ConnectArgs} from '@wagmi/core';

import {SheetContent, StyledLink} from '../style';
import {ConnectorButton} from '../../ConnectorButton';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {Connector} from '../../../types/connector';

interface ConnectScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  connectors: Connector[];
}

const ConnectScreen = ({connect, connectors}: ConnectScreenProps) => {
  const {setPendingConnector} = useWalletConnection();
  const {navigation} = useModal();

  const handleConnect = useCallback(
    (connector: Connector) => {
      setPendingConnector(connector);

      const {connector: wagmiConnector} = connector;
      connect({connector: wagmiConnector});

      if (wagmiConnector.id === 'walletConnect') {
        navigation.navigate(ModalRoute.Scan);
        return;
      }

      navigation.navigate(ModalRoute.Connecting);
    },
    [navigation],
  );

  const handleWhatAreWallets = useCallback(() => {
    navigation.navigate(ModalRoute.WhatAreWallets);
  }, []);

  return (
    <SheetContent>
      {connectors.map((providedConnector) => {
        const {connector, id, name} = providedConnector;

        if (!connector.ready) {
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

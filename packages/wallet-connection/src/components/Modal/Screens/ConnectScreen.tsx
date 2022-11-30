import {useCallback} from 'react';
import {Connector} from 'wagmi';
import {ConnectArgs} from '@wagmi/core';

import {SheetContent, StyledLink} from '../style';
import {ConnectorButton} from '../../ConnectorButton';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';

interface ConnectScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  connectors: Connector<any, any, any>[];
}

const ConnectScreen = ({connect, connectors}: ConnectScreenProps) => {
  const {setPendingConnector} = useWalletConnection();
  const {navigation} = useModal();

  const handleConnect = useCallback(
    (connector: Connector<any, any, any>) => {
      setPendingConnector(connector);
      if (connector.id === 'walletConnect') {
        navigation.navigate(ModalRoute.Scan);
        return;
      }

      connect({connector});
      navigation.navigate(ModalRoute.Connecting);
    },
    [navigation],
  );

  const handleWhatAreWallets = useCallback(() => {
    navigation.navigate(ModalRoute.WhatAreWallets);
  }, []);

  return (
    <SheetContent>
      {connectors.map((connector) => {
        if (!connector.ready) {
          return null;
        }

        return (
          <ConnectorButton
            key={connector.id}
            onClick={() => handleConnect(connector)}
            name={connector.name}
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

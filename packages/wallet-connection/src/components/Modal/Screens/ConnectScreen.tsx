import {useCallback} from 'react';
import {Connector, useConnect} from 'wagmi';

import {SheetContent} from '../style';
import {ConnectorButton} from '../../ConnectorButton';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';

const ConnectScreen = () => {
  const {setPendingConnector} = useWalletConnection();
  const {navigation} = useModal();
  const {connectAsync, connectors} = useConnect();

  const handleConnect = useCallback(
    (connector: Connector<any, any, any>) => {
      setPendingConnector(connector);
      connectAsync({connector});
      navigation.navigate(ModalRoute.Connecting);
    },
    [navigation],
  );

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
    </SheetContent>
  );
};

export default ConnectScreen;

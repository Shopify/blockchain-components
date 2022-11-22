import {ConnectArgs, ConnectResult, Provider} from '@wagmi/core';
import {useEffect, useMemo, useState} from 'react';
import {useConnect} from 'wagmi';

import {ModalContent} from './state-content';

import {BodyText, SheetContent} from '../style';
import {Button} from 'shared';
import {QRCode} from '../../QRCode';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {ConnectionState} from '../../../types/connectionState';

interface ScanScreenProps {
  connectAsync: (
    args?: Partial<ConnectArgs> | undefined,
  ) => Promise<ConnectResult<Provider>>;
  state: ConnectionState;
}

const ScanScreen = ({connectAsync, state}: ScanScreenProps) => {
  const {connectors} = useConnect();
  const {pendingConnector} = useWalletConnection();
  const [qrCodeURI, setQRCodeURI] = useState<string | undefined>();

  const {body} = ModalContent[state];

  const bodyContent = useMemo(() => {
    const isRelevantState = [
      ConnectionState.Connected,
      ConnectionState.Failed,
      ConnectionState.Rejected,
      ConnectionState.Unavailable,
    ];

    if (isRelevantState.includes(state)) {
      return <BodyText>{body}</BodyText>;
    }

    return null;
  }, [state]);

  const scanToConnect = async () => {
    if (!pendingConnector || qrCodeURI) {
      return;
    }

    if (pendingConnector.id === 'walletConnect') {
      pendingConnector.on('message', async () => {
        try {
          const provider = await pendingConnector.getProvider();

          setQRCodeURI(provider.connector.uri);

          // User rejected the request, regenerate the URI.
          provider.connector.on('disconnect', () => {
            connectAsync({connector: pendingConnector});
          });
        } catch (error) {
          console.error(
            'Caught exception while attempting to invoke the provider for given connector',
          );
          console.error(error);
        }
      });

      try {
        await connectAsync({connector: pendingConnector});
      } catch (exception) {
        console.log('WalletConnect cannot connect');
        console.log(exception);
      }
    }
  };

  const handleUseDefaultWalletConnect = async () => {
    // Make sure the WalletConnect connector is available in our current client instance.
    // At the moment this only refreshes the connector's uri.
    const connector = connectors.find(({id}) => id === 'walletConnect');

    if (!connector) {
      return;
    }

    await connectAsync({connector: connector});
  };

  useEffect(() => {
    if (!qrCodeURI) {
      scanToConnect();
    }
    // Exclude deps to prevent from regenerating URI numerous times on mount
  }, []);

  return (
    <SheetContent>
      {qrCodeURI ? <QRCode uri={qrCodeURI} /> : null}

      {bodyContent}

      <Button
        onClick={() => handleUseDefaultWalletConnect()}
        label="Use WalletConnect modal"
      />
    </SheetContent>
  );
};

export default ScanScreen;

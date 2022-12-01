import {ConnectArgs} from '@wagmi/core';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button} from 'shared';
import {useConnect} from 'wagmi';

import {ModalContent} from './state-content';

import {useConnectorDownloadLinks} from '../../../hooks/useConnectorDownloadLinks';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {QRCode} from '../../QRCode';
import {BodyText, ButtonContainer, SheetContent} from '../style';
import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

interface ScanScreenProps {
  connect: (args?: Partial<ConnectArgs> | undefined) => void;
  state: ConnectionState;
}

const ScanScreen = ({connect, state}: ScanScreenProps) => {
  const {connectors} = useConnect();
  const {pendingConnector} = useWalletConnection();
  const downloadButtons = useConnectorDownloadLinks();
  const [qrCodeURI, setQRCodeURI] = useState<string | undefined>();

  const {mobilePlatform} = getBrowserInfo();

  const {body} = ModalContent[state];

  const bodyContent = useMemo(() => {
    const isRelevantState = [
      ConnectionState.AlreadyConnected,
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

  const handleUseDefaultWalletConnect = () => {
    // Make sure the WalletConnect connector is available in our current client instance.
    // At the moment this only refreshes the connector's uri.
    const connector = connectors.find(({id}) => id === 'walletConnect');

    if (!connector) {
      return;
    }

    connect({connector});
  };

  const buttons = useMemo(() => {
    // We only want to show the wallet connect modal button if
    // the connector (not the wagmi connector) is wallet connect.
    const isWalletConnect = pendingConnector?.id === 'walletConnect';

    const walletConnectModalButton =
      isWalletConnect && !mobilePlatform ? (
        <Button
          onClick={handleUseDefaultWalletConnect}
          label="Use WalletConnect modal"
        />
      ) : null;

    return (
      <ButtonContainer>
        {downloadButtons}
        {walletConnectModalButton}
      </ButtonContainer>
    );
  }, [handleUseDefaultWalletConnect, mobilePlatform, pendingConnector]);

  const scanToConnect = useCallback(async () => {
    if (!pendingConnector || qrCodeURI || !pendingConnector?.qrCodeSupported) {
      return;
    }

    const {connector} = pendingConnector;

    if (connector.id === 'walletConnect') {
      connector.on('message', async () => {
        try {
          const provider = await connector.getProvider();

          setQRCodeURI(provider.connector.uri);

          // User rejected the request, regenerate the URI.
          provider.connector.on('disconnect', () => {
            connect({connector: connector});
          });
        } catch (error) {
          console.error(
            'Caught exception while attempting to invoke the provider for given connector',
          );
          console.error(error);
        }
      });

      try {
        connect({connector});
      } catch (exception) {
        console.error(exception);
      }
    }
  }, [connect, pendingConnector, qrCodeURI]);

  useEffect(() => {
    if (!qrCodeURI) {
      scanToConnect();
    }
    // Run once on mount -- no deps
  }, []);

  return (
    <SheetContent>
      {qrCodeURI ? <QRCode uri={qrCodeURI} /> : null}

      {bodyContent}

      {buttons}
    </SheetContent>
  );
};

export default ScanScreen;

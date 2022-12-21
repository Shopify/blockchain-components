import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button} from 'shared';
import {useConnect} from 'wagmi';
import {useI18n} from '@shopify/react-i18n';

import {useAppSelector} from '../../../hooks/useAppState';
import {useConnectorData} from '../../../hooks/useConnectorData';
import {useConnectorDownloadLinks} from '../../../hooks/useConnectorDownloadLinks';
import {useModalScreenContent} from '../../../hooks/useModalContent/useModalContent';
import {QRCode} from '../../QRCode';
import {BodyText, ButtonContainer, SheetContent} from '../style';
import {ConnectArgs} from '../../../types/connector';
import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

interface ScanScreenProps {
  connect: (args?: Partial<ConnectArgs> | undefined) => void;
  state: ConnectionState;
}

const ScanScreen = ({connect, state}: ScanScreenProps) => {
  const {connectors} = useConnect();
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connector} = useConnectorData({
    id: pendingConnector?.id,
  });
  const [i18n] = useI18n();
  const downloadButtons = useConnectorDownloadLinks();
  const [qrCodeURI, setQRCodeURI] = useState<string | undefined>();

  const {mobilePlatform} = getBrowserInfo();

  const {body} = useModalScreenContent(state);

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
  }, [body, state]);

  const handleUseDefaultWalletConnect = useCallback(() => {
    // Make sure the WalletConnect connector is available in our current client instance.
    // At the moment this only refreshes the connector's uri.
    const connector = connectors.find(({id}) => id === 'walletConnect');

    if (!connector) {
      return;
    }

    connect({connector});
  }, [connect, connectors]);

  const buttons = useMemo(() => {
    // We only want to show the wallet connect modal button if
    // the connector (not the wagmi connector) is wallet connect.
    const isWalletConnect = pendingConnector?.id === 'walletConnect';

    const walletConnectModalButton =
      isWalletConnect && !mobilePlatform ? (
        <Button
          onClick={handleUseDefaultWalletConnect}
          label={i18n.translate('modalScreens.ScanScreen.button')}
        />
      ) : null;

    return (
      <ButtonContainer>
        {downloadButtons}
        {walletConnectModalButton}
      </ButtonContainer>
    );
  }, [
    downloadButtons,
    handleUseDefaultWalletConnect,
    i18n,
    mobilePlatform,
    pendingConnector?.id,
  ]);

  // eslint-disable-next-line @typescript-eslint/require-await
  const scanToConnect = useCallback(async () => {
    if (
      !connector ||
      !pendingConnector ||
      qrCodeURI ||
      !pendingConnector.qrCodeSupported
    ) {
      return;
    }

    if (connector.id === 'coinbaseWallet') {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      connector.on('message', async () => {
        const provider = await connector.getProvider();
        setQRCodeURI(provider.qrUrl);
      });

      try {
        connect({connector});
      } catch (exception) {
        console.error(exception);
      }
    }

    if (connector.id === 'walletConnect') {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      connector.on('message', async () => {
        try {
          const provider = await connector.getProvider();

          setQRCodeURI(provider.connector.uri);

          // User rejected the request, regenerate the URI.
          provider.connector.on('disconnect', () => {
            connect({connector});
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
  }, [connect, connector, pendingConnector, qrCodeURI]);

  useEffect(() => {
    if (!qrCodeURI) {
      scanToConnect();
    }
    // Run once on mount -- no deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Text} from 'shared';

import {useAppSelector} from '../../../hooks/useAppState';
import {useConnectorData} from '../../../hooks/useConnectorData';
import {useConnectorDownloadLinks} from '../../../hooks/useConnectorDownloadLinks';
import {useModalScreenContent} from '../../../hooks/useModalContent';
import {useTranslation} from '../../../hooks/useTranslation';
import {useModal} from '../../../providers/ModalProvider';
import {QRCode} from '../../QRCode';
import {ButtonContainer, SheetContent} from '../style';
import {ConnectArgs} from '../../../types/connector';
import {ConnectionState} from '../../../types/connectionState';

interface ScanScreenProps {
  connect: (args?: Partial<ConnectArgs> | undefined) => void;
  state: ConnectionState;
}

const ScanScreen = ({connect, state}: ScanScreenProps) => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connector, modalConnector} = useConnectorData({
    id: pendingConnector?.id,
  });
  const downloadButtons = useConnectorDownloadLinks();
  const {closeModal} = useModal();
  const {body} = useModalScreenContent(state);
  const [qrCodeURI, setQRCodeURI] = useState<string | undefined>();
  const {t} = useTranslation('Screens');

  const bodyContent = useMemo(() => {
    const isRelevantState = [
      ConnectionState.AlreadyConnected,
      ConnectionState.Connected,
      ConnectionState.Failed,
      ConnectionState.Rejected,
      ConnectionState.Unavailable,
    ];

    if (isRelevantState.includes(state)) {
      return <Text as="p">{body}</Text>;
    }

    return null;
  }, [body, state]);

  const walletConnectModalButton = useMemo(() => {
    /**
     * Only want to show the wc modal button if the current
     * connector is walletConnect and we have a modalConnector
     */
    if (!connector || connector.id !== 'walletConnect' || !modalConnector) {
      return null;
    }

    const wcCallbackFn = () => {
      connect({connector: modalConnector});
      closeModal();
    };

    return <Button onClick={wcCallbackFn} label={t('Scan.button')} />;
  }, [closeModal, connect, connector, modalConnector, t]);

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

      <ButtonContainer>
        {downloadButtons}
        {walletConnectModalButton}
      </ButtonContainer>
    </SheetContent>
  );
};

export default ScanScreen;

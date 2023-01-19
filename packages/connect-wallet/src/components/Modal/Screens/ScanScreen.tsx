import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Text} from 'shared';

import {useAppSelector} from '../../../hooks/useAppState';
import {useConnectorData} from '../../../hooks/useConnectorData';
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
  const {connector, marketingSite, modalConnector, name} = useConnectorData({
    id: pendingConnector?.id,
  });
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

  const walletConnectModalCallback = useCallback(() => {
    if (!modalConnector) {
      return;
    }

    connect({connector: modalConnector});
    closeModal();
  }, [closeModal, connect, modalConnector]);

  const buttons = useMemo(() => {
    const hasGetProductButton = Boolean(marketingSite);
    const hasWalletConnectButton = Boolean(
      connector?.id === 'walletConnect' && modalConnector,
    );

    const hasButtons = hasGetProductButton || hasWalletConnectButton;

    if (!hasButtons) {
      return null;
    }

    return (
      <ButtonContainer>
        {hasGetProductButton ? (
          <Button
            aria-label={t('Scan.getProduct', {connectorName: name})}
            fullWidth
            label={t('Scan.getProduct', {connectorName: name})}
            link={{
              // TypeScript 🤦
              href: marketingSite!,
              target: '_blank',
            }}
            size="Lg"
          />
        ) : null}

        {hasWalletConnectButton ? (
          <Button
            aria-label={t('Scan.wcButton')}
            fullWidth
            label={t('Scan.wcButton')}
            onClick={walletConnectModalCallback}
            size="Lg"
          />
        ) : null}
      </ButtonContainer>
    );
  }, [
    connector?.id,
    marketingSite,
    modalConnector,
    name,
    t,
    walletConnectModalCallback,
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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button} from 'shared';

import {useAppSelector} from '../../../hooks/useAppState';
import {useConnectorData} from '../../../hooks/useConnectorData';
import {useTranslation} from '../../../hooks/useTranslation';
import {useModal} from '../../../providers/ModalProvider';
import {QRCode} from '../../QRCode';
import {ButtonContainer, SheetContent} from '../style';
import {cleanupConnection} from '../../../utils/cleanupConnection';

const ScanScreen = () => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connector, marketingSite, modalConnector, name, qrCodeSupported} =
    useConnectorData({
      id: pendingConnector?.id,
    });
  const {closeModal, connect} = useModal();
  const [qrCodeURI, setQRCodeURI] = useState<string | undefined>();
  const {t} = useTranslation('Screens');

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
  const retrieveURI = useCallback(async () => {
    /**
     * The logic in this function is quite similar to the logic seen
     * in useWalletConnectDeeplink. However, it differs in that this
     * doesn't open any urls, and instead utilizes the uri from the
     * connector for the QR Code generation.
     */
    if (!connector || qrCodeURI || !qrCodeSupported) {
      return;
    }

    /**
     * Coinbase doesn't emit any messages unless we explicitly call the
     * connect method here with the connector. I'm uncertain why since
     * connect is called on the screen prior to getting to this one.
     */
    if (connector.id === 'coinbaseWallet') {
      connect({connector});
    }

    /**
     * Guard numerous invocations to prevent from attaching numerous
     * event listeners to the same connector.
     */
    let invoked = false;

    try {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      connector.on('message', async () => {
        if (invoked) {
          return;
        }

        invoked = true;

        const provider = await connector.getProvider();

        setQRCodeURI(
          connector.id === 'coinbaseWallet'
            ? provider.qrUrl
            : provider.connector.uri,
        );

        /**
         * This will ensure that we create a new connection instance
         * when the user disconnects / cancels a connection attempt.
         */
        provider.connector?.on('disconnect', () => {
          connect({connector});
        });

        cleanupConnection(provider);
      });
    } catch (error) {
      console.error(
        `@shopify/connect-wallet: Error caught while attempting to generate QR URI.`,
        error,
      );
    }
  }, [connect, connector, qrCodeSupported, qrCodeURI]);

  useEffect(() => {
    if (!qrCodeURI) {
      retrieveURI();
    }
    // Run once on mount -- no deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SheetContent rowGap="16px">
      {qrCodeURI ? <QRCode uri={qrCodeURI} /> : null}

      {buttons}
    </SheetContent>
  );
};

export default ScanScreen;

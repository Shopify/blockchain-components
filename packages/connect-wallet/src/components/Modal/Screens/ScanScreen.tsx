import {eventNames} from '@shopify/blockchain-components';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button} from 'shared';

import {QRCode} from '../../QRCode';

import {useConnect, useConnectorData, useTranslation} from '~/hooks';
import {useStore} from '~/state';

const ScanScreen = () => {
  const [{closeModal}, {pendingConnector}] = useStore((state) => [
    state.modal,
    state.wallet,
  ]);
  const {connect} = useConnect();
  const {connector, marketingSite, modalConnector, name, qrCodeSupported} =
    useConnectorData({
      id: pendingConnector?.id,
    });
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
    const isWalletConnect = connector?.id === 'walletConnect';
    const hasGetProductButton = Boolean(marketingSite);
    const hasWalletConnectButton = Boolean(isWalletConnect && modalConnector);
    const hasButtons = hasGetProductButton || hasWalletConnectButton;

    if (!hasButtons) {
      return null;
    }

    return (
      <div className="sbc-flex sbc-flex-col sbc-items-center sbc-gap-y-3">
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
            onClickEventName={
              eventNames.CONNECT_WALLET_GET_WALLET_BUTTON_CLICKED
            }
            onClickEventPayload={{connector: name}}
            size="Lg"
          />
        ) : null}

        {hasWalletConnectButton ? (
          <Button
            aria-label={t('Scan.wcButton')}
            fullWidth
            label={t('Scan.wcButton')}
            onClick={walletConnectModalCallback}
            onClickEventName={
              eventNames.CONNECT_WALLET_USE_WALLET_BUTTON_CLICKED
            }
            size="Lg"
          />
        ) : null}
      </div>
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

        if (connector.id === 'coinbaseWallet') {
          setQRCodeURI(provider.qrUrl);
        } else {
          const uri = await new Promise<string>((resolve) =>
            provider.once('display_uri', resolve),
          );

          setQRCodeURI(uri);
        }

        /**
         * This will ensure that we create a new connection instance
         * when the user disconnects / cancels a connection attempt.
         */
        provider.connector?.on('disconnect', () => {
          connect({connector});
        });
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
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-gap-y-4 sbc-p-popover sbc-pt-0">
      <QRCode uri={qrCodeURI} />
      {buttons}
    </div>
  );
};

export default ScanScreen;

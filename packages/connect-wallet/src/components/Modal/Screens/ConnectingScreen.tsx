import {eventNames} from '@shopify/blockchain-components';
import {useCallback, useMemo} from 'react';
import {Button, Spinner, Text} from 'shared';

import {ConnectorIcon} from '../../ConnectorIcon';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppState';
import {useConnect} from '../../../hooks/useConnect';
import {useConnectorData} from '../../../hooks/useConnectorData';
import {useModalScreenContent} from '../../../hooks/useModalContent';
import {useTranslation} from '../../../hooks/useTranslation';
import {navigate} from '../../../slices/modalSlice';
import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

const ERROR_STATES: ConnectionState[] = ['Failed', 'Unavailable'];
const TRY_AGAIN_STATES: ConnectionState[] = ['Failed', 'Rejected'];

const ConnectingScreen = () => {
  const dispatch = useAppDispatch();
  const {connectionStatus} = useAppSelector((state) => state.modal);
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connect} = useConnect();
  const {connector, qrCodeSupported} = useConnectorData({
    id: pendingConnector?.id,
  });
  const {body, title} = useModalScreenContent(connectionStatus);
  const {t} = useTranslation('Screens');

  const isErrorState = ERROR_STATES.includes(connectionStatus);
  const canTryAgain = TRY_AGAIN_STATES.includes(connectionStatus);

  const {mobilePlatform} = getBrowserInfo();

  const handleUseQRCode = useCallback(() => {
    dispatch(navigate('Scan'));
  }, [dispatch]);

  const buttons = useMemo(() => {
    const hasButtons = canTryAgain || (!mobilePlatform && qrCodeSupported);

    if (!connector || !hasButtons || !pendingConnector) {
      return null;
    }

    return (
      <div className="sbc-flex sbc-flex-col sbc-items-center sbc-gap-y-3">
        {canTryAgain ? (
          <Button
            aria-label={t('button.retry')}
            className="sbc-w-full sm:sbc-w-fit"
            label={t('button.retry')}
            onClick={() => connect({connector})}
            onClickEventName={
              eventNames.CONNECT_WALLET_RETRY_CONNECTING_BUTTON_CLICKED
            }
          />
        ) : null}

        {!mobilePlatform && qrCodeSupported ? (
          <Button
            aria-label={t('Connecting.qrCode')}
            fullWidth
            label={t('Connecting.qrCode')}
            onClick={handleUseQRCode}
            onClickEventName={
              eventNames.CONNECT_WALLET_USE_QR_CODE_BUTTON_CLICKED
            }
            size="Lg"
          />
        ) : null}
      </div>
    );
  }, [
    canTryAgain,
    connect,
    connector,
    handleUseQRCode,
    mobilePlatform,
    pendingConnector,
    qrCodeSupported,
    t,
  ]);

  return (
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-gap-y-6 sbc-p-popover sbc-pt-6">
      <div className="sbc-mx-auto">
        <ConnectorIcon id={pendingConnector?.id} size="xl" />
      </div>

      <div className="sbc-block">
        <Text
          as="h3"
          className="sbc-mt-0 sbc-mb-2 sbc-text-center"
          variant="headingLg"
        >
          {title}
        </Text>

        <Text
          as="p"
          className="sbc-m-0 sbc-text-center"
          color={isErrorState ? 'critical' : 'secondary'}
        >
          {body}
        </Text>
      </div>

      {connectionStatus === 'Connecting' &&
      pendingConnector?.name !== 'WalletConnect' ? (
        <Spinner />
      ) : (
        buttons
      )}
    </div>
  );
};

export default ConnectingScreen;

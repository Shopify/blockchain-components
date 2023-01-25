import {useCallback, useMemo} from 'react';
import {Button, Spinner, Text} from 'shared';

import {ConnectorIcon} from '../../ConnectorIcon';
import {useAppSelector} from '../../../hooks/useAppState';
import {useConnectorData} from '../../../hooks/useConnectorData';
import {useModalScreenContent} from '../../../hooks/useModalContent';
import {useTranslation} from '../../../hooks/useTranslation';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {
  ButtonContainer,
  Center,
  ConnectingWalletIcon,
  SheetContent,
} from '../style';
import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

const ConnectingScreen = () => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connector, qrCodeSupported} = useConnectorData({
    id: pendingConnector?.id,
  });
  const {connect, connectionStatus, navigation} = useModal();
  const {body, title} = useModalScreenContent(connectionStatus);
  const {t} = useTranslation('Screens');

  const errorStates = [ConnectionState.Failed, ConnectionState.Unavailable];
  const tryAgainStates = [ConnectionState.Failed, ConnectionState.Rejected];
  const isErrorState = errorStates.includes(connectionStatus);
  const canTryAgain = tryAgainStates.includes(connectionStatus);

  const {mobilePlatform} = getBrowserInfo();

  const handleUseQRCode = useCallback(() => {
    navigation.navigate(ModalRoute.Scan);
  }, [navigation]);

  const buttons = useMemo(() => {
    const hasButtons = canTryAgain || (!mobilePlatform && qrCodeSupported);

    if (!connector || !hasButtons || !pendingConnector) {
      return null;
    }

    return (
      <ButtonContainer>
        {canTryAgain ? (
          <Button
            aria-label={t('button.retry')}
            label={t('button.retry')}
            onClick={() => connect({connector})}
          />
        ) : null}

        {!mobilePlatform && qrCodeSupported ? (
          <Button
            aria-label={t('Connecting.qrCode')}
            fullWidth
            label={t('Connecting.qrCode')}
            onClick={handleUseQRCode}
            size="Lg"
          />
        ) : null}
      </ButtonContainer>
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
    <SheetContent rowGap="24px">
      <ConnectingWalletIcon>
        <ConnectorIcon id={pendingConnector?.id} size="Xl" />
      </ConnectingWalletIcon>

      <Center>
        <Text as="h3" variant="headingLg">
          {title}
        </Text>

        <Text as="p" color={isErrorState ? 'critical' : 'secondary'}>
          {body}
        </Text>
      </Center>

      {connectionStatus === ConnectionState.Connecting &&
      pendingConnector?.name !== 'WalletConnect' ? (
        <Spinner />
      ) : (
        buttons
      )}
    </SheetContent>
  );
};

export default ConnectingScreen;

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
import {ConnectArgs} from '../../../types/connector';
import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

interface ConnectingScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  state: ConnectionState;
}

const ConnectingScreen = ({connect, state}: ConnectingScreenProps) => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connector, qrCodeSupported} = useConnectorData({
    id: pendingConnector?.id,
  });
  const {navigation} = useModal();
  const {t} = useTranslation('Screens');

  const {mobilePlatform} = getBrowserInfo();

  const canTryAgain =
    state === ConnectionState.Failed || state === ConnectionState.Rejected;

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
            aria-label={t('Connecting.retry')}
            label={t('Connecting.retry')}
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

  const {body, title} = useModalScreenContent(state);
  const isErrorState =
    state === ConnectionState.Failed || state === ConnectionState.Unavailable;

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

      {state === ConnectionState.Connecting &&
      pendingConnector?.name !== 'WalletConnect' ? (
        <Spinner />
      ) : (
        buttons
      )}
    </SheetContent>
  );
};

export default ConnectingScreen;

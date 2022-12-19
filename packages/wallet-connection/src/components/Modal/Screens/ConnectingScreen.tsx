import {useCallback, useMemo} from 'react';
import {Button, Spinner} from 'shared';

import {BodyText, ButtonContainer, ConnectorIcon, SheetContent} from '../style';
import {useConnectorData} from '../../../hooks/useConnectorData';
import {useConnectorDownloadLinks} from '../../../hooks/useConnectorDownloadLinks';
import {useModalScreenContent} from '../../../hooks/useModalScreenContent';
import {useAppSelector} from '../../../hooks/useAppState';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {ConnectArgs} from '../../../types/connector';
import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

interface ConnectingScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  state: ConnectionState;
}

const ConnectingScreen = ({connect, state}: ConnectingScreenProps) => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connector, icon} = useConnectorData({id: pendingConnector?.id});
  const {navigation} = useModal();
  const downloadButtons = useConnectorDownloadLinks();

  const {mobilePlatform} = getBrowserInfo();

  const canTryAgain =
    state === ConnectionState.Failed || state === ConnectionState.Rejected;

  const handleUseQRCode = useCallback(() => {
    navigation.navigate(ModalRoute.Scan);
  }, [navigation]);

  const buttons = useMemo(() => {
    if (!connector || !pendingConnector || !downloadButtons) {
      return null;
    }

    const {qrCodeSupported} = pendingConnector;

    return (
      <ButtonContainer>
        {canTryAgain ? (
          <Button onClick={() => connect({connector})} label="Try again" />
        ) : null}

        {!mobilePlatform && qrCodeSupported ? (
          <Button onClick={handleUseQRCode} label="Use QR code" />
        ) : null}

        {downloadButtons}
      </ButtonContainer>
    );
  }, [
    canTryAgain,
    connect,
    connector,
    downloadButtons,
    handleUseQRCode,
    mobilePlatform,
    pendingConnector,
  ]);

  const {body, title} = useModalScreenContent(state);

  return (
    <SheetContent>
      <ConnectorIcon>{icon}</ConnectorIcon>

      <h1>{title}</h1>

      <BodyText>{body}</BodyText>

      {state === ConnectionState.Connecting &&
      pendingConnector?.name !== 'WalletConnect' ? (
        <Spinner />
      ) : null}

      {buttons}
    </SheetContent>
  );
};

export default ConnectingScreen;

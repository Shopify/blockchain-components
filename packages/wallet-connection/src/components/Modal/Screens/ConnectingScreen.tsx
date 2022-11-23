import {ConnectArgs} from '@wagmi/core';
import {useCallback, useMemo} from 'react';

import {ModalContent} from './state-content';
import {Button} from 'shared';
import {BodyText, ButtonContainer, ConnectorIcon, SheetContent} from '../style';
import {Spinner} from '../../Spinner';
import {getConnectorData} from '../../../constants/connectors';
import {useConnectorDownloadLinks} from '../../../hooks/useConnectorDownloadLinks';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {ConnectionState} from '../../../types/connectionState';

interface ConnectingScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  state: ConnectionState;
}

const ConnectingScreen = ({connect, state}: ConnectingScreenProps) => {
  const {navigation} = useModal();
  const {pendingConnector} = useWalletConnection();
  const downloadButtons = useConnectorDownloadLinks(pendingConnector?.name);
  const {icon, qrCodeSupported} = getConnectorData(pendingConnector?.name);

  const canTryAgain =
    state === ConnectionState.Failed || state === ConnectionState.Rejected;

  const handleUseQRCode = useCallback(() => {
    navigation.navigate(ModalRoute.Scan);
  }, [navigation]);

  const buttons = useMemo(() => {
    if (!canTryAgain && !qrCodeSupported && !downloadButtons) {
      return null;
    }

    return (
      <ButtonContainer>
        {canTryAgain && pendingConnector ? (
          <Button
            onClick={() => connect({connector: pendingConnector})}
            label="Try again"
          />
        ) : null}

        {qrCodeSupported ? (
          <Button onClick={handleUseQRCode} label="Use QR code" />
        ) : null}

        {downloadButtons}
      </ButtonContainer>
    );
  }, [
    canTryAgain,
    connect,
    handleUseQRCode,
    pendingConnector,
    qrCodeSupported,
  ]);

  const {body, title} = ModalContent[state];

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

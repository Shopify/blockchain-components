import {ConnectArgs} from '@wagmi/core';
import {useCallback, useMemo} from 'react';
import {Button} from 'shared';

import {getScreenContent} from './screenContent';

import {BodyText, ButtonContainer, ConnectorIcon, SheetContent} from '../style';
import {Spinner} from '../../Spinner';
import {useConnectorDownloadLinks} from '../../../hooks/useConnectorDownloadLinks';
import {ModalRoute, useModal} from '../../../providers/ModalProvider';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {ConnectionState} from '../../../types/connectionState';
import {getBrowserInfo} from '../../../utils/getBrowser';

interface ConnectingScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  state: ConnectionState;
}

const ConnectingScreen = ({connect, state}: ConnectingScreenProps) => {
  const {navigation} = useModal();
  const {pendingConnector} = useWalletConnection();
  const downloadButtons = useConnectorDownloadLinks();

  const {mobilePlatform} = getBrowserInfo();

  const canTryAgain =
    state === ConnectionState.Failed || state === ConnectionState.Rejected;

  const handleUseQRCode = useCallback(() => {
    navigation.navigate(ModalRoute.Scan);
  }, [navigation]);

  const buttons = useMemo(() => {
    if (!pendingConnector) {
      return null;
    }

    const {connector, qrCodeSupported} = pendingConnector;

    if (!canTryAgain && !qrCodeSupported && !downloadButtons) {
      return null;
    }

    return (
      <ButtonContainer>
        {canTryAgain && pendingConnector ? (
          <Button onClick={() => connect({connector})} label="Try again" />
        ) : null}

        {!mobilePlatform && qrCodeSupported ? (
          <Button onClick={handleUseQRCode} label="Use QR code" />
        ) : null}

        {downloadButtons}
      </ButtonContainer>
    );
  }, [canTryAgain, connect, handleUseQRCode, mobilePlatform, pendingConnector]);

  const {body, title} = getScreenContent(state);

  return (
    <SheetContent>
      <ConnectorIcon>{pendingConnector?.icon}</ConnectorIcon>

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

import {ConnectArgs} from '@wagmi/core';

import {ModalContent} from './state-content';
import {Button} from 'shared'
import {BodyText, ConnectorIcon, SheetContent} from '../style';
import {Spinner} from '../../Spinner';
import {getConnectorData} from '../../../constants/connectors';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {ConnectionState} from '../../../types/connectionState';

interface ConnectingScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  state: ConnectionState;
}

const ConnectingScreen = ({connect, state}: ConnectingScreenProps) => {
  const {pendingConnector} = useWalletConnection();
  const {icon, qrCodeSupported} = getConnectorData(pendingConnector?.name);

  const canTryAgain =
    state === ConnectionState.Failed || state === ConnectionState.Rejected;

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

      {canTryAgain && pendingConnector !== undefined ? (
        <Button
          onClick={() => connect({connector: pendingConnector})}
          label="Try again"
        />
      ) : null}

      {qrCodeSupported ? (
        <Button onClick={() => {}} label="Use QR code" />
      ) : null}
    </SheetContent>
  );
};

export default ConnectingScreen;

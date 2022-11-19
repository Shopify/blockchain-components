import {ConnectArgs} from '@wagmi/core';

import {Button} from '../../Button/Button';
import {BodyText, ConnectorIcon, SheetContent} from '../style';
import {Spinner} from '../../Spinner';
import {Connectors} from '../../../constants/connectors';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';
import {ConnectionState} from '../../../types/connectionState';

interface ConnectingScreenProps {
  connect: (args?: Partial<ConnectArgs>) => void;
  state: ConnectionState;
}

const ModalContent: {
  [key in keyof typeof ConnectionState]: {body: string; title: string};
} = {
  AlreadyConnected: {
    body: 'This connector is already connected',
    title: 'Error',
  },
  Connected: {
    body: 'Connected successfully',
    title: 'Success!',
  },
  Connecting: {
    body: 'Confirm in browser extension.',
    title: 'Requesting connection',
  },
  Failed: {
    body: 'Failed to connect.',
    title: 'Error',
  },
  Rejected: {
    body: 'User rejected the request.',
    title: 'Rejected',
  },
  Unavailable: {
    body: 'Unable to access connector.',
    title: 'Unavailable',
  },
};

const ConnectingScreen = ({connect, state}: ConnectingScreenProps) => {
  const {pendingConnector} = useWalletConnection();

  const canTryAgain =
    state === ConnectionState.Failed || state === ConnectionState.Rejected;
  const connectorData = Connectors[pendingConnector?.name || 'Default'];
  const {icon, qrCodeSupported} = connectorData;

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

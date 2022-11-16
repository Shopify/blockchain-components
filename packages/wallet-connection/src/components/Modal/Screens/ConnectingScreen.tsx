import {BodyText, ConnectorIcon, SheetContent} from '../style';
import {Spinner} from '../../Spinner';
import {ConnectorIconData} from '../../../constants/connectors';
import {useWalletConnection} from '../../../providers/WalletConnectionProvider';

const ConnectingScreen = () => {
  const {pendingConnector} = useWalletConnection();

  const icon =
    (pendingConnector && ConnectorIconData[pendingConnector.name]) || null;

  return (
    <SheetContent>
      <ConnectorIcon>{icon}</ConnectorIcon>

      <h1>Requesting connection</h1>

      <BodyText>Confirm in browser extension.</BodyText>

      <Spinner />
    </SheetContent>
  );
};

export default ConnectingScreen;

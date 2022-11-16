import {useConnect} from 'wagmi';

import {SheetContent} from '../style';
import {ConnectorButton} from '../../ConnectorButton';

const ConnectScreen = () => {
  const {connect, connectors} = useConnect();

  return (
    <SheetContent>
      {connectors.map((connector) => (
        <ConnectorButton
          key={connector.id}
          onClick={() => connect({connector})}
          name={connector.name}
        />
      ))}
    </SheetContent>
  );
};

export default ConnectScreen;

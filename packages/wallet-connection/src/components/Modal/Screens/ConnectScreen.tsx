import {useConnect} from 'wagmi';

import {SheetContent} from '../style';

const ConnectScreen = () => {
  const {connect, connectors} = useConnect();

  return (
    <SheetContent>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({connector})}>
          {connector.name}
        </button>
      ))}
    </SheetContent>
  );
};

export default ConnectScreen;

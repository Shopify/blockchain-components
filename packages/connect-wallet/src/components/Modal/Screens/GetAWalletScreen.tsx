import {useContext} from 'react';
import {ConnectWalletContext} from '../../../providers/ConnectWalletProvider';
import {GetAConnectorButton} from '../../GetAConnectorButton';
import {SheetContent} from '../style';

const GetAWalletScreen = () => {
  const {connectors} = useContext(ConnectWalletContext);

  return (
    <SheetContent>
      {connectors.map(({id}) => (
        <GetAConnectorButton connectorId={id} key={id} />
      ))}
    </SheetContent>
  );
};

export default GetAWalletScreen;

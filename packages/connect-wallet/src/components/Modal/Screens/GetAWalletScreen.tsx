import {GetAConnectorButton} from '../../GetAConnectorButton';
import {SheetContent} from '../style';

// Will add Coinbase in a follow-up PR
const CONNECTORS = ['metaMask', 'rainbow'];

const GetAWalletScreen = () => {
  return (
    <SheetContent>
      {CONNECTORS.map((connectorId) => {
        return (
          <GetAConnectorButton connectorId={connectorId} key={connectorId} />
        );
      })}
    </SheetContent>
  );
};

export default GetAWalletScreen;

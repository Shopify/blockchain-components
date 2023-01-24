import {GetAConnectorButton} from '../../GetAConnectorButton';
import {SheetContent} from '../style';

const CONNECTORS = ['metaMask', 'coinbaseWallet', 'rainbow', 'ledger'];

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

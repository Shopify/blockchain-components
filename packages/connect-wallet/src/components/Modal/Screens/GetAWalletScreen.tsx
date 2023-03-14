import {GetAConnectorButton} from '../../GetAConnectorButton';

const CONNECTORS = ['metaMask', 'coinbaseWallet', 'rainbow', 'ledger'];

const GetAWalletScreen = () => {
  return (
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-p-popover sbc-pt-0">
      {CONNECTORS.map((connectorId) => {
        return (
          <GetAConnectorButton connectorId={connectorId} key={connectorId} />
        );
      })}
    </div>
  );
};

export default GetAWalletScreen;

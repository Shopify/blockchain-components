import {Fragment} from 'react';
import {GetAConnectorButton} from '../../GetAConnectorButton';
import {Divider, SheetContent} from '../style';

// Will add Coinbase in a follow-up PR
const CONNECTORS = ['metaMask', 'rainbow'];

const GetAWalletScreen = () => {
  return (
    <SheetContent>
      {CONNECTORS.map((connectorId, index) => {
        const shouldHaveDivider = index < CONNECTORS.length - 1;

        return (
          <Fragment key={connectorId}>
            <GetAConnectorButton connectorId={connectorId} />
            {shouldHaveDivider ? <Divider /> : null}
          </Fragment>
        );
      })}
    </SheetContent>
  );
};

export default GetAWalletScreen;

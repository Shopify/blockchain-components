import {Fragment} from 'react';

import {GetAConnectorButton} from '../../GetAConnectorButton';
import {Divider, SheetContent} from '../style';

const CONNECTORS = ['metaMask', 'coinbase', 'rainbow', 'ledger'];

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

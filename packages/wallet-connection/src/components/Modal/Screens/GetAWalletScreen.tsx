import {Button} from 'shared';
import {FillerIllustration} from 'shared/assets/icons';

import {BodyText, GetAWalletContent, SheetContent} from '../style';

// Copy and illustration are TBD, this is temporary
const GetAWalletScreen = () => {
  return (
    <SheetContent>
      <GetAWalletContent>
        <div>{FillerIllustration}</div>
        <h3>Start exploring web3</h3>
        <BodyText>Your wallet is the gateway to all things web3.</BodyText>
      </GetAWalletContent>

      <Button
        label="Find your first wallet"
        link={{
          href: 'https://ethereum.org/en/wallets/find-wallet/#main-content',
          target: '_blank',
        }}
      />
    </SheetContent>
  );
};

export default GetAWalletScreen;

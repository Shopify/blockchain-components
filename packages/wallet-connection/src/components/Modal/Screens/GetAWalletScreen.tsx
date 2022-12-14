import {Button} from 'shared';
import {FillerIllustration} from 'shared/assets/icons';

import {BodyText, GetAWalletContent, SheetContent} from '../style';

/**
 * Copy and illustration are not finalized.
 * This is temporary until they are.
 */
const GetAWalletScreen = () => {
  return (
    <SheetContent>
      <GetAWalletContent>
        {FillerIllustration}
        {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
        <h3>Start exploring web3</h3>
        {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
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

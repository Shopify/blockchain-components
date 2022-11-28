import {Button, IconButton} from 'shared';
import {Cancel} from 'shared/assets/icons';

import {Spinner} from '../Spinner';
import {useWalletConnection} from '../../providers/WalletConnectionProvider';

import {
  Background,
  Sheet,
  Header,
  BodyText,
  ButtonContainer,
  SheetContent,
} from './style';

export const SignatureModal = () => {
  const {clearWalletConnection, signing, signMessage} = useWalletConnection();

  return (
    <Background $visible={true}>
      <Sheet>
        <Header>
          <h2>Sign message</h2>

          <IconButton
            aria-label="Close"
            icon={Cancel}
            // For now we can just clear the connected wallet + verification status
            onClick={clearWalletConnection}
          />
        </Header>
        <SheetContent>
          <BodyText>
            Signing a message proves ownership of a wallet address.
          </BodyText>

          {signing ? <Spinner /> : null}

          <ButtonContainer>
            <Button label="Sign message" onClick={signMessage} primary />
          </ButtonContainer>
        </SheetContent>
      </Sheet>
    </Background>
  );
};

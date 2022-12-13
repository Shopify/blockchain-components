import {useCallback} from 'react';
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
  Container,
} from './style';

export const SignatureModal = () => {
  const {clearWalletConnection, signing, signMessage} = useWalletConnection();

  const handleDismiss = useCallback(() => {
    clearWalletConnection();
  }, [clearWalletConnection]);

  const handleSignMessage = useCallback(() => {
    signMessage();
  }, [signMessage]);

  return (
    // This is addressed in the persistent state PR.
    // eslint-disable-next-line react/jsx-boolean-value
    <Container $visible={true}>
      <Background onClick={handleDismiss} />
      <Sheet>
        <Header>
          {/*
          eslint-disable-next-line @shopify/jsx-no-hardcoded-content
          */}
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
            {signing
              ? 'Signature request sent. Please sign the message in your wallet.'
              : 'Signing a message proves ownership of a wallet address.'}
          </BodyText>

          {signing ? <Spinner /> : null}

          <ButtonContainer>
            {/*
             * Prevent the user from invoking multiple signature requests as it currently
             * breaks the onMessageSigned callback flow.
             */}
            {signing ? null : (
              <Button
                label="Sign message"
                onClick={handleSignMessage}
                primary
              />
            )}
          </ButtonContainer>
        </SheetContent>
      </Sheet>
    </Container>
  );
};

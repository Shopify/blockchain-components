import {useCallback} from 'react';
import {Button, Cancel, IconButton, Spinner} from 'shared';

import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useWalletConnection} from '../../hooks/useWalletConnection';
import {clearSignatureState} from '../../slices/walletSlice';

import {
  Background,
  BodyText,
  ButtonContainer,
  Header,
  Sheet,
  SheetContent,
  Wrapper,
} from './style';

export const SignatureModal = () => {
  const dispatch = useAppDispatch();
  const {message} = useAppSelector((state) => state.wallet);
  const {signing, signMessage} = useWalletConnection();

  const handleDismiss = useCallback(() => {
    dispatch(clearSignatureState());
  }, [dispatch]);

  const handleSignMessage = useCallback(() => {
    signMessage();
  }, [signMessage]);

  return (
    <Wrapper $visible={message !== undefined}>
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
            onClick={handleDismiss}
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
    </Wrapper>
  );
};

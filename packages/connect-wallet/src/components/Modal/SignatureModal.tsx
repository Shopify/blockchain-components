import {useCallback} from 'react';
import {Button, Cancel, IconButton, Spinner} from 'shared';
import {useI18n} from '@shopify/react-i18n';

import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useConnectWallet} from '../../hooks/useConnectWallet';
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
  const [i18n] = useI18n();
  const {signing, signMessage} = useConnectWallet();

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
          <h2>{i18n.translate('Modal.signature.title')}</h2>

          <IconButton
            aria-label={i18n.translate('Modal.close.accessibilityLabel')}
            icon={Cancel}
            // For now we can just clear the connected wallet + verification status
            onClick={handleDismiss}
          />
        </Header>
        <SheetContent>
          <BodyText>
            {signing
              ? i18n.translate('Modal.signature.sentRequest')
              : i18n.translate('Modal.signature.toSign')}
          </BodyText>

          {signing ? <Spinner /> : null}

          <ButtonContainer>
            {/*
             * Prevent the user from invoking multiple signature requests as it currently
             * breaks the onMessageSigned callback flow.
             */}
            {signing ? null : (
              <Button
                label={i18n.translate('Modal.signature.title')}
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

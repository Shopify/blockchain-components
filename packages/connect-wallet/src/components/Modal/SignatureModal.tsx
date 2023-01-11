import {useCallback} from 'react';
import {createPortal} from 'react-dom';
import {Button, Cancel, IconButton, Spinner, Text} from 'shared';
import {useI18n} from '@shopify/react-i18n';

import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useConnectWallet} from '../../hooks/useConnectWallet';
import {useIsMounted} from '../../hooks/useIsMounted';
import {clearSignatureState} from '../../slices/walletSlice';

import {
  Background,
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
  const isMounted = useIsMounted();
  const {signing, signMessage} = useConnectWallet();

  const handleDismiss = useCallback(() => {
    dispatch(clearSignatureState());
  }, [dispatch]);

  const handleSignMessage = useCallback(() => {
    signMessage();
  }, [signMessage]);

  if (!isMounted || !message) {
    return null;
  }

  return createPortal(
    <Wrapper>
      <Background onClick={handleDismiss} />
      <Sheet>
        <Header>
          <Text as="h2" variant="headingMd">
            {i18n.translate('Modal.signature.title')}
          </Text>

          <IconButton
            aria-label={i18n.translate('Modal.close.accessibilityLabel')}
            icon={Cancel}
            // For now we can just clear the connected wallet + verification status
            onClick={handleDismiss}
          />
        </Header>
        <SheetContent>
          <Text as="p">
            {signing
              ? i18n.translate('Modal.signature.sentRequest')
              : i18n.translate('Modal.signature.toSign')}
          </Text>

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
    </Wrapper>,
    document.body,
  );
};

import {useCallback} from 'react';
import {createPortal} from 'react-dom';
import {Button, Cancel, IconButton, Spinner, Text} from 'shared';

import {useAppDispatch, useAppSelector} from '../../../hooks/useAppState';
import {useConnectWallet} from '../../../hooks/useConnectWallet';
import {useIsMounted} from '../../../hooks/useIsMounted';
import {useTranslation} from '../../../hooks/useTranslation';
import {useWalletConnectDeeplink} from '../../../hooks/useWalletConnectDeeplink';
import {clearSignatureState} from '../../../slices/walletSlice';
import {
  Background,
  ButtonContainer,
  Center,
  Header,
  Sheet,
  SheetContent,
  Wrapper,
} from '../style';

import {SignatureModalError} from './SignatureModalError';

export const SignatureModal = ({
  error,
  clearError,
}: {
  error?: Error;
  clearError: () => void;
}) => {
  const {message} = useAppSelector((state) => state.wallet);
  const {t} = useTranslation('Modal');
  const isMounted = useIsMounted();
  const {signing, signMessage} = useConnectWallet();
  const dispatch = useAppDispatch();
  const {deleteKey} = useWalletConnectDeeplink();

  const handleDismiss = useCallback(() => {
    clearError();
    dispatch(clearSignatureState());
    deleteKey();
  }, [clearError, dispatch, deleteKey]);

  const handleSignMessage = useCallback(() => {
    clearError();
    signMessage();
  }, [clearError, signMessage]);

  if (error) {
    return (
      <SignatureModalError
        error={error}
        handleDismiss={handleDismiss}
        handleTryAgain={handleSignMessage}
      />
    );
  }

  if (!isMounted || !message) {
    return null;
  }

  return createPortal(
    <Wrapper id="shopify-connect-wallet-modal-container">
      <Background onClick={handleDismiss} />
      <Sheet>
        <Header $padded>
          <Text as="h2" variant="headingMd">
            {t('signature.title')}
          </Text>

          <IconButton
            aria-label={t('icons.close') as string}
            icon={Cancel}
            // For now we can just clear the connected wallet + verification status
            onClick={handleDismiss}
          />
        </Header>
        <SheetContent>
          <Center>
            <Text as="p">
              {signing ? t('signature.sentRequest') : t('signature.toSign')}
            </Text>
          </Center>

          {signing ? <Spinner /> : null}

          <ButtonContainer>
            {/*
             * Prevent the user from invoking multiple signature requests as it currently
             * breaks the onMessageSigned callback flow.
             */}
            {signing ? null : (
              <Button
                label={t('signature.title')}
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

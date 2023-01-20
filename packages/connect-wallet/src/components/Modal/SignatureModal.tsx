import {useCallback, useContext} from 'react';
import {createPortal} from 'react-dom';
import {Button, Cancel, IconButton, Spinner, Text} from 'shared';

import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useDisconnect} from '../../hooks/useDisconnect';
import {useIsMounted} from '../../hooks/useIsMounted';
import {useTranslation} from '../../hooks/useTranslation';
import {useWalletConnectDeeplink} from '../../hooks/useWalletConnectDeeplink';
import {SignatureContext} from '../../providers/SignatureProvider';
import {clearSignatureState} from '../../slices/walletSlice';
import {ConnectorIcon} from '../ConnectorIcon';

import {
  Background,
  ButtonContainer,
  Center,
  ConnectingWalletIcon,
  Header,
  Sheet,
  SheetContent,
  Wrapper,
} from './style';

export const SignatureModal = ({
  error,
  clearError,
}: {
  error?: Error;
  clearError: () => void;
}) => {
  const dispatch = useAppDispatch();
  const {message, pendingWallet} = useAppSelector((state) => state.wallet);
  const {signing, signMessage} = useContext(SignatureContext);
  const {disconnect} = useDisconnect();
  const isMounted = useIsMounted();
  const {t} = useTranslation('Modal');
  const {deleteKey} = useWalletConnectDeeplink();

  const handleDismiss = useCallback(() => {
    /**
     * Try disconnecting the wallet to ensure that the user
     * can reconnect if they choose to do so in the future.
     */
    try {
      disconnect();
    } catch (error) {
      console.warn(
        'The signature flow was cancelled, but there was not a wallet which could be disconnected.',
      );
    }

    clearError();
    dispatch(clearSignatureState());
    deleteKey();
  }, [clearError, dispatch, deleteKey, disconnect]);

  const handleSignMessage = useCallback(() => {
    clearError();
    signMessage();
  }, [clearError, signMessage]);

  const content = {
    subtitle: t('signature.content.subtitle.default', {
      connectorName: pendingWallet?.connectorName || 'wallet app',
    }),
    title: t('signature.content.title.default'),
  };

  if (error) {
    if (error.name === 'UserRejectedRequestError') {
      content.title = t('signature.content.title.cancelled');
    }

    content.title = t('signature.content.title.error');
    content.subtitle = t('signature.content.subtitle.error');
  }

  if (!isMounted || !message || !pendingWallet) {
    return null;
  }

  return createPortal(
    <Wrapper id="shopify-connect-wallet-modal-container">
      <Background onClick={handleDismiss} />
      <Sheet>
        <Header $padded>
          <Text as="h2" variant="headingMd">
            {t('signature.title', {connectorName: pendingWallet.connectorName})}
          </Text>

          <IconButton
            aria-label={t('icons.close') as string}
            icon={Cancel}
            // For now we can just clear the connected wallet + verification status
            onClick={handleDismiss}
          />
        </Header>
        <SheetContent>
          <ConnectingWalletIcon>
            <ConnectorIcon id={pendingWallet.connectorId} size="Xl" />
          </ConnectingWalletIcon>
          <Center>
            <Text as="h3" variant="headingLg">
              {content.title}
            </Text>
            <Text
              as="p"
              color={
                error && error.name !== 'UserRejectedRequestError'
                  ? 'critical'
                  : 'secondary'
              }
            >
              {content.subtitle}
            </Text>
          </Center>

          {signing ? (
            <Spinner />
          ) : (
            <ButtonContainer>
              <Button
                aria-label={t('button.retry')}
                label={t('button.retry')}
                onClick={handleSignMessage}
              />
            </ButtonContainer>
          )}
        </SheetContent>
      </Sheet>
    </Wrapper>,
    document.body,
  );
};

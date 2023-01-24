import {useCallback} from 'react';
import {Button, Spinner, Text} from 'shared';

import {useAppSelector} from '../../../hooks/useAppState';
import {useTranslation} from '../../../hooks/useTranslation';
import {useModal} from '../../../providers/ModalProvider';
import {ConnectorIcon} from '../../ConnectorIcon';
import {
  ButtonContainer,
  Center,
  ConnectingWalletIcon,
  SheetContent,
} from '../style';

const SignatureScreen = () => {
  const {pendingWallet} = useAppSelector((state) => state.wallet);
  const {clearError, error, signing, signMessage} = useModal();
  const {t} = useTranslation('Screens');

  const handleSignMessage = useCallback(() => {
    clearError();
    signMessage();
  }, [clearError, signMessage]);

  const content = {
    subtitle: t('Signature.subtitle.default', {
      connectorName: pendingWallet?.connectorName || 'wallet app',
    }),
    title: t('Signature.heading.default'),
  };

  if (error) {
    if (error.name === 'UserRejectedRequestError') {
      content.title = t('Signature.heading.cancelled');
    }

    content.title = t('Signature.heading.error');
    content.subtitle = t('Signature.subtitle.error');
  }

  return (
    <SheetContent rowGap="24px">
      <ConnectingWalletIcon>
        <ConnectorIcon id={pendingWallet?.connectorId} size="Xl" />
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
  );
};

export default SignatureScreen;

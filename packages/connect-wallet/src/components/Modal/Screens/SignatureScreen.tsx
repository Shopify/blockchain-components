import {useCallback, useMemo} from 'react';
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

  const isCriticalError =
    error !== undefined && error.name !== 'UserRejectedRequestError';

  const content = useMemo(() => {
    if (error && !signing) {
      if (isCriticalError) {
        return {
          subtitle: t('Signature.subtitle.error'),
          title: t('Signature.heading.error'),
        };
      }

      return {
        subtitle: t('Signature.subtitle.default', {
          connectorName: pendingWallet?.connectorName || 'wallet app',
        }),
        title: t('Signature.heading.cancelled'),
      };
    }

    return {
      subtitle: t('Signature.subtitle.default', {
        connectorName: pendingWallet?.connectorName || 'wallet app',
      }),
      title: t('Signature.heading.default'),
    };
  }, [error, isCriticalError, pendingWallet?.connectorName, signing, t]);

  return (
    <SheetContent rowGap="24px">
      <ConnectingWalletIcon>
        <ConnectorIcon id={pendingWallet?.connectorId} size="Xl" />
      </ConnectingWalletIcon>
      <Center>
        <Text as="h3" variant="headingLg">
          {content.title}
        </Text>
        <Text as="p" color={isCriticalError ? 'critical' : 'secondary'}>
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

import {createPortal} from 'react-dom';
import {Button, Cancel, IconButton, Text} from 'shared';

import {useAppSelector} from '../../../hooks/useAppState';
import {useTranslation} from '../../../hooks/useTranslation';
import {ConnectorIcon} from '../../ConnectorIcon';
import {
  Background,
  Center,
  Header,
  Sheet,
  SheetContent,
  Wrapper,
  ConnectingWalletIcon,
} from '../style';

import {ButtonContainer} from './style';

const useTitleAndSubtitle = (error?: Error) => {
  const {t} = useTranslation('Modal');

  let translationKey = 'generic';

  if (error?.name === 'UserRejectedRequestError') {
    translationKey = 'requestCancelled';
  }

  return {
    title: t(`signature.error.${translationKey}.title`),
    subtitle: t(`signature.error.${translationKey}.subtitle`),
  };
};

export const SignatureModalError = ({
  error,
  handleDismiss,
  handleTryAgain,
}: {
  error?: Error;
  handleDismiss: () => void;
  handleTryAgain: () => void;
}) => {
  const {t} = useTranslation('Modal');
  const {pendingWallet} = useAppSelector((state) => state.wallet);
  const {title, subtitle} = useTitleAndSubtitle(error);

  if (!pendingWallet) {
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
            onClick={handleDismiss}
          />
        </Header>
        <SheetContent>
          <ConnectingWalletIcon>
            <ConnectorIcon id={pendingWallet.connectorId} size="Xl" />
          </ConnectingWalletIcon>
          <Center>
            <Text as="h2" variant="headingLg">
              {title}
            </Text>
            <Text as="p">{subtitle}</Text>
          </Center>
          <ButtonContainer>
            <Button onClick={handleTryAgain} label={t('button.tryAgain')} />
          </ButtonContainer>
        </SheetContent>
      </Sheet>
    </Wrapper>,
    document.body,
  );
};

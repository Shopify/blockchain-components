import {eventNames} from '@shopify/blockchain-components';
import {useCallback, useMemo} from 'react';
import {Button, Spinner, Text} from 'shared';

import {useAppSelector} from '../../../hooks/useAppState';
import {useTranslation} from '../../../hooks/useTranslation';
import {useModal} from '../../../providers/ModalProvider';
import {ConnectorIcon} from '../../ConnectorIcon';

const SignatureScreen = () => {
  const {pendingWallet} = useAppSelector((state) => state.wallet);
  const {clearError, closeModal, error, signing, requestSignature} = useModal();
  const {t} = useTranslation('Screens');

  const handleSignMessage = useCallback(() => {
    if (!pendingWallet) {
      closeModal();
      return;
    }

    clearError();
    requestSignature(pendingWallet);
  }, [clearError, closeModal, pendingWallet, requestSignature]);

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
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-gap-y-6 sbc-p-popover sbc-pt-0">
      <div className="sbc-mx-auto sbc-mt-6 sbc-mb-0">
        <ConnectorIcon id={pendingWallet?.connectorId} size="xl" />
      </div>

      <Text as="h3" className="sbc-text-center" variant="headingLg">
        {content.title}
      </Text>
      <Text
        as="p"
        className="sbc-text-center"
        color={isCriticalError ? 'critical' : 'secondary'}
      >
        {content.subtitle}
      </Text>

      {signing ? (
        <Spinner />
      ) : (
        <Button
          aria-label={t('button.retry')}
          className="sbc-mx-auto sbc-w-full sm:sbc-w-fit"
          label={t('button.retry')}
          onClick={handleSignMessage}
          onClickEventName={
            eventNames.CONNECT_WALLET_RETRY_SIGNATURE_BUTTON_CLICKED
          }
        />
      )}
    </div>
  );
};

export default SignatureScreen;

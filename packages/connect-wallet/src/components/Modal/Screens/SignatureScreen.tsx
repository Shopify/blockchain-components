import {eventNames} from '@shopify/blockchain-components';
import {useCallback, useMemo} from 'react';
import {Button, Spinner, Text} from 'shared';

import {ConnectorIcon} from '../../ConnectorIcon';
import {useAppDispatch, useAppSelector} from '../../../hooks/useAppState';
import {useDisconnect} from '../../../hooks/useDisconnect';
import {useSignMessage} from '../../../hooks/useSignMessage';
import {useTranslation} from '../../../hooks/useTranslation';
import {closeModal, setError} from '../../../slices/modalSlice';

const SignatureScreen = () => {
  const dispatch = useAppDispatch();
  const {error, signing} = useAppSelector((state) => state.modal);
  const {pendingWallet} = useAppSelector((state) => state.wallet);
  const {disconnect} = useDisconnect();
  const {signMessage} = useSignMessage();
  const {t} = useTranslation('Screens');

  const handleSignMessage = useCallback(() => {
    if (!pendingWallet) {
      dispatch(closeModal());
      disconnect();
      return;
    }

    dispatch(setError());
    signMessage(pendingWallet);
  }, [disconnect, dispatch, pendingWallet, signMessage]);

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
    <div className="sbc-flex sbc-flex-col sbc-justify-center sbc-gap-y-6 sbc-p-popover sbc-pt-6">
      <div className="sbc-mx-auto">
        <ConnectorIcon id={pendingWallet?.connectorId} size="xl" />
      </div>

      <div className="sbc-block">
        <Text
          as="h3"
          className="sbc-mt-0 sbc-mb-2 sbc-text-center"
          color="primary"
          variant="headingLg"
        >
          {content.title}
        </Text>

        <Text
          as="p"
          className="sbc-m-0 sbc-text-center"
          color={isCriticalError ? 'critical' : 'secondary'}
        >
          {content.subtitle}
        </Text>
      </div>

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

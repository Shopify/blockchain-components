import {eventNames} from '@shopify/blockchain-components';
import {Button} from 'shared';

import {useAppSelector} from '../../hooks/useAppState';
import {useTranslation} from '../../hooks/useTranslation';

interface DisconnectButtonProps {
  onDisconnect: () => void;
}

export const DisconnectButton = ({onDisconnect}: DisconnectButtonProps) => {
  const {activeWallet} = useAppSelector((state) => state.wallet);
  const {t} = useTranslation('ConnectButton');

  if (!activeWallet) {
    return null;
  }

  return (
    <Button
      aria-label={t('popover.disconnectButton')}
      fullWidth
      label={t('popover.disconnectButton')}
      onClick={onDisconnect}
      onClickEventName={eventNames.CONNECT_WALLET_DISCONNECT_BUTTON_CLICKED}
    />
  );
};

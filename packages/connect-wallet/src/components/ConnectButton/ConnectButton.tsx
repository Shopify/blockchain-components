import {eventNames, useEventWithTracking} from '@shopify/blockchain-components';
import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  CaretDown,
  device,
  formatWalletAddress,
  useKeyPress,
  useOutsideClick,
  Text,
  getButtonClassname,
} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useTranslation} from '../../hooks/useTranslation';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';
import {useModal} from '../../providers/ModalProvider';

import {Popover} from './Popover';

export const ConnectButton = () => {
  const {activeWallet} = useAppSelector((state) => state.wallet);
  const {openModal} = useModal();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const {t} = useTranslation('ConnectButton');
  const {width} = useWindowDimensions();
  const shouldUseMobileSizes = Boolean(width && width < device.sm);

  const ref = useOutsideClick(
    () => !shouldUseMobileSizes && setPopoverVisible(false),
  );
  const escPress = useKeyPress('Escape');

  const togglePopover = useCallback(() => {
    setPopoverVisible(!popoverVisible);
  }, [popoverVisible]);

  useEffect(() => {
    if (escPress && popoverVisible) {
      togglePopover();
    }
  }, [escPress, popoverVisible, togglePopover]);

  const handleClick = useCallback(() => {
    if (!activeWallet) {
      openModal();
    }
  }, [activeWallet, openModal]);

  const togglePopoverWithTracking = useEventWithTracking({
    eventName: eventNames.CONNECT_WALLET_CONNECTED_BUTTON_CLICKED,
    callback: togglePopover,
  });

  if (!activeWallet) {
    return (
      <Button
        aria-label={t('buttonText')}
        fullWidth
        primary
        label={t('buttonText')}
        onClick={handleClick}
        onClickEventName={eventNames.CONNECT_WALLET_CONNECT_BUTTON_CLICKED}
        size="Lg"
      />
    );
  }

  const {address, connectorId, displayName} = activeWallet;
  const buttonClassname = getButtonClassname({
    disabled: false,
    fullWidth: true,
    primary: false,
    size: 'Lg',
  });
  const buttonLabel = displayName || formatWalletAddress(address);

  return (
    <div
      className="sbc-relative"
      id="shopify-connect-wallet-connected-button-wrapper"
      ref={ref}
    >
      <button
        aria-disabled={false}
        aria-label={buttonLabel}
        className={buttonClassname}
        onClick={togglePopoverWithTracking}
        type="button"
      >
        <ConnectorIcon id={connectorId} size="Xs" />
        <Text as="span" variant="bodyLg">
          {buttonLabel}
        </Text>
        <div
          className={`sbc-h-5 sbc-w-5 sbc-origin-center sbc-transition-transform ${
            popoverVisible ? 'sbc-rotate-180' : 'sbc-rotate-0'
          }`}
        >
          {CaretDown}
        </div>
      </button>

      <Popover
        mobile={shouldUseMobileSizes}
        onDismiss={() => setPopoverVisible(false)}
        visible={popoverVisible}
      />
    </div>
  );
};

import {eventNames, useEventWithTracking} from '@shopify/blockchain-components';
import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  CaretDown,
  DelegateCash,
  device,
  formatWalletAddress,
  getButtonClassname,
  Text,
  useKeyPress,
  useOutsideClick,
} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useTranslation} from '../../hooks/useTranslation';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';
import {openModal} from '../../slices/modalSlice';

import {ConnectedWalletDetail} from './ConnectedWalletDetail';
import type {ConnectButtonProps} from './types';

export const ConnectButton = ({
  popoverType = 'dropdown',
}: ConnectButtonProps) => {
  const dispatch = useAppDispatch();
  const {activeWallet} = useAppSelector((state) => state.wallet);
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
      dispatch(openModal());
    }
  }, [activeWallet, dispatch]);

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

  const {address, connectorId, displayName, vaults} = activeWallet;
  const buttonClassname = getButtonClassname({
    fullWidth: true,
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
        className={`${buttonClassname} sbc-gap-x-2`}
        onClick={togglePopoverWithTracking}
        type="button"
      >
        <ConnectorIcon id={connectorId} size="xs" />
        <Text as="span" variant="bodyLg">
          {buttonLabel}
        </Text>
        {vaults && vaults.length > 0 ? (
          <div className="sbc-flex sbc-flex-row sbc-items-center sbc-justify-center sbc-gap-x-1 sbc-px-2">
            <div className="sbc-flex sbc-h-3">{DelegateCash}</div>
            <Text as="span" variant="bodySm">
              {vaults.length}
            </Text>
          </div>
        ) : null}

        {popoverType === 'dropdown' ? (
          <div
            className={`sbc-h-5 sbc-w-5 sbc-origin-center sbc-transition-transform ${
              popoverVisible ? 'sbc-rotate-180' : 'sbc-rotate-0'
            }`}
          >
            {CaretDown}
          </div>
        ) : null}
      </button>

      <ConnectedWalletDetail
        onDismiss={() => setPopoverVisible(false)}
        popoverType={popoverType}
        visible={popoverVisible}
        wallet={activeWallet}
      />
    </div>
  );
};

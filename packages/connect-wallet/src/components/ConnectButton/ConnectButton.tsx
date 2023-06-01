import {eventNames, useEventWithTracking} from '@shopify/blockchain-components';
import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  CaretDown,
  CircleTick,
  Copy,
  DelegateCash,
  device,
  formatWalletAddress,
  getButtonClassname,
  Popover,
  Text,
  useKeyPress,
  useOutsideClick,
} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {VaultList} from '../VaultList';

import {
  useCopyToClipboard,
  useDisconnect,
  useTranslation,
  useWindowDimensions,
} from '~/hooks';
import {useStore} from '~/state';

export const ConnectButton = ({label}: {label?: string}) => {
  const [{openModal}, {activeWallet}] = useStore((state) => [
    state.modal,
    state.wallet,
  ]);
  const {copy, copied} = useCopyToClipboard();
  const {disconnect} = useDisconnect();
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

  const handleDisconnect = useCallback(() => {
    if (!activeWallet) {
      return;
    }

    disconnect(activeWallet.address);
    setPopoverVisible(false);
  }, [activeWallet, disconnect]);

  const togglePopoverWithTracking = useEventWithTracking({
    eventName: eventNames.CONNECT_WALLET_CONNECTED_BUTTON_CLICKED,
    callback: togglePopover,
  });

  if (!activeWallet) {
    return (
      <Button
        aria-label={label || t('buttonText')}
        fullWidth
        primary
        label={label || t('buttonText')}
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
          <div className="sbc-flex sbc-flex-row sbc-items-center sbc-justify-center sbc-gap-x-1 sbc-rounded sbc-bg-address-chip sbc-px-2 sbc-py-1">
            <div className="sbc-h-3 sbc-w-3">{DelegateCash}</div>
            <Text as="span" variant="bodySm" color="secondary">
              {vaults.length}
            </Text>
          </div>
        ) : null}
        <div
          className={`sbc-h-5 sbc-w-5 sbc-origin-center sbc-transition-transform ${
            popoverVisible ? 'sbc-rotate-180' : 'sbc-rotate-0'
          }`}
        >
          {CaretDown}
        </div>
      </button>

      <Popover
        containerClass="sbc-min-w-[280px]"
        frameClass="sbc-gap-y-4"
        id="shopify-connect-wallet-popover-container"
        onDismiss={() => setPopoverVisible(false)}
        target="shopify-connect-wallet-connected-button-wrapper"
        visible={popoverVisible}
      >
        <ConnectorIcon id={connectorId} size="lg" />

        <button
          className="sbc-flex sbc-cursor-pointer sbc-items-center sbc-gap-x-3 sbc-rounded-full sbc-bg-address-chip sbc-px-3 sbc-py-2 sbc-text-address-chip sbc-transition-colors sbc-border-none hover:sbc-bg-address-chip-hover"
          onClick={() => copy(address)}
          type="button"
        >
          <Text as="span" className="sbc-pointer-events-none" variant="bodyLg">
            {formatWalletAddress(address)}
          </Text>
          {copied ? CircleTick : Copy}
        </button>

        <VaultList vaults={vaults} />

        <Button
          aria-label={t('popover.disconnectButton')}
          fullWidth
          label={t('popover.disconnectButton')}
          onClick={handleDisconnect}
          onClickEventName={eventNames.CONNECT_WALLET_DISCONNECT_BUTTON_CLICKED}
        />
      </Popover>
    </div>
  );
};

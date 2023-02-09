import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  CaretDown,
  device,
  formatWalletAddress,
  useKeyPress,
  useOutsideClick,
  Text,
  DelegateCash as delegateCashIcon,
  }
from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useTranslation} from '../../hooks/useTranslation';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';
import {useModal} from '../../providers/ModalProvider';

import {Popover} from './Popover';
import {CaretIcon, ConnectedButton, Wrapper, Icon, DelegateCounter} from './style';

export const ConnectButton = () => {
  const {connectedWallets} = useAppSelector((state) => state.wallet);
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
    if (!connectedWallets.length) {
      openModal();
    }
  }, [connectedWallets.length, openModal]);

  if (!connectedWallets.length) {
    return (
      <Button
        aria-label={t('buttonText')}
        fullWidth
        primary
        label={t('buttonText')}
        onClick={handleClick}
        size="Lg"
      />
    );
  }

  const {address, connectorId, delegatedWalletAddresses} = connectedWallets[0];

  return (
    <Wrapper id="connectWalletConnectedButtonWrapper" ref={ref}>
      <ConnectedButton
        fullWidth
        onClick={togglePopover}
        $popoverOpen={popoverVisible}
        size="Lg"
      >
        <ConnectorIcon id={connectorId} size="Xs" />
        <Text as="span" variant="bodyLg">
          {formatWalletAddress(address)}
        </Text>
        {delegatedWalletAddresses ? (
          <DelegateCounter>
            <Icon>{delegateCashIcon}</Icon>
            <Text variant="bodySm" bold>{delegatedWalletAddresses.length}</Text>
          </DelegateCounter>
        ) : null}
        <CaretIcon>{CaretDown}</CaretIcon>
      </ConnectedButton>

      <Popover
        mobile={shouldUseMobileSizes}
        onDismiss={() => setPopoverVisible(false)}
        visible={popoverVisible}
      />
    </Wrapper>
  );
};

import {useCallback, useEffect, useState} from 'react';
import {
  Button,
  CaretDown,
  device,
  formatWalletAddress,
  useKeyPress,
  useOutsideClick,
  Text,
} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useTranslation} from '../../hooks/useTranslation';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';
import {useModal} from '../../providers/ModalProvider';

import {Popover} from './Popover';
import {CaretIcon, ConnectedButton, Wrapper} from './style';

export const ConnectButton = () => {
  const {connectedWallets} = useAppSelector((state) => state.wallet);
  const {openModal} = useModal();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const {t} = useTranslation('ConnectButton');
  const {width} = useWindowDimensions();
  const shouldUseMobileSizes = Boolean(width && width < device.sm);

  const ref = useOutsideClick(() => setPopoverVisible(false));
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
      <Button fullWidth primary label={t('buttonText')} onClick={handleClick} />
    );
  }

  const {address, connectorId} = connectedWallets[0];

  return (
    <Wrapper id="connectWalletConnectedButtonWrapper" ref={ref}>
      <ConnectedButton
        fullWidth
        onClick={togglePopover}
        $popoverOpen={popoverVisible}
      >
        <ConnectorIcon id={connectorId} size="Xs" />
        <Text as="span" variant="bodyLg">
          {formatWalletAddress(address)}
        </Text>
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

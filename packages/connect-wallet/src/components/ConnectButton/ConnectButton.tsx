import {useCallback, useState} from 'react';
import {useI18n} from '@shopify/react-i18n';
import {Button, CaretDown, device, formatWalletAddress, Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';
import {useModal} from '../../providers/ModalProvider';

import {Popover} from './Popover';
import {CaretIcon, ConnectedButton, Wrapper} from './style';

export const ConnectButton = () => {
  const {connectedWallets} = useAppSelector((state) => state.wallet);
  const {openModal} = useModal();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [i18n] = useI18n();
  const {width} = useWindowDimensions();
  const shouldUseMobileSizes = Boolean(width && width < device.sm);

  const handleClick = useCallback(() => {
    if (!connectedWallets.length) {
      openModal();
    }
  }, [connectedWallets.length, openModal]);

  const handlePopover = useCallback(
    (event: React.MouseEvent) => {
      /**
       * Without this, the popover will close when the button
       * is unfocused, which will occur on any DOM element
       * clicks after the button is pressed.
       */
      if (shouldUseMobileSizes) {
        if (event.type === 'click') {
          setPopoverVisible(true);
        }

        return;
      }

      if (event.type === 'mouseenter') {
        setPopoverVisible(true);
        return;
      }

      if (event.type === 'mouseleave') {
        setPopoverVisible(false);
      }
    },
    [shouldUseMobileSizes],
  );

  if (!connectedWallets.length) {
    return (
      <Button
        fullWidth
        primary
        label={i18n.translate('ConnectButton.buttonText')}
        onClick={handleClick}
      />
    );
  }

  const {address, connectorId} = connectedWallets[0];

  return (
    <Wrapper
      onMouseEnter={handlePopover}
      onMouseLeave={handlePopover}
      id="connectWalletConnectedButtonWrapper"
    >
      <ConnectedButton fullWidth onClickCapture={handlePopover}>
        <ConnectorIcon id={connectorId} />
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

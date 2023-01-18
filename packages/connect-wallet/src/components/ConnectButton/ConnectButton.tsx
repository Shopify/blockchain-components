import {useCallback, useState} from 'react';
import {Button, CaretDown, device, formatWalletAddress, Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useOutsideClick} from '../../hooks/useOutsideClick';
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

  const handleClick = useCallback(() => {
    if (!connectedWallets.length) {
      openModal();
    }
  }, [connectedWallets.length, openModal]);

  const handlePopover = useCallback(() => setPopoverVisible(true), []);

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
        onClick={handlePopover}
        popoverOpen={popoverVisible}
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

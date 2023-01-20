import {useCallback} from 'react';
import {createPortal} from 'react-dom';
import {Button, CircleTick, Copy, formatWalletAddress, Text} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useDisconnect} from '../../hooks/useDisconnect';
import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';
import {useTranslation} from '../../hooks/useTranslation';
import {useIsMounted} from '../../hooks/useIsMounted';

import {AddressChip, Background, Container, Frame} from './style';

interface PopoverProps {
  mobile?: boolean;
  onDismiss: () => void;
  visible: boolean;
}

export const Popover = ({mobile, onDismiss, visible}: PopoverProps) => {
  const {connectedWallets} = useAppSelector((state) => state.wallet);
  const {disconnect} = useDisconnect();
  const {copy, copied} = useCopyToClipboard();
  const isMounted = useIsMounted();
  const {t} = useTranslation('ConnectButton');

  const handleDisconnect = useCallback(() => {
    if (!connectedWallets.length) {
      return;
    }

    disconnect(connectedWallets[0].address);
    onDismiss();
  }, [connectedWallets, disconnect, onDismiss]);

  if (!connectedWallets.length || !isMounted || !visible) {
    return null;
  }

  const portalElement = mobile
    ? document.body
    : document.getElementById('connectWalletConnectedButtonWrapper');

  const {address, connectorId} = connectedWallets[0];

  if (!portalElement) {
    return null;
  }

  /**
   * Using a portal here ensures that the component will mount at a point
   * in the DOM that is relevant to the size of the device. For example,
   * on mobile devices, this will render within the document.body, but in
   * the context of a desktop device, this will render in the
   * connectWalletConnectedButtonWrapper.
   */
  return createPortal(
    <Container id="shopify-connect-wallet-popover-container">
      <Background onClick={onDismiss} />
      <Frame>
        <ConnectorIcon id={connectorId} size="Lg" />

        <AddressChip onClick={() => copy(address)}>
          <Text as="span" variant="bodyLg">
            {formatWalletAddress(address)}
          </Text>
          {copied ? CircleTick : Copy}
        </AddressChip>

        <Button
          aria-label={t('popover.disconnectButton')}
          fullWidth
          label={t('popover.disconnectButton')}
          onClick={handleDisconnect}
        />
      </Frame>
    </Container>,
    portalElement,
  );
};

import {useCallback} from 'react';
import {createPortal} from 'react-dom';
import {Button, CircleTick, Copy, formatWalletAddress} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useConnectWallet} from '../../hooks/useConnectWallet';
import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';
import {useIsMounted} from '../../hooks/useIsMounted';
import {Size} from '../../types/sizes';

import {Address, AddressChip, Background, Container, Frame} from './style';

interface PopoverProps {
  mobile?: boolean;
  onDismiss: () => void;
  visible: boolean;
}

export const Popover = ({mobile, onDismiss, visible}: PopoverProps) => {
  const {connectedWallets} = useAppSelector((state) => state.wallet);
  const {disconnect} = useConnectWallet();
  const {copy, copied} = useCopyToClipboard();
  const isMounted = useIsMounted();

  const handleDisconnect = useCallback(() => {
    disconnect();
    onDismiss();
  }, [disconnect, onDismiss]);

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
    <Container>
      <Background onClick={onDismiss} />
      <Frame>
        <ConnectorIcon id={connectorId} size={Size.Large} />

        <AddressChip onClick={() => copy(address)}>
          <Address>{formatWalletAddress(address)}</Address>
          {copied ? CircleTick : Copy}
        </AddressChip>

        <Button fullWidth label="Disconnect" onClick={handleDisconnect} />
      </Frame>
    </Container>,
    portalElement,
  );
};

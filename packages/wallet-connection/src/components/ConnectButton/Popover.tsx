import {useCallback} from 'react';
import {Button, CircleTick, Copy, formatWalletAddress} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';
import {useWalletConnection} from '../../hooks/useWalletConnection';
import {Size} from '../../types/sizes';

import {Address, AddressChip, Background, Container, Frame} from './style';

interface PopoverProps {
  onDismiss: () => void;
  visible: boolean;
}

export const Popover = ({onDismiss, visible}: PopoverProps) => {
  const {connectedWallets} = useAppSelector((state) => state.wallet);
  const {copy, copied} = useCopyToClipboard();
  const {disconnect} = useWalletConnection();

  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  if (!connectedWallets.length || !visible) {
    return null;
  }

  const {address, connectorId} = connectedWallets[0];

  return (
    <Container>
      <Background onClick={handleDismiss} />
      <Frame>
        <ConnectorIcon id={connectorId} size={Size.Large} />

        <AddressChip onClick={() => copy(address)}>
          <Address>{formatWalletAddress(address)}</Address>
          {copied ? CircleTick : Copy}
        </AddressChip>

        <Button
          fullWidth
          label="Disconnect"
          onClick={() => disconnect(address)}
        />
      </Frame>
    </Container>
  );
};

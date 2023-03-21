import {useCallback} from 'react';
import {Popover} from 'shared';

import {Modal} from '../Common';
import {ConnectorIcon} from '../ConnectorIcon';
import {useDisconnect} from '../../hooks/useDisconnect';

import {AddressChip} from './AddressChip';
import {DisconnectButton} from './DisconnectButton';
import type {ConnectedPopoverProps} from './types';

export const ConnectedWalletDetail = ({
  onDismiss,
  popoverType,
  visible,
  wallet,
}: ConnectedPopoverProps) => {
  const {disconnect} = useDisconnect();

  const {address, connectorId} = wallet;

  const handleDisconnect = useCallback(() => {
    disconnect(wallet.address);
    onDismiss();
  }, [disconnect, onDismiss, wallet]);

  if (popoverType === 'dropdown') {
    return (
      <Popover
        id="shopify-connect-wallet-popover-container"
        onDismiss={onDismiss}
        target="shopify-connect-wallet-connected-button-wrapper"
        visible={visible}
      >
        <ConnectorIcon id={connectorId} size="lg" />

        <AddressChip address={address} />

        <DisconnectButton onDisconnect={handleDisconnect} />
      </Popover>
    );
  }

  return (
    <Modal onDismiss={onDismiss} visible={visible}>
      <div className="sbc-flex sbc-flex-col sbc-items-center sbc-justify-center sbc-gap-y-6 sbc-p-popover sbc-pt-0">
        <div className="sbc-flex sbc-flex-col sbc-items-center sbc-gap-y-4">
          <ConnectorIcon id={connectorId} size="lg" />

          <AddressChip address={address} />
        </div>

        <DisconnectButton onDisconnect={handleDisconnect} />
      </div>
    </Modal>
  );
};

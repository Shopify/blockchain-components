import {useCallback, useState} from 'react';
import {Button, CaretDown, formatWalletAddress} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useModal} from '../../providers/ModalProvider';

import {Popover} from './Popover';
import {Address, CaretIcon, ConnectedButton, Wrapper} from './style';

export const ConnectButton = () => {
  const {connectedWallets} = useAppSelector((state) => state.wallet);
  const {openModal} = useModal();
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleClick = useCallback(() => {
    if (!connectedWallets.length) {
      openModal();
    }
  }, [connectedWallets.length, openModal]);

  const handleDismiss = useCallback(() => {
    setPopoverVisible(false);
  }, []);

  const handleShow = useCallback(() => {
    setPopoverVisible(true);
  }, []);

  if (!connectedWallets.length) {
    return <Button fullWidth label="Connect wallet" onClick={handleClick} />;
  }

  const {address, connectorId} = connectedWallets[0];

  return (
    <Wrapper
      onMouseEnter={handleShow}
      onMouseLeave={handleDismiss}
      onMouseOver={handleShow}
      onMouseOut={handleDismiss}
    >
      <ConnectedButton fullWidth>
        <ConnectorIcon id={connectorId} />
        <Address>{formatWalletAddress(address)}</Address>
        <CaretIcon>{CaretDown}</CaretIcon>
      </ConnectedButton>
      <Popover onDismiss={handleDismiss} visible={popoverVisible} />
    </Wrapper>
  );
};

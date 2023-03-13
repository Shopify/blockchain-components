import {eventNames} from '@shopify/blockchain-components';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'framer-motion';
import {useCallback} from 'react';
import {createPortal} from 'react-dom';
import {
  Button,
  CircleTick,
  Copy,
  formatWalletAddress,
  Text,
  useIsMounted,
  useMediaQuery,
} from 'shared';

import {ConnectorIcon} from '../ConnectorIcon';
import {useAppSelector} from '../../hooks/useAppState';
import {useDisconnect} from '../../hooks/useDisconnect';
import {useCopyToClipboard} from '../../hooks/useCopyToClipboard';
import {useTranslation} from '../../hooks/useTranslation';

import {AddressChip, Background, Container, Frame} from './style';
import {PopoverVariants} from './variants';

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
  const isSmall = useMediaQuery('smDown');
  const reducedMotion = useReducedMotion();
  const {t} = useTranslation('ConnectButton');

  const handleDisconnect = useCallback(() => {
    if (!connectedWallets.length) {
      return;
    }

    disconnect(connectedWallets[0].address);
    onDismiss();
  }, [connectedWallets, disconnect, onDismiss]);

  if (!connectedWallets.length || !isMounted) {
    return null;
  }

  const portalElement = mobile
    ? document.body
    : document.getElementById(
        'shopify-connect-wallet-connected-button-wrapper',
      );

  const {address, connectorId} = connectedWallets[0];

  if (!portalElement) {
    return null;
  }

  /**
   * Using a portal here ensures that the component will mount at a point
   * in the DOM that is relevant to the size of the device. For example,
   * on mobile devices, this will render within the document.body, but in
   * the context of a desktop device, this will render in the
   * `shopify-connect-wallet-connected-button-wrapper`.
   */
  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible ? (
          <Container
            as={m.div}
            exit={{pointerEvents: 'none'}}
            id="shopify-connect-wallet-popover-container"
            initial={{pointerEvents: 'auto'}}
          >
            <Background
              onClick={onDismiss}
              animate={{opacity: 1}}
              as={m.div}
              exit={{opacity: 0}}
              initial={{opacity: 0}}
            />
            <Frame
              animate="show"
              as={m.div}
              exit="exit"
              initial="exit"
              variants={PopoverVariants({isSmall, reducedMotion})}
            >
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
                onClickEventName={
                  eventNames.CONNECT_WALLET_DISCONNECT_BUTTON_CLICKED
                }
              />
            </Frame>
          </Container>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    portalElement,
  );
};

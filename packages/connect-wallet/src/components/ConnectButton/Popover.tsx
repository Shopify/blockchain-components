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
          <m.div
            className="sbc-fixed sbc-top-0 sbc-bottom-0 sbc-right-0 sbc-z-max sbc-flex sbc-min-w-full sbc-flex-col sbc-justify-end sbc-p-0 sm:sbc-absolute sm:sbc-top-full sm:sbc-bottom-auto sm:sbc-min-w-[280px] sm:sbc-py-1"
            exit={{pointerEvents: 'none'}}
            id="shopify-connect-wallet-popover-container"
            initial={{pointerEvents: 'auto'}}
          >
            <m.div
              animate={{opacity: 1}}
              className="sbc-absolute sbc-z-10 sbc-block sbc-h-full sbc-w-full sbc-bg-overlay sm:!sbc-hidden"
              exit={{opacity: 0}}
              initial={{opacity: 0}}
              onClick={onDismiss}
            />
            <m.div
              animate="show"
              className="sbc-popover-frame-content sbc-z-20 sbc-flex sbc-flex-col sbc-items-center sbc-gap-y-4 sbc-rounded-popover-mobile sbc-border-none sbc-bg-popover sbc-p-popover sbc-shadow-popover-mobile sm:sbc-rounded-popover-desktop sm:sbc-border-popover sm:sbc-pb-popover sm:sbc-shadow-popover-desktop"
              exit="exit"
              initial="exit"
              variants={PopoverVariants({isSmall, reducedMotion})}
            >
              <ConnectorIcon id={connectorId} size="lg" />

              <button
                className="sbc-flex sbc-items-center sbc-gap-x-3 sbc-rounded-full sbc-bg-address-chip sbc-py-2 sbc-px-3 hover:sbc-bg-button-secondary-hover"
                onClick={() => copy(address)}
                type="button"
              >
                <Text as="span" variant="bodyLg" color="primary">
                  {formatWalletAddress(address)}
                </Text>
                {copied ? CircleTick : Copy}
              </button>

              <Button
                aria-label={t('popover.disconnectButton')}
                fullWidth
                label={t('popover.disconnectButton')}
                onClick={handleDisconnect}
                onClickEventName={
                  eventNames.CONNECT_WALLET_DISCONNECT_BUTTON_CLICKED
                }
              />
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    portalElement,
  );
};

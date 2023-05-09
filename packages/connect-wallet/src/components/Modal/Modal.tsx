import {eventNames} from '@shopify/blockchain-components';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'framer-motion';
import {useCallback, useEffect, useContext} from 'react';
import {createPortal} from 'react-dom';
import useMeasure from 'react-use-measure';
import {
  Back,
  Cancel,
  IconButton,
  QuestionMark,
  Text,
  useIsMounted,
  useKeyPress,
  useMediaQuery,
} from 'shared';

import {
  ConnectScreen,
  ConnectingScreen,
  DelegateWalletsScreen,
  GetAWalletScreen,
  ScanScreen,
  SignatureScreen,
  WhatAreWalletsScreen,
} from './Screens';
import {ModalVariants} from './variants';

import {
  useAppDispatch,
  useAppSelector,
  useDisconnect,
  useMiddleware,
  useTranslation,
} from '~/hooks';
import {ConnectWalletContext} from '~/providers/ConnectWalletProvider';
import {closeModal, goBack, navigate} from '~/slices/modalSlice';
import {ModalRoute} from '~/types/modal';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const {open, route} = useAppSelector((state) => state.modal);
  const {pendingConnector, pendingWallet} = useAppSelector(
    (state) => state.wallet,
  );
  const {
    connectors,
    customTitles,
    enableDelegateCash,
    orderAttributionMode,
    requireSignature,
  } = useContext(ConnectWalletContext);
  const {disconnect} = useDisconnect();
  const isMounted = useIsMounted();
  const escPress = useKeyPress('Escape');
  const [ref, {height}] = useMeasure();
  const isSmall = useMediaQuery('smDown');
  const reducedMotion = useReducedMotion();
  const {t} = useTranslation('Modal');

  useMiddleware({enableDelegateCash, orderAttributionMode, requireSignature});

  useEffect(() => {
    if (escPress && open) {
      dispatch(closeModal());
    }
  }, [dispatch, escPress, open]);

  const handleCloseModal = useCallback(() => {
    if (!open) return;

    if (route === 'Signature') {
      disconnect(pendingWallet?.address);
    }

    dispatch(closeModal());
  }, [disconnect, dispatch, open, pendingWallet?.address, route]);

  const handleGoBack = useCallback(() => {
    if (route === 'Signature') {
      disconnect(pendingWallet?.address);
    }

    dispatch(goBack());
  }, [disconnect, dispatch, pendingWallet?.address, route]);

  const backButton = (
    <IconButton
      aria-label={t('icons.back') as string}
      icon={Back}
      onClickEventName={eventNames.CONNECT_WALLET_MODAL_BACK_BUTTON_CLICKED}
      onClick={handleGoBack}
    />
  );

  const whatAreWalletsButton = (
    <IconButton
      aria-label={t('icons.whatIsAWallet') as string}
      icon={QuestionMark}
      onClickEventName={eventNames.CONNECT_WALLET_HELP_BUTTON_CLICKED}
      onClick={() => dispatch(navigate('WhatAreWallets'))}
    />
  );

  const mappedScreenData: Record<
    ModalRoute,
    {leftButton: JSX.Element; screen: JSX.Element; title: string}
  > = {
    Connect: {
      leftButton: whatAreWalletsButton,
      screen: (
        <ConnectScreen
          connectors={connectors}
          enableDelegateCash={enableDelegateCash}
        />
      ),
      title: customTitles?.connectScreenHeader || t('title.Connect'),
    },
    Connecting: {
      leftButton: backButton,
      screen: <ConnectingScreen />,
      title: t('title.Connecting', {connector: pendingConnector?.name}),
    },
    DelegateWallets: {
      leftButton: backButton,
      screen: <DelegateWalletsScreen />,
      title: t('title.DelegateWallets'),
    },
    GetAWallet: {
      leftButton: backButton,
      screen: <GetAWalletScreen />,
      title: t('title.GetAWallet'),
    },
    Scan: {
      leftButton: backButton,
      screen: <ScanScreen />,
      title: t('title.Scan', {connector: pendingConnector?.name}),
    },
    Signature: {
      leftButton: backButton,
      screen: <SignatureScreen />,
      title: t('title.Signature', {connector: pendingWallet?.connectorName}),
    },
    WhatAreWallets: {
      leftButton: backButton,
      screen: <WhatAreWalletsScreen />,
      title: t('title.WhatAreWallets'),
    },
  };

  const {leftButton, screen, title} = mappedScreenData[route];

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open ? (
          <m.div
            className="sbc-fixed sbc-bottom-0 sbc-left-0 sbc-right-0 sbc-top-0 sbc-z-max sbc-flex sbc-items-end sbc-justify-center sm:sbc-items-center"
            exit={{pointerEvents: 'none'}}
            id="shopify-connect-wallet-modal-container"
            initial={{pointerEvents: 'auto'}}
          >
            <m.div
              animate={{opacity: 1}}
              className="sbc-absolute sbc-z-10 sbc-h-full sbc-w-full sbc-bg-overlay"
              exit={{opacity: 0}}
              initial={{opacity: 0}}
              onClick={handleCloseModal}
            />
            <m.div
              animate="show"
              className="sbc-max-w-none sbc-relative sbc-z-20 sbc-w-full sbc-overflow-hidden sbc-rounded-popover-mobile sbc-bg-popover sbc-shadow-popover-mobile sbc-border-popover sm:sbc-max-w-sm sm:sbc-rounded-popover-desktop sm:sbc-shadow-popover-desktop"
              exit="exit"
              initial="exit"
              variants={ModalVariants({
                height,
                isSmall,
                reducedMotion,
              })}
            >
              <div ref={ref}>
                <div className="sbc-flex sbc-flex-row sbc-items-center sbc-gap-x-4 sbc-p-popover">
                  {leftButton}

                  <Text
                    as="h2"
                    className="sbc-max-w-full sbc-flex-1 sbc-text-ellipsis sbc-whitespace-nowrap sbc-break-all sbc-text-center sbc-line-clamp-2"
                    color="primary"
                    variant="headingMd"
                  >
                    {title}
                  </Text>

                  <IconButton
                    aria-label={t('icons.close') as string}
                    icon={Cancel}
                    onClickEventName={
                      eventNames.CONNECT_WALLET_MODAL_CLOSE_BUTTON_CLICKED
                    }
                    onClick={handleCloseModal}
                  />
                </div>

                {screen}
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    document.body,
  );
};

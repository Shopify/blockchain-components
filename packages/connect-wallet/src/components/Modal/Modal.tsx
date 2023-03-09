import {eventNames} from '@shopify/blockchain-components';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'framer-motion';
import {useCallback, useEffect} from 'react';
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

import {useDefaultConnectors} from '../../hooks/useDefaultConnectors';
import {useAppSelector} from '../../hooks/useAppState';
import {useTranslation} from '../../hooks/useTranslation';
import {ModalRoute, useModal} from '../../providers/ModalProvider';

import {Background, Header, Sheet, Wrapper} from './style';
import {
  ConnectScreen,
  ConnectingScreen,
  GetAWalletScreen,
  ScanScreen,
  SignatureScreen,
  WhatAreWalletsScreen,
} from './Screens';
import {ModalVariants} from './variants';

export const Modal = () => {
  const {pendingConnector, pendingWallet} = useAppSelector(
    (state) => state.wallet,
  );
  const {connectors} = useDefaultConnectors();
  const isMounted = useIsMounted();
  const escPress = useKeyPress('Escape');
  const [ref, {height}] = useMeasure();
  const isSmall = useMediaQuery('smDown');
  const {active, closeModal, navigation} = useModal();
  const reducedMotion = useReducedMotion();
  const {t} = useTranslation('Modal');

  useEffect(() => {
    if (escPress && active) {
      closeModal();
    }
  }, [active, closeModal, escPress]);

  const handleBackdropPress = useCallback(() => {
    if (!active) return;

    closeModal();
  }, [active, closeModal]);

  const backButton = (
    <IconButton
      aria-label={t('icons.back') as string}
      icon={Back}
      onClickEventName={eventNames.CONNECT_WALLET_MODAL_BACK_BUTTON_CLICKED}
      onClick={navigation.goBack}
    />
  );

  const whatAreWalletsButton = (
    <IconButton
      aria-label={t('icons.whatIsAWallet') as string}
      icon={QuestionMark}
      onClickEventName={eventNames.CONNECT_WALLET_HELP_BUTTON_CLICKED}
      onClick={() => navigation.navigate(ModalRoute.WhatAreWallets)}
    />
  );

  const mappedScreenData: {
    [R in ModalRoute]: {
      leftButton: JSX.Element;
      screenComponent: JSX.Element;
      title: string;
    };
  } = {
    Connect: {
      leftButton: whatAreWalletsButton,
      screenComponent: <ConnectScreen connectors={connectors} />,
      title: t('title.Connect'),
    },
    Connecting: {
      leftButton: backButton,
      screenComponent: <ConnectingScreen />,
      title: t('title.Connecting', {connector: pendingConnector?.name}),
    },
    GetAWallet: {
      leftButton: backButton,
      screenComponent: <GetAWalletScreen />,
      title: t('title.GetAWallet'),
    },
    Scan: {
      leftButton: backButton,
      screenComponent: <ScanScreen />,
      title: t('title.Scan', {connector: pendingConnector?.name}),
    },
    Signature: {
      leftButton: backButton,
      screenComponent: <SignatureScreen />,
      title: t('title.Signature', {connector: pendingWallet?.connectorName}),
    },
    WhatAreWallets: {
      leftButton: backButton,
      screenComponent: <WhatAreWalletsScreen />,
      title: t('title.WhatAreWallets'),
    },
  };

  const {leftButton, screenComponent, title} =
    mappedScreenData[navigation.route];

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {active ? (
          <Wrapper
            as={m.div}
            exit={{pointerEvents: 'none'}}
            id="shopify-connect-wallet-modal-container"
            initial={{pointerEvents: 'auto'}}
          >
            <Background
              animate={{opacity: 1}}
              as={m.div}
              exit={{opacity: 0}}
              initial={{opacity: 0}}
              onClick={handleBackdropPress}
            />
            <Sheet
              animate="show"
              as={m.div}
              exit="exit"
              initial="exit"
              variants={ModalVariants({
                height,
                isSmall,
                reducedMotion,
              })}
            >
              <div ref={ref}>
                <Header>
                  {leftButton}

                  <Text as="h2" variant="headingMd">
                    {title}
                  </Text>

                  <IconButton
                    aria-label={t('icons.close') as string}
                    icon={Cancel}
                    onClickEventName={
                      eventNames.CONNECT_WALLET_MODAL_CLOSE_BUTTON_CLICKED
                    }
                    onClick={closeModal}
                  />
                </Header>

                {screenComponent}
              </div>
            </Sheet>
          </Wrapper>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    document.body,
  );
};

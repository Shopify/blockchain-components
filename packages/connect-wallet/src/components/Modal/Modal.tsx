import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'framer-motion';
import {useCallback, useContext, useEffect} from 'react';
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
  DelegateCash as delegateCashIcon,
} from 'shared';

import {useDefaultConnectors} from '../../hooks/useDefaultConnectors';
import {useAppSelector} from '../../hooks/useAppState';
import {useTranslation} from '../../hooks/useTranslation';
import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {ModalRoute, useModal} from '../../providers/ModalProvider';

import {
  Background,
  DelegateCash,
  DelegateIcon,
  DelegateText,
  Header,
  Link,
  Sheet,
  Wrapper,
} from './style';
import {
  ConnectScreen,
  ConnectingScreen,
  GetAWalletScreen,
  ScanScreen,
  SignatureScreen,
  WhatAreWalletsScreen,
  WhatAreDelegatesScreen,
} from './Screens';
import {ModalVariants} from './variants';

export const Modal = () => {
  const {pendingConnector, pendingWallet} = useAppSelector(
    (state) => state.wallet,
  );
  const {allowDelegates} = useContext(ConnectWalletContext);
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
      onClick={navigation.goBack}
    />
  );

  const whatAreWalletsButton = (
    <IconButton
      aria-label={t('icons.whatIsAWallet') as string}
      icon={QuestionMark}
      onClick={() => navigation.navigate(ModalRoute.WhatAreWallets)}
    />
  );

  const whatAreDelegatesText = allowDelegates ? (
    <DelegateCash>
      <DelegateIcon>{delegateCashIcon}</DelegateIcon>
      <DelegateText>
        <Link
          color="secondary"
          onClick={() => navigation.navigate(ModalRoute.WhatAreDelegates)}
          role="button"
          variant="bodyMd"
        >
          {t('delegation.delegateWallets')}
        </Link>
        <Text color="secondary">{t('delegation.supported')}</Text>
      </DelegateText>
    </DelegateCash>
  ) : null;

  const mappedScreenData: {
    [R in ModalRoute]: {
      leftButton: JSX.Element;
      screenComponent: JSX.Element;
      title: string;
      bottom?: JSX.Element | null;
    };
  } = {
    Connect: {
      bottom: whatAreDelegatesText,
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
    WhatAreDelegates: {
      leftButton: backButton,
      screenComponent: <WhatAreDelegatesScreen />,
      title: t('title.WhatAreDelegates'),
    },
  };

  const {leftButton, screenComponent, title, bottom} =
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
                    onClick={closeModal}
                  />
                </Header>
                {screenComponent}
                {bottom}
              </div>
            </Sheet>
          </Wrapper>
        ) : null}
      </AnimatePresence>
    </LazyMotion>,
    document.body,
  );
};

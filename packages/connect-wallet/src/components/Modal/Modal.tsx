import {useCallback, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {
  Back,
  Cancel,
  IconButton,
  QuestionMark,
  useKeyPress,
  Text,
} from 'shared';

import {useDefaultConnectors} from '../../hooks/useDefaultConnectors';
import {useAppSelector} from '../../hooks/useAppState';
import {useIsMounted} from '../../hooks/useIsMounted';
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

export const Modal = () => {
  const {pendingConnector, pendingWallet} = useAppSelector(
    (state) => state.wallet,
  );
  const {connectors} = useDefaultConnectors();
  const {t} = useTranslation('Modal');
  const isMounted = useIsMounted();
  const {active, closeModal, navigation} = useModal();
  const escPress = useKeyPress('Escape');

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

  if (!active || !isMounted) {
    return null;
  }

  return createPortal(
    <Wrapper id="shopify-connect-wallet-modal-container">
      <Background onClick={handleBackdropPress} />
      <Sheet>
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
      </Sheet>
    </Wrapper>,
    document.body,
  );
};

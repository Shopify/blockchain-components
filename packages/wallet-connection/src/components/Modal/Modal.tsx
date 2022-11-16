import {useMemo} from 'react';

import {Background, Sheet, Header} from './style';
import {ConnectScreen, ConnectingScreen} from './Screens';
import {Screen} from './Screens/types';

import {IconButton} from '../IconButton';
import {ArrowLeft, Cancel} from '../../assets/icons';
import {ModalRoute, useModal} from '../../providers/ModalProvider';
import {useWalletConnection} from '../../providers/WalletConnectionProvider';

const ModalScreens: {[key in keyof typeof ModalRoute]: Screen} = {
  Connect: {
    title: 'Connect wallet',
    screen: <ConnectScreen />,
  },
  WhatAreWallets: {
    title: 'What is a wallet?',
    screen: null,
  },
  Connecting: {
    title: 'Connect with',
    screen: <ConnectingScreen />,
  },
  Scan: {
    title: 'Scan with',
    screen: null,
  },
};

const Modal = () => {
  const {active, closeModal, navigation} = useModal();
  const {pendingConnector} = useWalletConnection();
  const screenData = ModalScreens[navigation.route];

  const headerTitle = useMemo(() => {
    const {route} = navigation;

    if (route === ModalRoute.Connecting || route === ModalRoute.Scan) {
      return `${screenData.title} ${pendingConnector?.name}`;
    }

    return screenData.title;
  }, [pendingConnector, screen, screenData]);

  return (
    <Background $visible={active}>
      <Sheet>
        <Header>
          {navigation.goBack ? (
            <IconButton
              aria-label="Back"
              icon={ArrowLeft}
              onClick={navigation.goBack}
            />
          ) : null}

          <h2>{headerTitle}</h2>

          <IconButton aria-label="Close" icon={Cancel} onClick={closeModal} />
        </Header>

        {screenData.screen}
      </Sheet>
    </Background>
  );
};

export default Modal;

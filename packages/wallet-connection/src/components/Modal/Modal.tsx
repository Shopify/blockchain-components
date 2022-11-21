import {useMemo, useState} from 'react';
import {useConnect} from 'wagmi';

import {Background, Sheet, Header} from './style';
import {ConnectScreen, ConnectingScreen, Scan, WhatAreWallets} from './Screens';
import {Screen} from './Screens/types';

import {IconButton} from '../IconButton';
import {ArrowLeft, Cancel} from '../../assets/icons';
import {ModalRoute, useModal} from '../../providers/ModalProvider';
import {useWalletConnection} from '../../providers/WalletConnectionProvider';
import {ConnectionState} from '../../types/connectionState';

const ModalScreens: {[key in keyof typeof ModalRoute]: Screen} = {
  Connect: {
    title: 'Connect wallet',
  },
  Connecting: {
    title: 'Connect with',
  },
  GetAWallet: {
    title: 'Get a wallet',
  },
  Scan: {
    title: 'Scan with',
  },
  WhatAreWallets: {
    title: 'What is a wallet?',
  },
};

const Modal = () => {
  const {active, closeModal, navigation} = useModal();
  const {pendingConnector} = useWalletConnection();
  const screenData = ModalScreens[navigation.route];
  const [status, setStatus] = useState<ConnectionState>(
    ConnectionState.Connecting,
  );

  const {connect, connectAsync, connectors} = useConnect({
    onError: (error) => {
      setStatus(ConnectionState.Failed);
      console.error(
        `Caught error while attempting to connect with ${pendingConnector?.name} - ${error}`,
      );
    },
    onMutate: ({connector}) => {
      if (connector) {
        setStatus(ConnectionState.Connecting);
      } else {
        setStatus(ConnectionState.Unavailable);
      }
    },
    onSettled: (data, error) => {
      if (error) {
        if (error.message === 'User rejected request') {
          setStatus(ConnectionState.Rejected);
          return;
        }

        if (error.message === 'Connector already connected') {
          setStatus(ConnectionState.AlreadyConnected);
          return;
        }

        setStatus(ConnectionState.Failed);
      }

      if (data) {
        setStatus(ConnectionState.Connected);
      }
    },
  });

  const headerTitle = useMemo(() => {
    const {route} = navigation;

    if (route === ModalRoute.Connecting || route === ModalRoute.Scan) {
      return `${screenData.title} ${pendingConnector?.name}`;
    }

    return screenData.title;
  }, [pendingConnector, screen, screenData]);

  const screenComponent = useMemo(() => {
    switch (navigation.route) {
      case ModalRoute.Connect:
        return <ConnectScreen connect={connect} connectors={connectors} />;

      case ModalRoute.Connecting:
        return <ConnectingScreen connect={connect} state={status} />;

      case ModalRoute.Scan:
        return <Scan connectAsync={connectAsync} state={status} />;

      case ModalRoute.WhatAreWallets:
        return <WhatAreWallets />;

      default:
        return null;
    }
  }, [connect, connectors, navigation.route, status]);

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

        {screenComponent}
      </Sheet>
    </Background>
  );
};

export default Modal;

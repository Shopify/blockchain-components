import {useCallback, useMemo, useState} from 'react';
import {useConnect} from 'wagmi';
import {ArrowLeft, Cancel, IconButton} from 'shared';

import {useDefaultConnectors} from '../../hooks/useDefaultConnectors';
import {useAppSelector} from '../../hooks/useAppState';
import {ModalRoute, useModal} from '../../providers/ModalProvider';
import {ConnectionState} from '../../types/connectionState';

import {Background, Header, Sheet, Wrapper} from './style';
import {
  ConnectScreen,
  ConnectingScreen,
  GetAWalletScreen,
  ScanScreen,
  Screen,
  WhatAreWalletsScreen,
} from './Screens';

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

export const Modal = () => {
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {connectors} = useDefaultConnectors();
  const {active, closeModal, navigation} = useModal();
  const screenData = ModalScreens[navigation.route];
  const [status, setStatus] = useState<ConnectionState>(
    ConnectionState.Connecting,
  );

  const handleBackdropPress = useCallback(() => {
    if (!active) return;

    closeModal();
  }, [active, closeModal]);

  const {connect} = useConnect({
    onError: (error) => {
      setStatus(ConnectionState.Failed);
      console.error(
        `Caught error while attempting to connect with ${pendingConnector?.name} - ${error}`,
      );
    },
    onMutate: ({connector}) => {
      if (connector.ready) {
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

        // Close the modal if the connection is successful
        setTimeout(() => {
          closeModal();
        }, 500);
      }
    },
  });

  const headerTitle = useMemo(() => {
    const {route} = navigation;

    if (route === ModalRoute.Connecting || route === ModalRoute.Scan) {
      return `${screenData.title} ${pendingConnector?.name}`;
    }

    return screenData.title;
  }, [navigation, pendingConnector?.name, screenData.title]);

  const screenComponent = useMemo(() => {
    switch (navigation.route) {
      case ModalRoute.Connect:
        return <ConnectScreen connect={connect} connectors={connectors} />;

      case ModalRoute.Connecting:
        return <ConnectingScreen connect={connect} state={status} />;

      case ModalRoute.GetAWallet:
        return <GetAWalletScreen />;

      case ModalRoute.Scan:
        return <ScanScreen connect={connect} state={status} />;

      case ModalRoute.WhatAreWallets:
        return <WhatAreWalletsScreen />;

      default:
        return null;
    }
  }, [connect, connectors, navigation.route, status]);

  return (
    <Wrapper $visible={active}>
      <Background onClick={handleBackdropPress} />
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
    </Wrapper>
  );
};

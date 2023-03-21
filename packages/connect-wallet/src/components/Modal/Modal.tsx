import {eventNames} from '@shopify/blockchain-components';
import {useCallback, useEffect, useContext} from 'react';

import {Back, IconButton, QuestionMark, useKeyPress} from 'shared';

import {Modal as CommonModal} from '../Common';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppState';
import {useDisconnect} from '../../hooks/useDisconnect';
import {useMiddleware} from '../../hooks/useMiddleware';
import {useTranslation} from '../../hooks/useTranslation';
import {ConnectWalletContext} from '../../providers/ConnectWalletProvider';
import {closeModal, goBack, navigate} from '../../slices/modalSlice';
import {ModalRoute} from '../../types/modal';

import {
  ConnectScreen,
  ConnectingScreen,
  GetAWalletScreen,
  ScanScreen,
  SignatureScreen,
  WhatAreWalletsScreen,
} from './Screens';

export const Modal = () => {
  const dispatch = useAppDispatch();
  const {open, route} = useAppSelector((state) => state.modal);
  const {pendingConnector, pendingWallet} = useAppSelector(
    (state) => state.wallet,
  );
  const {
    connectors,
    enableDelegateCash,
    orderAttributionMode,
    requireSignature,
  } = useContext(ConnectWalletContext);
  const {disconnect} = useDisconnect();
  const escPress = useKeyPress('Escape');
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
      screen: <ConnectScreen connectors={connectors} />,
      title: t('title.Connect'),
    },
    Connecting: {
      leftButton: backButton,
      screen: <ConnectingScreen />,
      title: t('title.Connecting', {connector: pendingConnector?.name}),
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

  return (
    <CommonModal
      closeEventName="CONNECT_WALLET_MODAL_CLOSE_BUTTON_CLICKED"
      leftButton={leftButton}
      onDismiss={handleCloseModal}
      title={title}
      visible={open}
    >
      {screen}
    </CommonModal>
  );
};

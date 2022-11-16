import {Background, Sheet, Header, Title} from './style';
import {ConnectScreen} from './Screens';

import {IconButton} from '../IconButton';
import {ArrowLeft, Cancel} from '../../assets/icons';

export interface ModalProps {
  screen: 'Connect' | 'WhatAreWallets' | 'Connecting' | 'Scan';
  open: Boolean;
  onClose: () => void;
}

const ModalScreenData = {
  Connect: {
    title: 'Connect wallet',
    component: <ConnectScreen />,
  },
  WhatAreWallets: {
    title: 'What is a wallet?',
    component: null,
  },
  Connecting: {
    title: 'Connect with {provider}',
    component: null,
  },
  Scan: {
    title: 'Scan with {provider}',
    component: null,
  },
};

const Modal = ({screen, open, onClose: handleClose}: ModalProps) => {
  const showBackButton = screen !== 'Connect';
  const screenData = ModalScreenData[screen];

  return open ? (
    <Background _visible={true}>
      <Sheet>
        <Header>
          {showBackButton ? (
            <IconButton aria-label="Back" icon={ArrowLeft} />
          ) : null}

          <Title>{screenData.title}</Title>

          <IconButton aria-label="Close" icon={Cancel} onClick={handleClose}/>
        </Header>

        {screenData.component}
      </Sheet>
    </Background>
  ): null;
};

export default Modal;

import {useContext} from 'react';

import {ModalContext} from './context';

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

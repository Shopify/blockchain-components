import {createContext} from 'react';
import { useModal } from '../hooks';

interface ModalContextProps {
    isModalOpen: boolean;
    toggleModal?: () => void;
}

interface ModalProviderProps {
    children: any
}

const defaultModalState = {
    isModalOpen: false,
}

export const ModalContext = createContext<ModalContextProps>(defaultModalState);

export const ModalProvider = ({children}: ModalProviderProps) => {
    const [isModalOpen, toggleModal] = useModal({isModalOpen: defaultModalState.isModalOpen});

  return (
    <ModalContext.Provider value={{isModalOpen, toggleModal}}>
          {children}
    </ModalContext.Provider>
  );
};


// let ModalContext;
// let { Provider } = (ModalContext = React.createContext());

// let ModalProvider = ({ children }) => {
//   let { modal, handleModal, modalContent } = useModal();
//   return (
//     <Provider value={{ modal, handleModal, modalContent }}>
//       <Modal />
//       {children}
//     </Provider>
//   );
// };

// export { ModalContext, ModalProvider };

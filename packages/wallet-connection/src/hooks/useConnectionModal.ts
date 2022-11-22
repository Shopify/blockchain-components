import {useModal} from '../providers/ModalProvider';

export function useConnectionModal() {
  const {closeModal, showModal} = useModal();

  return {
    closeConnectionModal: closeModal,
    openConnectionModal: showModal,
  };
}

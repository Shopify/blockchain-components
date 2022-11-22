import {useModal} from '../providers/ModalProvider';

export function useConnectionModal() {
  const {closeModal, openModal} = useModal();

  return {
    closeModal,
    openModal,
  };
}

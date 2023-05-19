import {useCallback} from 'react';

import {useStore} from '~/state';

export function useConnectionModal() {
  const {closeModal, openModal} = useStore((state) => state.modal);

  const closeModalExternal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const openModalExternal = useCallback(() => {
    openModal();
  }, [openModal]);

  return {
    closeModal: closeModalExternal,
    openModal: openModalExternal,
  };
}

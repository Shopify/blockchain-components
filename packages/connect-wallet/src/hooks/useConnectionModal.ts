import {useCallback} from 'react';

import {useAppDispatch} from './useAppState';

import {closeModal, openModal} from '~/slices/modalSlice';

export function useConnectionModal() {
  const dispatch = useAppDispatch();

  const closeModalExternal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const openModalExternal = useCallback(() => {
    dispatch(openModal());
  }, [dispatch]);

  return {
    closeModal: closeModalExternal,
    openModal: openModalExternal,
  };
}

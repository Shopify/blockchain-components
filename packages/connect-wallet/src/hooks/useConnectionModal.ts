import {useCallback} from 'react';
import {closeModal, openModal} from '../slices/modalSlice';

import {useAppDispatch} from './useAppState';

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

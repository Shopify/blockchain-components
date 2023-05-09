import {useContext} from 'react';
import {useConnect as useWagmiConnect} from 'wagmi';

import {useAppDispatch, useAppSelector} from './useAppState';

import {ConnectWalletContext} from '~/providers/ConnectWalletProvider';
import {closeModal, navigate, setConnectionStatus} from '~/slices/modalSlice';

export function useConnect() {
  const dispatch = useAppDispatch();
  const {pendingConnector} = useAppSelector((state) => state.wallet);
  const {requireSignature} = useContext(ConnectWalletContext);

  const {connect} = useWagmiConnect({
    onMutate: ({connector}) => {
      if (connector.ready) {
        dispatch(setConnectionStatus('Connecting'));
      } else {
        dispatch(setConnectionStatus('Unavailable'));
      }
    },
    onSettled: (_, error) => {
      if (error) {
        if (error.message === 'User rejected request') {
          dispatch(setConnectionStatus('Rejected'));
          return;
        }

        if (error.message !== 'Connector already connected') {
          dispatch(setConnectionStatus('Failed'));
          console.error(
            `Caught error while attempting to connect with ${pendingConnector?.name} - ${error}`,
          );
          return;
        }
      }

      dispatch(setConnectionStatus('Connected'));

      /**
       * We should close the modal if we're not utilizing requireSignature,
       * otherwise we should navigate to a new screen. This is wrapped in a
       * setTimeout so we can show the user that their connection succeeded.
       */
      setTimeout(() => {
        if (requireSignature) {
          dispatch(navigate('Signature'));
        } else {
          dispatch(closeModal());
        }
      }, 500);
    },
  });

  return {connect};
}

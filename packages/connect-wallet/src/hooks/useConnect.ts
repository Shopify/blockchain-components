import {useContext} from 'react';
import {useConnect as useWagmiConnect} from 'wagmi';

import {ConnectWalletContext} from '~/providers/ConnectWalletProvider';
import {useStore} from '~/state';

export function useConnect() {
  const [{closeModal, navigate, setConnectionStatus}, {pendingConnector}] =
    useStore((state) => [state.modal, state.wallet]);
  const {requireSignature} = useContext(ConnectWalletContext);

  const {connect} = useWagmiConnect({
    onMutate: ({connector}) => {
      if (connector.ready) {
        setConnectionStatus('Connecting');
      } else {
        setConnectionStatus('Unavailable');
      }
    },
    onSettled: (_, error) => {
      if (error) {
        if (error.message === 'User rejected request') {
          setConnectionStatus('Rejected');
          return;
        }

        if (error.message !== 'Connector already connected') {
          setConnectionStatus('Failed');
          console.error(
            `Caught error while attempting to connect with ${pendingConnector?.name} - ${error}`,
          );
          return;
        }
      }

      setConnectionStatus('Connected');

      /**
       * We should close the modal if we're not utilizing requireSignature,
       * otherwise we should navigate to a new screen. This is wrapped in a
       * setTimeout so we can show the user that their connection succeeded.
       */
      setTimeout(() => {
        if (requireSignature) {
          navigate('Signature');
        } else {
          closeModal();
        }
      }, 500);
    },
  });

  return {connect};
}

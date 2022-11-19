import {useConnect as wagmiUseConnect, useNetwork} from 'wagmi';

export function useConnect() {
  const {chains} = useNetwork();
  const {connectAsync, connectors} = wagmiUseConnect({
    onError(err) {
      if (err.message) {
        if (err.message !== 'User rejected request') {
          console.debug(err.message, err);
        }
      } else {
        console.debug(`Could not connect. See console for more details.`, err);
      }
    },
  });
  return {
    connectAsync: ({...props}) =>
      connectAsync({
        ...props,
        chainId: chains[0]?.id,
      }),
    connectors,
  };
}

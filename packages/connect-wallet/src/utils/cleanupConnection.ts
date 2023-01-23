import {ConnectorData} from '@wagmi/core';

export function cleanupConnection(provider: ConnectorData['provider']) {
  const connection = provider?.signer?.connection;

  if (connection?.on && connection?.off) {
    const closeCallback = () => {
      cleanup();
    };

    const cleanup = () => {
      connection.off('close', closeCallback);
      connection.off('open', cleanup);
    };

    connection.on('close', closeCallback);
    connection.on('open', cleanup);
  }
}

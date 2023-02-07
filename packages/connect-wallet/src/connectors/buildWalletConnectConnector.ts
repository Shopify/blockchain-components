import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';

const mappedConnectors = new Map<string, WalletConnectConnector>();

// Reused type creation from @wagmi/walletConnect
type WalletConnectConnectorProps = ConstructorParameters<
  typeof WalletConnectConnector
>[0];

type BuildConnectorProps = Pick<WalletConnectConnectorProps, 'chains'> & {
  desktopLinks?: string[];
  mobileLinks?: string[];
  qrcode?: boolean;
};

/**
 * Builds a WalletConnect connector to use in place of an absent connector.
 */
export const buildWalletConnectConnector = ({
  chains,
  desktopLinks,
  mobileLinks,
  qrcode = false,
}: BuildConnectorProps): WalletConnectConnector => {
  const options: WalletConnectConnectorProps = {
    chains,
    options: {
      qrcodeModalOptions: {
        desktopLinks,
        mobileLinks,
      },
      qrcode,
    },
  };

  // Stringify our options so we can store them in our map for lookup later.
  const stringifiedOptions = JSON.stringify(options);

  // See if our map contains a connector with these options already.
  const existingConnector = mappedConnectors.get(stringifiedOptions);

  // If the connector exists, prefer using the same connector instead of creating a new one.
  if (existingConnector) {
    return existingConnector;
  }

  // A connector didn't exist in our map, so we can create on here.
  const connector = new WalletConnectConnector(options);

  // Add the newly created connector to our map for use later.
  mappedConnectors.set(stringifiedOptions, connector);

  return connector;
};

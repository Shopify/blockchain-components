import {configureChains} from 'wagmi';
import {mainnet} from 'wagmi/chains';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {publicProvider} from 'wagmi/providers/public';

import {SerializedConnector} from '~/types/connector';

export const DEFAULT_SERIALIZED_CONNECTOR: SerializedConnector = {
  id: 'metaMask',
  name: 'MetaMask',
  qrCodeSupported: false,
};

export const {chains: CHAINS} = configureChains([mainnet], [publicProvider()]);

const INJECTED_CONNECTOR = new InjectedConnector({
  chains: [mainnet],
});

export const CUSTOM_CONNECTOR = {
  icon: null,
  id: 'customConnector',
  name: 'Custom Connector',
  qrCodeSupported: false,
  connector: INJECTED_CONNECTOR,
};

export const DEFAULT_CONNECTOR_COLLECTION = [
  'metaMask',
  'rainbow',
  'ledger',
  'walletConnect',
];

import {Chain} from 'wagmi';
import {MetaMaskConnector} from 'wagmi/dist/connectors/metaMask';
import {WalletConnectConnector} from 'wagmi/dist/connectors/walletConnect';

export const defaultConnectors = ({chains}: {chains: Chain[]}) => {
  return [
    new MetaMaskConnector({chains}),
    new WalletConnectConnector({chains, options: {qrcode: true}}),
  ];
};

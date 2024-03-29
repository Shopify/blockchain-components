import {PublicClient} from 'viem';
import {Address, Chain} from 'wagmi';
import {StateCreator} from 'zustand';

import type {ConnectionState} from '~/types/connectionState';
import {SerializedConnector} from '~/types/connector';
import type {ModalRoute, SerializedErrorContent} from '~/types/modal';
import {SignatureResponse, Wallet} from '~/types/wallet';

export interface FetchEnsProps {
  address: Address;
  chain: Chain;
  client: PublicClient;
}

export interface ModalStateDefintion {
  connectionStatus: ConnectionState;
  error?: SerializedErrorContent | undefined;
  history: ModalRoute[];
  open: boolean;
  route: ModalRoute;
  signing: boolean;
}

export interface ModalStateActions {
  closeModal: () => void;
  goBack: () => void;
  navigate: (route: ModalRoute) => void;
  openModal: () => void;
  reset: () => void;
  setConnectionStatus: (status: ConnectionState) => void;
  setError: (error?: SerializedErrorContent) => void;
  setSigning: (value: boolean) => void;
}

export interface WalletStateDefintion {
  activeWallet?: Wallet;
  connectedWallets: Wallet[];
  message?: string;
  pendingConnector: SerializedConnector | undefined;
  pendingWallet: Wallet | undefined;
}

export interface WalletStateActions {
  addWallet: (wallet: Wallet) => void;
  fetchEns: (props: FetchEnsProps) => Promise<void>;
  setActiveWallet: (wallet: Wallet | undefined) => void;
  setPendingConnector: (connector: SerializedConnector | undefined) => void;
  setPendingWallet: (wallet: Wallet | undefined) => void;
  removeWallet: (wallet: Wallet) => void;
  updateWallet: (wallet: Wallet) => void;
  validatePendingWallet: (response: SignatureResponse) => Promise<void>;
}

export type ModalStateType = ModalStateActions & ModalStateDefintion;
export type WalletStateType = WalletStateActions & WalletStateDefintion;

export interface CombinedState {
  modal: ModalStateType;
  wallet: WalletStateType;
}

export type StateSlice<T> = StateCreator<
  CombinedState,
  [['zustand/immer', never], ['logger', never]],
  [['zustand/persist', unknown]],
  T
>;

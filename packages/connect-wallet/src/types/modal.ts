export interface SerializedErrorContent {
  message?: string;
  name?: string;
}

export type ModalRoute =
  | 'Connect'
  | 'Connecting'
  | 'DelegateWallets'
  | 'GetAWallet'
  | 'Scan'
  | 'Signature'
  | 'WhatAreWallets';

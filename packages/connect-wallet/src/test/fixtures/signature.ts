import {SiweMessage} from 'siwe';
import {Address} from 'wagmi';

import {SignatureResponse} from '~/types/wallet';

export const MOCK_MESSAGE_DATA = {
  address: '0xc223594946c60217Ed53096eEC6C179964e536EB',
  chainId: 1,
  domain: 'localhost',
  nonce: 'NAghkPB8sUBqz6s6W',
  uri: 'http://localhost:5173',
  version: '1',
  issuedAt: '2023-01-30T16:24:40.222Z',
};

export const MOCK_MESSAGE = new SiweMessage(MOCK_MESSAGE_DATA);

export const VALID_SIGNATURE_RESPONSE: SignatureResponse = {
  address: MOCK_MESSAGE.address as Address,
  message: JSON.stringify(MOCK_MESSAGE),
  nonce: MOCK_MESSAGE_DATA.nonce,
  signature:
    '0x9ad835c2b18011cfb08798e856ab39b5d4595273c950fbc4f3b7703bbe7f7d026b556c0bff38829e686d9c495274aa2bde80bc06cfa97521b58f9ff9437d95b91b',
};

export const INVALID_SIGNATURE_RESPONSE: SignatureResponse = {
  address: MOCK_MESSAGE.address as Address,
  message: JSON.stringify(MOCK_MESSAGE),
  nonce: MOCK_MESSAGE_DATA.nonce,
  signature:
    '0x0aa04781e381e84b1494d00245b5232ed9106377f541256bb504b75a04a9d2be2e895e4aab9cae3af41344e43ae7d5885202b66b2fa29d4c4443871cfaa575671c',
};

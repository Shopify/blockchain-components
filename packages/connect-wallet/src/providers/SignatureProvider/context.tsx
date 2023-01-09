import {createContext} from 'react';

import {SignatureResponse} from '../../types/wallet';

export interface SignatureProviderValue {
  signing?: boolean;
  signMessage: (props?: {message?: string}) => Promise<SignatureResponse>;
  signOnConnect?: boolean;
}

const defaultContextValue: SignatureProviderValue = {
  signing: false,
  // eslint-disable-next-line @typescript-eslint/require-await
  signMessage: async () => undefined,
};

export const SignatureContext =
  createContext<SignatureProviderValue>(defaultContextValue);

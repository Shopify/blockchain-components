import {
  getGateContextClient,
  undefinedGateContextGenerator,
} from '@shopify/gate-context-client';

import {OrderAttributionMode} from '~/types/orderAttribution';
import {ConnectWalletError} from '~/utils/error';

export interface AttributeOrderResponse {
  orderAttributionMode: OrderAttributionMode;
  wallet: {address: string; vaults?: string[]};
}

export async function attributeOrder({
  wallet,
  orderAttributionMode,
}: AttributeOrderResponse) {
  if (orderAttributionMode === 'disabled') {
    return {
      orderAttributionMode,
    };
  }

  const {address, vaults} = wallet;

  if (orderAttributionMode === 'ignoreErrors') {
    gateContextClient
      .write({
        walletAddress: address,
        vaults,
      })
      .catch((error: any) =>
        console.error(
          new ConnectWalletError(
            'Error attributing order--ignoring due to orderAttributionMode=ignoreErrors',
          ),
          error,
        ),
      );

    return {
      orderAttributionMode,
    };
  }

  if (!address) {
    throw new ConnectWalletError('Missing payload during order attribution');
  }

  try {
    await gateContextClient.write({
      walletAddress: address,
      vaults,
    });

    return {
      orderAttributionMode,
      address,
      vaults,
    };
  } catch (error) {
    throw new ConnectWalletError((error as any)?.message || error);
  }
}

export const gateContextClient = getGateContextClient({
  backingStore: 'ajaxApi',
  shopifyGateContextGenerator: undefinedGateContextGenerator,
});

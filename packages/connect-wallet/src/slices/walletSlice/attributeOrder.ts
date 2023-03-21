import {createAsyncThunk} from '@reduxjs/toolkit';

import {OrderAttributionMode} from '../../types/orderAttribution';
import {ConnectWalletError} from '../../utils/error';

import {gateContextClient} from './gateContextClient';

export interface AttributeOrderResponse {
  orderAttributionMode: OrderAttributionMode;
  wallet: {address: string; vaults?: string[]};
}

export const attributeOrder = createAsyncThunk<
  {orderAttributionMode: OrderAttributionMode},
  AttributeOrderResponse
>(
  'wallet/attributeOrder',
  async ({wallet, orderAttributionMode}: AttributeOrderResponse, thunkApi) => {
    const fulfill = (attributes: Record<string, any> = {}) =>
      thunkApi.fulfillWithValue({orderAttributionMode, ...attributes});

    if (orderAttributionMode === 'disabled') return fulfill();

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

      return fulfill();
    }

    if (!address) {
      return thunkApi.rejectWithValue(
        'Missing payload during order attribution',
      );
    }

    try {
      await gateContextClient.write({
        walletAddress: address,
        vaults,
      });
      return fulfill({address, vaults});
    } catch (error) {
      return thunkApi.rejectWithValue((error as any)?.message || error);
    }
  },
);

import {createAsyncThunk} from '@reduxjs/toolkit';

import {OrderAttributionMode} from '../../types/orderAttribution';
import {ConnectWalletError} from '../../utils/error';

import {gateContextClient} from './gateContextClient';

export interface AttributeOrderResponse {
  orderAttributionMode: OrderAttributionMode;
  wallet: {address: string};
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

    if (orderAttributionMode === 'ignoreErrors') {
      gateContextClient
        .write({walletAddress: wallet.address})
        .catch((error: any) =>
          console.error(
            new ConnectWalletError(
              'Error attributing order--ignoring due to orderAttributionMode=ignoreErrors',
            ),
            error,
          ),
        );

      return thunkApi.fulfillWithValue({orderAttributionMode});
    }

    if (!wallet.address) {
      return thunkApi.rejectWithValue(
        'Missing payload during order attribution',
      );
    }

    const {address} = wallet;
    try {
      await gateContextClient.write({walletAddress: address});
      return fulfill({address});
    } catch (error) {
      return thunkApi.rejectWithValue((error as any)?.message || error);
    }
  },
);

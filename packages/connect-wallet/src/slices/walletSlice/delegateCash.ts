import {createAsyncThunk} from '@reduxjs/toolkit';
import {DelegateCash} from 'delegatecash';

import {DelegationInfo} from '../../types/delegateCash';

export const fetchDelegates = createAsyncThunk(
  'wallet/fetchDelegates',
  async (walletAddress: string, thunkApi) => {
    const delegateCash = new DelegateCash();
    const delegationInfoList: DelegationInfo[] =
      await delegateCash.getDelegationsByDelegate(walletAddress);

    const allDelegationInfoList = delegationInfoList.filter(
      (delegationInfo) => delegationInfo.type === 'ALL',
    );

    const delegatedWalletAddresses = allDelegationInfoList.map(
      (delegationInfo) => delegationInfo.vault,
    );

    if (delegatedWalletAddresses.length) {
      return thunkApi.fulfillWithValue({
        address: walletAddress,
        delegatedWalletAddresses,
      });
    }
  },
);

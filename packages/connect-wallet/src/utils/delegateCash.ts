import {DelegateCash} from 'delegatecash';

import {DelegationInfo} from '../types/delegateCash';

export async function lookupDelegatedWalletAddresses(walletAddress: string) {
  const delegateCash = new DelegateCash();
  const delegationInfoList: DelegationInfo[] =
    await delegateCash.getDelegationsByDelegate(walletAddress);

  const allDelegationInfoList = delegationInfoList.filter(
    (delegationInfo) => delegationInfo.type === 'ALL',
  );
  const delegatedWalletAddresses = allDelegationInfoList.map(
    (delegationInfo) => delegationInfo.vault,
  );
  return delegatedWalletAddresses;
}

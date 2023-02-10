import {DelegateCash} from 'delegatecash';

import {DelegationInfo} from '../types/delegateCash';

// Leaving a note here as this might change (e.g. we can probably move this to
// an async thunk and have the information dispatch directly to state on
// completion)
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

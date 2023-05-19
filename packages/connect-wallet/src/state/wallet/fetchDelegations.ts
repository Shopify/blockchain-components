import {DelegateCash} from 'delegatecash';
import {Address} from 'wagmi';

export async function fetchDelegations(address: Address) {
  const delegateCash = new DelegateCash();
  const delegations = await delegateCash.getDelegationsByDelegate(address);

  // Delegation type can be 'ALL', 'CONTRACT', 'TOKEN', or 'NONE'.
  // For delegation type 'ALL', the vault wallet delegates all actions to the delegate wallet.
  // We filter by 'ALL' since we only want to handle delegations for the entire wallet.
  const delegationsFilteredByAllType = delegations.filter(
    (delegation) => delegation.type === 'ALL',
  );

  // Get only the vault wallet addresses
  const vaults = delegationsFilteredByAllType.map(
    (delegation) => delegation.vault as Address,
  );

  return vaults;
}

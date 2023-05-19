import {FetchEnsProps} from '../types';

import {isDefaultProvider} from '~/utils/provider';

export async function fetchEns({address, chain, provider}: FetchEnsProps) {
  // Check if the package initialization is using only the default provider.
  const isDefault = isDefaultProvider({chain, provider});
  if (isDefault) {
    console.warn(
      `@shopify/connect-wallet -- fetchEns dispatched with only a public provider present.`,
    );
  }

  // Lookup the ENS name for the provided address.
  const ensName = await provider.lookupAddress(address);

  // If we don't get an ENS name back we can exit here and avoid making another
  // request against the provider.
  if (ensName === null) {
    return undefined;
  }

  // Unlikely, but per the suggestion of the ENS documentation we should double check
  // that the resolved ENS name for an address matches resolves back to the original
  // address which we looked up the ENS name for.
  const resolvedAddress = await provider.resolveName(ensName);

  // Pending there is no mismatch, we set the payload.ensName to the ensName we
  // resolved from provider.lookupAddress.
  if (resolvedAddress === address) {
    return ensName;
  }

  return undefined;
}

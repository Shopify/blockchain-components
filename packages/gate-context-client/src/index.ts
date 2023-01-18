import {GateContextClientOptions, ShopifyGateContextGenerator} from './types';
import {getGateContextCartAjaxClient} from './cartAjaxApi';

export function getGateContextClient<TGateContext>(
  options: GateContextClientOptions<TGateContext>,
) {
  if (options.backingStore === 'ajaxApi') {
    return getGateContextCartAjaxClient(options);
  }

  throw new Error(`Unsupported backing store: ${options.backingStore}`);
}

export type {GateContextClient} from './types';
export type {GateContextClientOptions} from './types';

export function identityGateContextGenerator<T>(value: T) {
  return Promise.resolve(value);
}

export const undefinedGateContextGenerator: ShopifyGateContextGenerator<
  undefined
> = (_) => Promise.resolve(undefined);

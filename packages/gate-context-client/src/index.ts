import {GateContextClientOptions} from 'types';

import {getGateContextCartAjaxClient} from './cartAjaxApi';

export function getGateContextClient<TGateContext>(
  options: GateContextClientOptions<TGateContext>,
) {
  if (options.backingStore === 'ajaxApi') {
    return getGateContextCartAjaxClient(options);
  }

  throw new Error(`Unsupported backing store: ${options.backingStore}`);
}

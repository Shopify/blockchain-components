/**
 * The Ajax API implementation of the gate context. The gate context is
 * the abstraction that refers to how gate unlocking information is stored
 * without specific references to the backing store.
 */
import {
  GateContextClient,
  GateContextClientOptions,
  GateContextInput,
  GateContextWriteResponse,
  ShopifyGateContextGenerator,
} from 'types';

import {getShopifyRootRoute} from './shopify';
import {CartAjaxAPICartAttributes} from './types';

const AJAX_API_UPDATE_URL = getUpdateUrl();

/**
 * Writes the wallet address and related information (if given) in the
 * cart attributes using the Ajax API.
 */
async function write<TGateContext, TRawResponse>(
  data: GateContextInput,
  options: GateContextClientOptions<TGateContext>,
): Promise<GateContextWriteResponse<TRawResponse>> {
  const attributes = await getAttributes<TGateContext>(
    data,
    options.shopifyGateContextGenerator,
  );
  const response = await fetch(AJAX_API_UPDATE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      attributes,
    }),
  });
  const json = await response.json();
  return {
    raw: json,
  };
}

/**
 * The update URL is determined based on the environment and
 * whether certain global variables are defined.
 */
function getUpdateUrl() {
  return `${getCartAjaxApiRoutePrefix()}cart/update.js`;
}

function getCartAjaxApiRoutePrefix() {
  return getShopifyRootRoute();
}

/**
 * Translates the properties of the gate context into their names as cart
 * attributtes. @see CartAjaxAPICartAttributes for more information on the naming
 * of these properties.
 */
async function getAttributes<TGateContext>(
  gateContextInput: GateContextInput,
  gateContextGenerator: ShopifyGateContextGenerator<TGateContext>,
): Promise<CartAjaxAPICartAttributes<TGateContext>> {
  const _shopify_gate_context = await gateContextGenerator(gateContextInput);

  return {
    'Wallet Address': gateContextInput.walletAddress,
    // the shopify gate context is a special attribute that is not copied to the
    // order attributes. It's intended that this data contains everything needed
    // to evaluate the gate.
    _shopify_gate_context,
  };
}

export function getGateContextCartAjaxClient<TGateContext>(
  options: GateContextClientOptions<TGateContext>,
): GateContextClient {
  return {
    write: <TCartAjaxApiResponse>(data: GateContextInput) =>
      write<TGateContext, TCartAjaxApiResponse>(data, options),
  };
}

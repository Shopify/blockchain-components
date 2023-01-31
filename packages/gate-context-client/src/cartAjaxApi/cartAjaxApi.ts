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
} from '../types';

import {CartAjaxApiError, CartAjaxApiNotSupportedError} from './errors';
import {getShopifyRootRoute, isShopifyStore} from './shopify';
import {CartAjaxAPICartAttributes, CartAjaxApiResponse} from './types';

const AJAX_API_UPDATE_URL = getUpdateUrl();

async function read(): Promise<unknown> {
  if (!isCartAjaxApiSupported()) {
    return Promise.reject(new CartAjaxApiNotSupportedError());
  }
  const response = await fetch(`${getCartAjaxApiRoutePrefix()}cart.js`);
  const json = await response.json();
  if (!isCartAjaxResponse(json)) {
    return Promise.reject(new CartAjaxApiError('invalid cart ajax response'));
  }

  const {_shopify_gate_context: gateContextJson} = json.attributes;
  if (gateContextJson === undefined) return gateContextJson;

  return JSON.parse(gateContextJson);
}

function isCartAjaxResponse(response?: any): response is CartAjaxApiResponse {
  if (!response) return false;
  if (!response.attributes) return false;
  if (!response.token) return false;
  if (typeof response.attributes !== 'object') return false;

  return true;
}

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
  if (!isCartAjaxApiSupported()) {
    return Promise.reject(new CartAjaxApiNotSupportedError());
  }

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

function isCartAjaxApiSupported() {
  return isShopifyStore(window);
}

/**
 * Translates the properties of the gate context into their names as cart
 * attributtes. @see CartAjaxAPICartAttributes for more information on the naming
 * of these properties.
 */
async function getAttributes<TGateContext>(
  gateContextInput: GateContextInput,
  gateContextGenerator: ShopifyGateContextGenerator<TGateContext>,
): Promise<CartAjaxAPICartAttributes> {
  const shopify_gate_context = await gateContextGenerator(gateContextInput);

  const defaultAttributes = {
    'Wallet Address': gateContextInput.walletAddress,
  };

  if (typeof shopify_gate_context !== 'undefined') {
    // the shopify gate context is a special attribute that is not copied to the
    // order attributes. It's intended that this data contains everything needed
    // to evaluate the gate.
    return {
      ...defaultAttributes,
      // the shopify gate context must be stringified because we may not have nested attributes
      _shopify_gate_context: JSON.stringify(shopify_gate_context),
    };
  }

  return defaultAttributes;
}

export function getGateContextCartAjaxClient<TGateContext>(
  options: GateContextClientOptions<TGateContext>,
): GateContextClient {
  return {
    write: <TCartAjaxApiResponse>(data: GateContextInput) =>
      write<TGateContext, TCartAjaxApiResponse>(data, options),
    read,
  };
}

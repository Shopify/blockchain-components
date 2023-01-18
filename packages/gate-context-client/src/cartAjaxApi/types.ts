export interface CartAjaxAPICartAttributes<TGateContext> {
  'Wallet Address': string;
  // this is a special variable name that doesn't get copied
  // over to the order.
  _shopify_gate_context?: TGateContext;
}

export interface ShopifyObject {
  routes: {
    root: string;
  };
}

export interface CartAjaxApiResponse {
  attributes: Record<string, string>;
  token: string;
}

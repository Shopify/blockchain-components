import {ShopifyObject} from './types';

function isShopifyStore(
  win?: Window,
): win is Window & {Shopify: ShopifyObject} {
  return win && (win as any).Shopify;
}

export function getShopifyRootRoute(): string {
  if (!isShopifyStore(window)) return '';

  return window.Shopify.routes.root;
}

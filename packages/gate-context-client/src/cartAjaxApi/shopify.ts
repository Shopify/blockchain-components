import {ShopifyObject} from './types';

export function isShopifyStore(
  win?: Window,
): win is Window & {Shopify: ShopifyObject} {
  return win && (win as any).Shopify;
}

export function getShopifyRootRoute(): string {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!window) return '';

  if (!isShopifyStore(window)) return '';

  return window.Shopify.routes.root;
}

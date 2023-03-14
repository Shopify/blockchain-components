import {SHOPIFY_Y, SHOPIFY_S} from './const';

export interface ShopifyCookies {
  /** Shopify unique user token: Value of `_shopify_y` cookie. */
  [SHOPIFY_Y]: string;
  /** Shopify session token: Value of `_shopify_s` cookie. */
  [SHOPIFY_S]: string;
}

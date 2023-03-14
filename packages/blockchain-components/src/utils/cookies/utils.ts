import {parse} from 'worktop/cookie';

import {SHOPIFY_S, SHOPIFY_Y} from './const';
import {ShopifyCookies} from './types';

export const getShopifyCookies = (cookies: string): ShopifyCookies => {
  const cookieData = parse(cookies);
  return {
    [SHOPIFY_Y]: cookieData[SHOPIFY_Y] || '',
    [SHOPIFY_S]: cookieData[SHOPIFY_S] || '',
  };
};

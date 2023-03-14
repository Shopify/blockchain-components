import {getShopifyCookies, SHOPIFY_Y, SHOPIFY_S} from '../cookies';

import {ClientBrowserParameters} from './types';

export const getClientBrowserParameters = (): ClientBrowserParameters => {
  if ((document as any) === undefined) {
    return {
      uniqueToken: '',
      visitToken: '',
      url: '',
      path: '',
      search: '',
      referrer: '',
      title: '',
      userAgent: '',
    };
  }

  const cookies = getShopifyCookies(document.cookie);

  return {
    uniqueToken: cookies[SHOPIFY_Y],
    visitToken: cookies[SHOPIFY_S],
    url: location.href,
    path: location.pathname,
    search: location.search,
    referrer: document.referrer,
    title: document.title,
    userAgent: navigator.userAgent,
  };
};

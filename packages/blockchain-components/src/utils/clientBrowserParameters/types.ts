export interface ClientBrowserParameters {
  /**
   * Shopify unique user token: Value of `_shopify_y` cookie.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  uniqueToken: string;
  /**
   * Shopify session token: Value of `_shopify_s` cookie.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  visitToken: string;
  /**
   * Value of `window.location.href`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  url: string;
  /**
   * Value of `window.location.pathname`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  path: string;
  /**
   * Value of `window.location.search`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  search: string;
  /**
   * Value of `window.location.referrer`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  referrer: string;
  /**
   * Value of `document.title`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  title: string;
  /**
   * Value of `navigator.userAgent`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  userAgent: string;
}

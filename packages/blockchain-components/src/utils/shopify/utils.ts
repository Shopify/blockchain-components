import {shopifyServices} from './const';
import {WindowWithShopifyAnalytics} from './types';

/**
 * @param {string} pathname The client's complete URL's pathname
 * @returns {string} A string that represents the Shopify Service the URL corresponds to (Checkout, PDP, other)
 */
export const getShopifyServiceName = (pathname?: string) => {
  const shopifyServiceFromWindowShopifyAnalytics =
    getShopifyServiceFromWindowShopifyAnalytics();
  if (shopifyServiceFromWindowShopifyAnalytics)
    return shopifyServiceFromWindowShopifyAnalytics.name;

  const shopifyServiceFromPathname = getShopifyServiceFromPathname(pathname);
  if (shopifyServiceFromPathname) return shopifyServiceFromPathname.name;

  return shopifyServices.OTHER.name;
};

/**
 * @returns {ShopifyService} The service that corresponds to the window's Shopify Analytics pageType
 */
export const getShopifyServiceFromWindowShopifyAnalytics = () => {
  const shopifyAnalyticsPageType = getShopifyAnalyticsMetaPage()?.pageType;

  if (!shopifyAnalyticsPageType) return;

  const servicesValues = Object.values(shopifyServices);
  return servicesValues.find(
    (service) => shopifyAnalyticsPageType === service.shopifyAnalyticsPageType,
  );
};

/**
 * @param {string} pathname The client's complete URL's pathname
 * @returns {ShopifyService} The service that corresponds to the pathname
 */
export const getShopifyServiceFromPathname = (pathname?: string) => {
  if (pathname === undefined) return;
  if (pathname === '/') return shopifyServices.HOME;

  const servicesValues = Object.values(shopifyServices);
  return servicesValues.find(
    (service) =>
      service.pathname && new RegExp(`/${service.pathname}(/)*`).exec(pathname),
  );
};

/**
 * @returns {{pageType: string; resourceId: number; resourceType: string;} | null} The Window's ShopifyAnalytics object
 */
export const getShopifyAnalyticsMetaPage = () => {
  return (window as WindowWithShopifyAnalytics | undefined)?.ShopifyAnalytics
    ?.meta.page;
};

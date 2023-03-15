import {shopifyServices} from './const';

/**
 * @param {string} pathname The client's complete URL's pathname
 * @returns {string} A string that represents the Shopify Service the URL corresponds to (Checkout, PDP, other)
 */
export const getShopifyService = (pathname: string) => {
  const servicesValues = Object.values(shopifyServices);
  const currentService = servicesValues.find(
    (service) =>
      service.pathname && new RegExp(`/${service.pathname}(/)*`).exec(pathname),
  );
  return currentService?.name ?? shopifyServices.OTHER.name;
};

import {ShopifyService} from './types';

export const shopifyServices: Record<string, ShopifyService> = {
  CART: {name: 'Cart', pathname: 'cart'},
  CHECKOUT: {name: 'Checkout', pathname: 'checkouts'},
  COLLECTION: {
    name: 'Collections',
    pathname: 'collections',
    shopifyAnalyticsPageType: 'collection',
  },
  HOME: {name: 'HOME', shopifyAnalyticsPageType: 'home'},
  OTHER: {name: 'Other'},
  PAGE: {name: 'Pages', pathname: 'pages', shopifyAnalyticsPageType: 'page'},
  PDP: {
    name: 'Product Details Page',
    pathname: 'products',
    shopifyAnalyticsPageType: 'product',
  },
};

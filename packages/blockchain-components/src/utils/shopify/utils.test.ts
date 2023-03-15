import {getShopifyServiceName} from './utils';
import {shopifyServices} from './const';

describe('shopify - utils', () => {
  describe('getShopifyServiceName', () => {
    describe('using window.ShopifyAnalytics', () => {
      const originalWindow = window;

      afterEach(() => {
        // eslint-disable-next-line no-global-assign
        window = originalWindow;
      });

      beforeEach(() => {
        (window as any).ShopifyAnalytics = {meta: {page: {}}};
      });

      it('returns Product Details Page for products pageType', () => {
        (window as any).ShopifyAnalytics.meta.page = {
          pageType: 'product',
          resourceId: 5301989212320,
          resourceType: 'product',
        };

        expect(getShopifyServiceName('')).toBe(shopifyServices.PDP.name);
      });

      it('returns Collections for collections pageType', () => {
        (window as any).ShopifyAnalytics.meta.page = {
          pageType: 'collection',
          resourceId: 287794266272,
          resourceType: 'collection',
        };

        expect(getShopifyServiceName('')).toBe(shopifyServices.COLLECTION.name);
      });

      it('returns Pages for pages pageType', () => {
        (window as any).ShopifyAnalytics.meta.page = {
          pageType: 'page',
          resourceId: 61460218016,
          resourceType: 'page',
        };

        expect(getShopifyServiceName('')).toBe(shopifyServices.PAGE.name);
      });

      it('returns Home for home pageType', () => {
        (window as any).ShopifyAnalytics.meta.page = {pageType: 'home'};

        expect(getShopifyServiceName('')).toBe(shopifyServices.HOME.name);
      });

      it('returns OTHER for SSR', () => {
        // eslint-disable-next-line no-global-assign
        (window as any) = undefined;

        expect(getShopifyServiceName()).toBe(shopifyServices.OTHER.name);
      });
    });

    describe('using pathname', () => {
      describe("real shop's URLs", () => {
        const realShopUrls = {
          gymshark: {
            product:
              '/products/gymshark-sweat-seamless-leggings-evening-blue-ss23',
            checkout: '/24468477/checkouts/ba8ef0de1ab28a52e02175e2b76cafd5',
            collection:
              '/collections/new-releases/womens?banner_id=hp-womens-elevate-active',
            page: '/pages/shop-women',
          },
          fashionnova: {
            product: '/products/flirt-alert-ribbed-maxi-skirt-ivory',
            checkout: '/2939277/checkouts/331a7d300bd76f5aff003621f19c68d2',
            collection: '/collections/dresses',
            page: '/pages/curve',
          },
          other: {
            product: '/products/townfolk-103-print',
            checkout:
              '/checkouts/c/a3e0fb5d5c9937c1184f3ea1963518d3/information?auto_redirect=false&locale=en-CA&skip_shop_pay=true',
            page: '/pages/hackdays33',
          },
        };

        it('returns Product Details Page for real PDP URLs', () => {
          expect(getShopifyServiceName(realShopUrls.gymshark.product)).toBe(
            shopifyServices.PDP.name,
          );
          expect(getShopifyServiceName(realShopUrls.fashionnova.product)).toBe(
            shopifyServices.PDP.name,
          );
          expect(getShopifyServiceName(realShopUrls.other.product)).toBe(
            shopifyServices.PDP.name,
          );
        });

        it('returns Checkout for real checkouts URLs', () => {
          expect(getShopifyServiceName(realShopUrls.gymshark.checkout)).toBe(
            shopifyServices.CHECKOUT.name,
          );
          expect(getShopifyServiceName(realShopUrls.fashionnova.checkout)).toBe(
            shopifyServices.CHECKOUT.name,
          );
          expect(getShopifyServiceName(realShopUrls.other.checkout)).toBe(
            shopifyServices.CHECKOUT.name,
          );
        });

        it('returns Collections for real collections URLs', () => {
          expect(getShopifyServiceName(realShopUrls.gymshark.collection)).toBe(
            shopifyServices.COLLECTION.name,
          );
          expect(
            getShopifyServiceName(realShopUrls.fashionnova.collection),
          ).toBe(shopifyServices.COLLECTION.name);
        });

        it('returns Pages for real pages URLs', () => {
          expect(getShopifyServiceName(realShopUrls.gymshark.page)).toBe(
            shopifyServices.PAGE.name,
          );
          expect(getShopifyServiceName(realShopUrls.fashionnova.page)).toBe(
            shopifyServices.PAGE.name,
          );
          expect(getShopifyServiceName(realShopUrls.other.page)).toBe(
            shopifyServices.PAGE.name,
          );
        });
      });

      describe('edge cases', () => {
        it('return Home for / pathname', () => {
          expect(getShopifyServiceName('/')).toBe(shopifyServices.HOME.name);
        });

        it('returns OTHER for unknown services', () => {
          expect(getShopifyServiceName('')).toBe(shopifyServices.OTHER.name);
          expect(getShopifyServiceName('/product-')).toBe(
            shopifyServices.OTHER.name,
          );
          expect(getShopifyServiceName('/otherPathname')).toBe(
            shopifyServices.OTHER.name,
          );
        });
      });
    });
  });
});

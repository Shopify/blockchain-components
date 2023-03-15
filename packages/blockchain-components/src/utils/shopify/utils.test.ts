import {shopifyServices} from './const';
import {getShopifyService} from './utils';

describe('shopify - utils', () => {
  describe('getShopifyService', () => {
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
        commerceTown: {
          product: '/products/townfolk-103-print',
          checkout:
            '/checkouts/c/a3e0fb5d5c9937c1184f3ea1963518d3/information?auto_redirect=false&locale=en-CA&skip_shop_pay=true',
          page: '/pages/hackdays33',
        },
      };
      it('returns Product Details Page for real PDP URLs', () => {
        expect(getShopifyService(realShopUrls.gymshark.product)).toBe(
          shopifyServices.PDP.name,
        );
        expect(getShopifyService(realShopUrls.fashionnova.product)).toBe(
          shopifyServices.PDP.name,
        );
        expect(getShopifyService(realShopUrls.commerceTown.product)).toBe(
          shopifyServices.PDP.name,
        );
      });

      it('returns Checkout for real checkouts URLs', () => {
        expect(getShopifyService(realShopUrls.gymshark.checkout)).toBe(
          shopifyServices.CHECKOUT.name,
        );
        expect(getShopifyService(realShopUrls.fashionnova.checkout)).toBe(
          shopifyServices.CHECKOUT.name,
        );
        expect(getShopifyService(realShopUrls.commerceTown.checkout)).toBe(
          shopifyServices.CHECKOUT.name,
        );
      });

      it('returns Collections for real collections URLs', () => {
        expect(getShopifyService(realShopUrls.gymshark.collection)).toBe(
          shopifyServices.COLLECTION.name,
        );
        expect(getShopifyService(realShopUrls.fashionnova.collection)).toBe(
          shopifyServices.COLLECTION.name,
        );
      });

      it('returns Pages for real pages URLs', () => {
        expect(getShopifyService(realShopUrls.gymshark.page)).toBe(
          shopifyServices.PAGE.name,
        );
        expect(getShopifyService(realShopUrls.fashionnova.page)).toBe(
          shopifyServices.PAGE.name,
        );
        expect(getShopifyService(realShopUrls.commerceTown.page)).toBe(
          shopifyServices.PAGE.name,
        );
      });
    });

    describe('edge cases', () => {
      it('returns OTHER for unknown services', () => {
        expect(getShopifyService('/')).toBe(shopifyServices.OTHER.name);
        expect(getShopifyService('/product-')).toBe(shopifyServices.OTHER.name);
        expect(getShopifyService('/otherPathname')).toBe(
          shopifyServices.OTHER.name,
        );
      });
    });
  });
});

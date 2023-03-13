import {vi} from 'vitest';
import {render, fireEvent} from '@testing-library/react';

import {AnalyticsListenerTestHelper} from '../../../tests/helpers/ClientAnalytics';

import {
  subscribe,
  subscribeToAll,
  publishEvent,
  useEventWithTracking,
  getShopifyService,
  getAdditionalEventPayload,
} from './utils';
import {eventNames, shopifyServices} from './const';

describe('utils', () => {
  const originalWindowLocation = window.location;

  beforeEach(() => {
    vi.useFakeTimers();
    // We only need to mock the pathname for these tests
    (window as {location: {pathname: string}}).location = {
      pathname: '/products/gymshark-sweat-seamless-leggings-evening-blue-ss23',
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    window.location = originalWindowLocation;
  });

  describe('subscribe', () => {
    it('subscriber gets called when there is only one subscriber per event', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock = vi.fn();

      subscribe(eventNames.TOKENGATE_COMPONENT_RENDERED, mock);
      publishEvent(eventNames.TOKENGATE_COMPONENT_RENDERED, eventArgs);
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith({
        ...eventArgs,
        shopifyService: shopifyServices.PDP.name,
      });
    });

    it('each subscriber gets called when there are multiple subscribers per event', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock1 = vi.fn();
      const mock2 = vi.fn();

      const date = new Date(2000, 1, 1, 13);
      vi.setSystemTime(date);
      subscribe(eventNames.TOKENGATE_COMPONENT_RENDERED, mock1);

      // Force +1 millisecond date update
      date.setMilliseconds(date.getMilliseconds() + 1);
      vi.setSystemTime(date);
      subscribe(eventNames.TOKENGATE_COMPONENT_RENDERED, mock2);
      publishEvent(eventNames.TOKENGATE_COMPONENT_RENDERED, eventArgs);
      expect(mock1).toHaveBeenCalledTimes(1);
      expect(mock1).toHaveBeenCalledWith({
        ...eventArgs,
        shopifyService: shopifyServices.PDP.name,
      });
      expect(mock2).toHaveBeenCalledTimes(1);
      expect(mock2).toHaveBeenCalledWith({
        ...eventArgs,
        shopifyService: shopifyServices.PDP.name,
      });
    });

    it('subscriber does not get called after unsubscribe', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock = vi.fn();

      const {unsubscribe} = subscribe(
        eventNames.TOKENGATE_COMPONENT_RENDERED,
        mock,
      );
      unsubscribe();
      publishEvent(eventNames.TOKENGATE_COMPONENT_RENDERED, eventArgs);
      expect(mock).toHaveBeenCalledTimes(0);
    });

    it('subscriber does not get called for an event it is not subscribed to', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock = vi.fn();

      publishEvent(eventNames.TOKENGATE_COMPONENT_RENDERED, eventArgs);
      expect(mock).toHaveBeenCalledTimes(0);
    });
  });

  describe('subscribeToAll', () => {
    it('subscriber gets called', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock1 = vi.fn();

      subscribeToAll(mock1);
      publishEvent(eventNames.TOKENGATE_COMPONENT_RENDERED, eventArgs);
      expect(mock1).toHaveBeenCalledTimes(1);
      expect(mock1).toHaveBeenCalledWith({
        eventName: eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs: {...eventArgs, shopifyService: shopifyServices.PDP.name},
      });
    });

    it('subscriber does not called after unsubscribe', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock1 = vi.fn();

      const {unsubscribe} = subscribeToAll(mock1);
      unsubscribe();
      publishEvent(eventNames.TOKENGATE_COMPONENT_RENDERED, eventArgs);
      expect(mock1).toHaveBeenCalledTimes(0);
    });
  });

  describe('useEventWithTracking', () => {
    const onClickEventName = 'TEST_EVENT_NAME';
    const Button = ({
      onClick,
      onClickEventName,
    }: {
      onClick?: () => void;
      onClickEventName?: string;
    }) => {
      const onClickWithTracking = useEventWithTracking({
        callback: onClick,
        eventName: onClickEventName,
      });
      return (
        // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
        <button type="button" aria-label="button" onClick={onClickWithTracking}>
          button text
        </button>
      );
    };

    it('sends onClick event if onClickEventName is defined', async () => {
      const onClickMock = vi.fn();
      const subscriberMock = vi.fn();

      const element = render(
        <>
          <AnalyticsListenerTestHelper
            eventName={onClickEventName}
            mock={subscriberMock}
          />
          <Button onClick={onClickMock} onClickEventName={onClickEventName} />,
        </>,
      );
      const button = await element.findByText('button text');
      fireEvent.click(button);
      expect(onClickMock).toBeCalledTimes(1);
      expect(subscriberMock).toBeCalledTimes(1);
    });

    it('does not send onClick event if onClickEventName is undefined', async () => {
      const onClickMock = vi.fn();
      const subscriberMock = vi.fn();
      const element = render(
        <>
          <AnalyticsListenerTestHelper
            eventName={onClickEventName}
            mock={subscriberMock}
          />
          <Button onClick={onClickMock} />,
        </>,
      );
      const button = await element.findByText('button text');
      fireEvent.click(button);
      expect(onClickMock).toBeCalledTimes(1);
      expect(subscriberMock).toBeCalledTimes(0);
    });
  });

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

  describe('getAdditionalEventPayload', () => {
    const originalWindow = window;

    // Forcing window to be undefined for this test to mimic server side rendering
    beforeEach(() => {
      // eslint-disable-next-line no-global-assign
      window = undefined as any;
    });

    afterEach(() => {
      // eslint-disable-next-line no-global-assign
      window = originalWindow;
    });

    it('does not break if window is undefined', () => {
      const additionalPayload = getAdditionalEventPayload();

      expect(additionalPayload).toStrictEqual({
        shopifyService: shopifyServices.OTHER.name,
      });
    });
  });
});

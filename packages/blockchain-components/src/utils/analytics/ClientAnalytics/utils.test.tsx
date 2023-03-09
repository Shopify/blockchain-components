import {vi} from 'vitest';
import {render, fireEvent} from '@testing-library/react';

import {AnalyticsListenerTestHelper} from '../../../tests/helpers/ClientAnalytics';

import {
  subscribe,
  subscribeToAll,
  publishEvent,
  useEventWithTracking,
} from './utils';
import {eventNames} from './const';

describe('utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('subscribe', () => {
    it('subscriber gets called when there is only one subscriber per event', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock = vi.fn();

      subscribe(eventNames.TOKENGATE_COMPONENT_RENDERED, mock);
      publishEvent(eventNames.TOKENGATE_COMPONENT_RENDERED, eventArgs);
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith(eventArgs);
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
      expect(mock1).toHaveBeenCalledWith(eventArgs);
      expect(mock2).toHaveBeenCalledTimes(1);
      expect(mock2).toHaveBeenCalledWith(eventArgs);
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
        eventArgs,
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
});

import {vi} from 'vitest';
import {ClientAnalytics} from './ClientAnalytics';

describe('ClientAnalytics', () => {
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

      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        mock,
      );
      ClientAnalytics.publishEvent(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs,
      );
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith(eventArgs);
    });

    it('each subscriber gets called when there are multiple subscribers per event', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock1 = vi.fn();
      const mock2 = vi.fn();

      const date = new Date(2000, 1, 1, 13);
      vi.setSystemTime(date);
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        mock1,
      );

      // Force +1 millisecond date update
      date.setMilliseconds(date.getMilliseconds() + 1);
      vi.setSystemTime(date);
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        mock2,
      );
      ClientAnalytics.publishEvent(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs,
      );
      expect(mock1).toHaveBeenCalledTimes(1);
      expect(mock1).toHaveBeenCalledWith(eventArgs);
      expect(mock2).toHaveBeenCalledTimes(1);
      expect(mock2).toHaveBeenCalledWith(eventArgs);
    });

    it('subscriber does not get called after unsubscribe', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock = vi.fn();

      const {unsubscribe} = ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        mock,
      );
      unsubscribe();
      ClientAnalytics.publishEvent(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs,
      );
      expect(mock).toHaveBeenCalledTimes(0);
    });

    it('subscriber does not get called for an event it is not subscribed to', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock = vi.fn();

      ClientAnalytics.publishEvent(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs,
      );
      expect(mock).toHaveBeenCalledTimes(0);
    });
  });

  describe('subscribeToAll', () => {
    it('subscriber gets called', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock1 = vi.fn();

      ClientAnalytics.subscribeToAll(mock1);
      ClientAnalytics.publishEvent(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs,
      );
      expect(mock1).toHaveBeenCalledTimes(1);
      expect(mock1).toHaveBeenCalledWith({
        eventName: ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs,
      });
    });

    it('subscriber does not called after unsubscribe', () => {
      const eventArgs = {testProps: 'testProps'};
      const mock1 = vi.fn();

      const {unsubscribe} = ClientAnalytics.subscribeToAll(mock1);
      unsubscribe();
      ClientAnalytics.publishEvent(
        ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
        eventArgs,
      );
      expect(mock1).toHaveBeenCalledTimes(0);
    });
  });
});

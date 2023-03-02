import {vi} from 'vitest';
import {ClientAnalytics} from './ClientAnalytics';

describe('ClientAnalytics', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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
    expect(mock2).toHaveBeenCalledTimes(1);
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
});

import {useContext, useEffect} from 'react';
import {vi} from 'vitest';
import {render} from '@testing-library/react';

import {AnalyticsProvider, AnalyticsContext} from './index';

const EVENT_NAME = 'EVENT_NAME';

const PublisherComponent = () => {
  const {publishEvent} = useContext(AnalyticsContext);
  useEffect(() => {
    publishEvent(EVENT_NAME);
  }, [publishEvent]);

  return <>PublisherComponent</>;
};

const SubscriberComponent = ({mock}: {mock: () => void}) => {
  const {subscribe} = useContext(AnalyticsContext);
  useEffect(() => {
    const {unsubscribe} = subscribe(EVENT_NAME, mock);
    return unsubscribe;
  }, [subscribe, mock]);

  return <>SubscriberComponent</>;
};

describe('AnalyticsProvider', () => {
  it('does not break if the publisher element is not inside a provider', () => {
    const publisherComponent = render(<PublisherComponent />);

    expect(
      publisherComponent.findAllByText('PublisherComponent'),
    ).toBeDefined();
  });

  it('calls subscriber if publish event was called from another component', () => {
    const mock = vi.fn();
    render(
      <AnalyticsProvider>
        <SubscriberComponent mock={mock} />
        <PublisherComponent />
      </AnalyticsProvider>,
    );

    expect(mock).toHaveBeenCalledTimes(1);
  });
});

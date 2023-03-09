import {useEffect} from 'react';

import {ClientAnalytics} from '../../utils/analytics/ClientAnalytics';

export const AnalyticsListenerTestHelper = ({
  eventName,
  mock,
}: {
  eventName: string;
  mock: (payload: any) => void;
}) => {
  useEffect(() => {
    const {unsubscribe} = ClientAnalytics.subscribe(eventName, (payload: any) =>
      mock(payload),
    );
    return unsubscribe;
  }, [eventName, mock]);

  return null;
};

import {useEffect} from 'react';

import {subscribe} from '~/utils/analytics/ClientAnalytics';

export const AnalyticsListenerTestHelper = ({
  eventName,
  mock,
}: {
  eventName: string;
  mock: (payload: any) => void;
}) => {
  useEffect(() => {
    const {unsubscribe} = subscribe(eventName, (payload: any) => mock(payload));
    return unsubscribe;
  }, [eventName, mock]);

  return null;
};

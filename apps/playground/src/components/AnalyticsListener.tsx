import {useEffect} from 'react';
import {ClientAnalytics} from '@shopify/tokengate';

export const AnalyticsListener = () => {
  useEffect(() => {
    const {unsubscribe} = ClientAnalytics.subscribe(
      ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
      (payload: any) => {
        // eslint-disable-next-line no-console
        console.log(
          ClientAnalytics.eventNames.TOKENGATE_COMPONENT_RENDERED,
          payload,
        );
      },
    );
    return () => unsubscribe();
  });

  return null;
};

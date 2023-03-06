import {useEffect} from 'react';
import {ClientAnalytics} from '@shopify/tokengate';

export const AnalyticsListener = () => {
  useEffect(() => {
    const {unsubscribe} = ClientAnalytics.subscribe(
      'TokengateComponentRendered',
      (payload: any) => {
        // eslint-disable-next-line no-console
        console.log('TokengateComponentRendered', payload);
      },
    );
    return unsubscribe();
  });

  return null;
};

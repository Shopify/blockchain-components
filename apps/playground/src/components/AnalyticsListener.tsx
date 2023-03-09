import {ClientAnalytics} from '@shopify/tokengate';
import {useEffect} from 'react';

export const AnalyticsListener = () => {
  useEffect(() => {
    const {unsubscribe} = ClientAnalytics.subscribeToAll((payload: any) => {
      // eslint-disable-next-line no-console
      console.log('Captured event', payload);
    });
    return () => unsubscribe();
  });

  return null;
};

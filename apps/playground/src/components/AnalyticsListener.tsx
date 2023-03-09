import {useEffect} from 'react';
import {ClientAnalytics} from '@shopify/blockchain-components';

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

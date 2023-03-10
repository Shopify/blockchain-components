import {subscribeToAll} from '@shopify/blockchain-components';
import {useEffect} from 'react';

export const AnalyticsListener = () => {
  useEffect(() => {
    const {unsubscribe} = subscribeToAll((payload: any) => {
      // eslint-disable-next-line no-console
      console.log('Captured event', payload);
    });
    return () => unsubscribe();
  });

  return null;
};

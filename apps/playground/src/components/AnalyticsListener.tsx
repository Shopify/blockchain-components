import {useEffect} from 'react';
import {subscribe} from 'shared';
// import {ClientAnalytics} from '@shopify/tokengate';

export const AnalyticsListener = () => {
  console.log('AnalyticsListener mounted');

  useEffect(() => {
    subscribe(
      'TokengateComponentRendered',
      console.log('Subscribed event for tokengate card component rendered'),
    );
  }, []);

  // return null;
};

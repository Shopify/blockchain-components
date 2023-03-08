import {useEffect} from 'react';
import {subscribe} from 'shared';
// import {ClientAnalytics} from '@shopify/tokengate';

export const AnalyticsListener = () => {
  console.log('AnalyticsListener mounted');

  useEffect(() => {
    subscribe(
      'ConnectButtonClicked',
      console.log('Event captured: ConnectButtonClicked'),
    );
  }, []);

  // return null;
};

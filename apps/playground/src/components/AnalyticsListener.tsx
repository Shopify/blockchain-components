import {useContext, useEffect} from 'react';
import {AnalyticsContext} from '@shopify/tokengate';

export const AnalyticsListener = () => {
  const {subscribe, eventNames} = useContext(AnalyticsContext);
  useEffect(() => {
    const {unsubscribe} = subscribe(
      eventNames.TOKENGATE_COMPONENT_RENDERED,
      (payload: any) => {
        // eslint-disable-next-line no-console
        console.log(eventNames.TOKENGATE_COMPONENT_RENDERED, payload);
      },
    );
    return () => unsubscribe();
  });

  return null;
};

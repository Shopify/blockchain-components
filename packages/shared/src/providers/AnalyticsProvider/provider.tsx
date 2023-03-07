import {ReactNode, useMemo} from 'react';

import {AnalyticsContext} from './context';
import {subscribe, subscribeToAll, publishEvent} from './utils';
import {eventNames} from './const';

export const AnalyticsProvider = ({children}: {children: ReactNode}) => {
  const value = useMemo(
    () => ({
      subscribe,
      subscribeToAll,
      publishEvent,
      eventNames,
    }),
    [],
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

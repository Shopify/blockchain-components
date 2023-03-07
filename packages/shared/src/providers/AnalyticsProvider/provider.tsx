import {ReactNode, useMemo} from 'react';

import {AnalyticsContext} from './context';
import {subscribe, subscribeToAll, publishEvent} from './utils';

export const AnalyticsProvider = ({children}: {children: ReactNode}) => {
  const value = useMemo(
    () => ({
      subscribe,
      subscribeToAll,
      publishEvent,
    }),
    [],
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

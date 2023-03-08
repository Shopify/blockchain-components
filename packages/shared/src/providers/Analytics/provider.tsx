import {Provider} from 'react-redux';

import store from './store';

export const AnalyticsProvider = () => {
  return <Provider store={store}>{null}</Provider>;
};

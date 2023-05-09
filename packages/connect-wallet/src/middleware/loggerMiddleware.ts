/* eslint-disable no-console */
import type {Middleware} from 'redux';

import type {AppDispatch, RootState} from '~/store/configureStore';

// Different CSS styles for the logger.
const ACTION_CSS = `color: #3B82F6; font-weight: bold`;
const HEADER_CSS = ['color: #059669;', 'color: gray; font-weight: lighter;'];
const NEXT_STATE_CSS = `color: #059669; font-weight: bold`;
const PREV_STATE_CSS = `color: #8B5CF6; font-weight: bold`;

const logger: Middleware<AppDispatch, RootState> =
  ({getState}) =>
  (next) =>
  (action) => {
    // Timestamp
    const date = new Date();
    const formattedTimestamp = date.toLocaleTimeString('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    // Previous State
    const previousState = getState();

    // Ensure we return the event so that the store actually receives the dispatched event.
    const returnedValue = next(action);

    // Get our next state after the action has been dispatched to our store.
    const nextState = getState();

    // Begin logging
    console.groupCollapsed(
      `%c@shopify/connect-wallet%c: ${action.type} @${formattedTimestamp}`,
      ...HEADER_CSS,
    );

    console.log('%cprevious state:', PREV_STATE_CSS, previousState);
    console.log('%caction:', ACTION_CSS, action);
    console.log('%cnext state:', NEXT_STATE_CSS, nextState);

    try {
      console.groupEnd();
    } catch (error) {
      console.log('—— log end ——');
    }

    return returnedValue;
  };

export default logger;

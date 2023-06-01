/* eslint-disable no-console */
import {Logger, LoggerImpl, NamedSet} from './types';

// Different CSS styles for the logger.
const ACTION_CSS = `color: #3B82F6; font-weight: bold`;
const HEADER_CSS = ['color: #059669;', 'color: gray; font-weight: lighter;'];
const NEXT_STATE_CSS = `color: #059669; font-weight: bold`;
const PREV_STATE_CSS = `color: #8B5CF6; font-weight: bold`;

const loggerImpl: LoggerImpl = (fn) => (set, get, api) => {
  type S = ReturnType<typeof fn> & {
    [store: string]: ReturnType<typeof fn>;
  };

  (api.setState as unknown as NamedSet<S>) = (state, replace, action) => {
    const loggedSetState = () => {
      const previousState = get();

      // Timestamp
      const date = new Date();
      const formattedTimestamp = date.toLocaleTimeString('default', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

      // Dispatch the action.
      set(state, replace);
      const updatedState = get();

      console.groupCollapsed(
        `%c@shopify/connect-wallet%c: ${action.type} @${formattedTimestamp}`,
        ...HEADER_CSS,
      );

      // Previous State
      console.log('%cprevious state:', PREV_STATE_CSS, previousState);

      console.log('%caction:', ACTION_CSS, action);

      // Get our next state after the action has been invoked and log it.
      console.log('%cnext state:', NEXT_STATE_CSS, updatedState);

      try {
        console.groupEnd();
      } catch (error) {
        console.log('—— log end ——');
      }
    };

    return loggedSetState();
  };

  // Logger is only enabled in development environments.
  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV === 'production') {
    return fn(set, get, api);
  }

  return fn(api.setState, get, api);
};

export const logger = loggerImpl as unknown as Logger;

/* eslint-disable no-console */
/**
 * Expected log format:
 *
 * ` state log:`
 *    actionName: 'persist/REHYDRATE'
 *
 */
import type {Action, Middleware} from 'redux';

import type {AppDispatch, RootState} from '../store/configureStore';

// can make use of dark mode context here.
interface LogEntry {
  action: Action;
  created: string;
  next: RootState | undefined;
  prev: RootState;
}

const logger = (): Middleware<AppDispatch, RootState> => {
  const logs: LogEntry[] = [];

  return ({getState}) =>
    (next) =>
    (action) => {
      const state = getState();

      const date = new Date();

      const log: LogEntry = {
        action,
        created: date.toLocaleTimeString('default', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
        next: undefined,
        prev: state,
      };

      const returnedValue = next(action);

      log.next = getState();
      logs.push(log);

      printLogs(logs);

      // reset logs
      logs.length = 0;

      return returnedValue;
    };
};

function printLogs(logs: LogEntry[]) {
  logs.forEach((log, key) => {
    const {action, created, prev} = log;
    let {next} = log;

    const nextEntry = logs[key + 1];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (nextEntry) {
      next = nextEntry.prev;
    }

    // Message
    const actionCSS = `color: #3B82F6; font-weight: bold`;
    const headerCSS = ['color: #059669;', 'color: gray; font-weight: lighter;'];
    const nextCSS = `color: #059669; font-weight: bold`;
    const prevCSS = `color: #8B5CF6; font-weight: bold`;

    // Render
    console.groupCollapsed(
      `%c@shopify/connect-wallet%c: ${action.type} @${created}`,
      ...headerCSS,
    );

    console.log('%cprev state:', prevCSS, prev);
    console.log('%caction:', actionCSS, action);
    console.log('%cnext state:', nextCSS, next);

    try {
      console.groupEnd();
    } catch (error) {
      console.log('—— log end ——');
    }
  });
}

export default logger();

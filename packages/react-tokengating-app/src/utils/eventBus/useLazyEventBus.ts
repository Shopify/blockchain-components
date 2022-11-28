import {eventBus} from './eventBus';

import {EventBusEvent, PayloadErrors} from '../../types/events';
import {useCallback, useState} from 'react';

type WrappedPayload<T> = PayloadErrors & T;

export type EventBusStatus = 'loading' | 'success' | 'error' | 'idle';

export function useLazyEventBus<EventT extends EventBusEvent>(
  event: EventT['event'],
): [
  dispatch: (variables: EventT['variables']) => void,
  responseWithStatusAndErrors: {
    data?: WrappedPayload<EventT['response']>;
    status: string;
  },
] {
  const [status, setStatus] = useState<EventBusStatus>('idle');
  const [data, setData] = useState<WrappedPayload<EventT['response']>>();

  const dispatch = useCallback(
    (variables: EventT['variables']) => {
      setStatus('loading');
      const promise = new Promise((resolve, reject) => {
        const listener = eventBus.on(
          `${event}-themeToReact`,
          (eventResponse: WrappedPayload<EventT['response']>) => {
            eventBus.remove(`${event}-themeToReact`, listener);

            if (eventResponse.userErrors) {
              setStatus('error');
              setData(undefined);
              reject(eventResponse);
            }

            setStatus('success');
            setData(eventResponse);
            resolve(eventResponse);
          },
        );
      });

      eventBus.dispatch(`${event}-reactToTheme`, variables);

      return promise;
    },
    [event],
  );

  return [dispatch, {status, data}];
}

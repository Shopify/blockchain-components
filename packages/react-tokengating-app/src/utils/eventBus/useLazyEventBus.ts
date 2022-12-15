import {useCallback, useState} from 'react';

import {EventBusEvent, PayloadErrors} from '../../types/events';

import {eventBus} from './eventBus';

type WrappedPayload<T> = PayloadErrors & T;

export type EventBusStatus = 'loading' | 'success' | 'error' | 'idle';

export function useLazyEventBus<T extends EventBusEvent>(
  event: T['event'],
): [
  dispatch: (variables: T['variables']) => void,
  responseWithStatusAndErrors: {
    data?: WrappedPayload<T['response']>;
    status: string;
  },
] {
  const [status, setStatus] = useState<EventBusStatus>('idle');
  const [data, setData] = useState<WrappedPayload<T['response']>>();

  const dispatch = useCallback(
    (variables: T['variables']) => {
      setStatus('loading');
      const promise = new Promise((resolve, reject) => {
        const listener = eventBus.on(
          `${event}-themeToReact`,
          (eventResponse: WrappedPayload<T['response']>) => {
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

import {eventBus} from './eventBus';

import {EventBusEvent, PayloadErrors} from '../types/events';

type WrappedPayload<T> = PayloadErrors & T;

export function handleEvent<Output, Input>(
  inputEvent: EventBusEvent,
  input: Input,
  outputEvent: EventBusEvent,
  callback?: (data?: Output) => any,
): Promise<WrappedPayload<Output>> {
  /**
   * In the future we can consider adding a timeout to this
   * communication, perhaps via an optional param?
   */
  eventBus.dispatch(inputEvent, input);

  return new Promise((resolve, reject) => {
    eventBus.on(outputEvent, (output: WrappedPayload<Output>) => {
      callback?.(output);

      if (output.userErrors) {
        return reject(output);
      }

      return resolve(output);
    });
  });
}

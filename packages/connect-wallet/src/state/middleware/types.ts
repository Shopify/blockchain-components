import type {StateCreator, StoreApi, StoreMutatorIdentifier} from 'zustand';

export interface Action {
  type: string;
  payload?: any;
}

type Write<T, U> = Omit<T, keyof U> & U;

type StoreLogger<T> = T extends {
  setState: (...api: infer SetApi) => infer SetResult;
}
  ? {
      setState<U extends Action>(
        ...api: [...api: [SetApi[0], SetApi[1]], action: U]
      ): SetResult;
    }
  : never;

type WithLogger<T> = Write<T, StoreLogger<T>>;

export type Logger = <
  T,
  MPS extends [StoreMutatorIdentifier, unknown][] = [],
  MCS extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, [...MPS, ['logger', never]], MCS>,
) => StateCreator<T, MPS, [['logger', never], ...MCS]>;

export type LoggerImpl = <T>(f: StateCreator<T>) => StateCreator<T>;
export type NamedSet<T> = WithLogger<StoreApi<T>>['setState'];

// We have to declare the additional middleware for type inference.
declare module 'zustand' {
  interface StoreMutators<S, A> {
    logger: WithLogger<S>;
  }
}

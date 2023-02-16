export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K>}> = Partial<T> &
  U[keyof U];

/**
 * Copied from Redux Toolkit listenerMiddleware types
 */
export type GuardedType<T> = T extends (
  x: any,
  ...args: unknown[]
) => x is infer T
  ? T
  : never;

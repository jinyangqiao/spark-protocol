// @flow

import type { Decorator, Descriptor } from './types';

import memoize from 'memoizee';

type MemoizeConfig = {
  maxAge?: number,
  promise?: boolean,
};

const DEFAULT_MAX_AGE = 3600 * 1000; // 1 hour
const DEFAULT_PARAMETERS = {
  maxAge: DEFAULT_MAX_AGE,
  promise: true,
};

/* eslint-disable no-param-reassign */
export default <TType: Object>(
  keys?: Array<string> = [],
  config: ?MemoizeConfig = null,
): Decorator<TType> => (
  target: TType,
  name: $Keys<TType>,
  descriptor: Descriptor,
): Descriptor => {
  const formattedKeys = keys.map((key: string): string => key.replace('?', ''));

  const keySets = keys
    .map(
      (key: string, index: number): ?Array<string> => {
        if (!key.startsWith('?')) {
          return null;
        }

        return formattedKeys.slice(0, index);
      },
    )
    .filter((item: ?Array<string>): boolean => !!item)
    .concat([formattedKeys]);

  const descriptorFunction = descriptor.value;
  const memoized = memoize(descriptorFunction, {
    ...DEFAULT_PARAMETERS,
    ...config,
  });

  descriptor.value = memoized;

  if (!target._caches) {
    target._caches = [];
  }

  target._caches.push({
    fnName: descriptorFunction.name,
    keySets,
    memoized,
  });

  return descriptor;
};

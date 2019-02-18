// @flow

import type { Cache, Decorator, Descriptor } from './types';

/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
export default <TType: Object, TItem: Object>(
  parameterKeys: ?Array<string> = null,
): Decorator<TType> => (
  target: TType,
  name: $Keys<TType>,
  descriptor: Descriptor,
): Descriptor => {
  const descriptorFunction = descriptor.value;
  let fetchItemFunction = (item: TItem): TItem => item;

  if (!parameterKeys) {
    fetchItemFunction = (item: TItem): TItem => item;
  } else if (parameterKeys[0] === 'id') {
    fetchItemFunction = function(id: string): Promise<TItem> {
      return this.getByID(id);
    };
  } else {
    fetchItemFunction = (keys: Array<string>): Function =>
      function(...parameters: Array<Object>): Promise<TItem> {
        return this.getAll().filter(
          (item: TItem): boolean =>
            parameters.every(
              (param: Object, index: number): boolean =>
                param === item[keys[index]],
            ),
        );
      };
  }

  descriptor.value = async function(): Promise<TItem> {
    const args = arguments; // eslint-disable-line prefer-rest-params

    const result = await descriptorFunction.call(this, ...args);
    const item = {
      ...result,
      ...(await fetchItemFunction.call(this, ...args)),
    };

    target._caches.forEach((cache: Cache) => {
      cache.keySets.forEach((keySet: Array<string>) => {
        if (!keySet || !keySet.length) {
          cache.memoized.clear();
          return;
        }
        // Either get the parameter out of item or the args.
        const cacheParams = keySet.map(
          (key: string): Object => item[key] || args[keySet.indexOf(key)],
        );
        cache.memoized.delete(...cacheParams);
      });
    });

    return result;
  };

  return descriptor;
};

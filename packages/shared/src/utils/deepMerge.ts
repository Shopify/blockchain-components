/**
 * Taken from @mir4ef/deep-merge.ts
 * https://gist.github.com/mir4ef/c172583bdb968951d9e57fb50d44c3f7
 */

export interface IIsObject {
  (item: any): boolean;
}

export interface IObject {
  [key: string]: any;
}

interface IDeepMerge {
  (target: IObject, ...sources: IObject[]): IObject;
}

/**
 * @description Method to check if an item is an object. Date and Function are considered
 * an object, so if you need to exclude those, please update the method accordingly.
 * @param item - The item that needs to be checked
 * @return {Boolean} Whether or not @item is an object
 */
export const isObject: IIsObject = (item: any): boolean => {
  return item === Object(item) && !Array.isArray(item);
};

/**
 * @description Method to perform a deep merge of objects. This method does not modify the original target
 * @param {Object} target - The targeted object that needs to be merged with the supplied @sources
 * @param {Array<Object>} sources - The source(s) that will be used to update the @target object
 * @return {Object} The final merged object
 */
export const deepMerge: IDeepMerge = (
  target: IObject,
  ...sources: IObject[]
): IObject => deepMergeWithoutCloning({}, target, ...sources);

/**
 * @description Method to perform a deep merge of objects without cloning the target
 * @param {Object} target - The targeted object that needs to be merged with the supplied @sources
 * @param {Array<Object>} sources - The source(s) that will be used to update the @target object
 * @return {Object} The final merged object
 */
export const deepMergeWithoutCloning: IDeepMerge = (
  target: IObject,
  ...sources: IObject[]
): IObject => {
  // return the target if no sources passed
  if (!sources.length) {
    return target;
  }

  const result: IObject = target;

  if (isObject(result)) {
    const len: number = sources.length;

    for (let i = 0; i < len; i += 1) {
      const elm: any = sources[i];

      if (isObject(elm)) {
        for (const key in elm) {
          if (Object.prototype.hasOwnProperty.call(elm, key)) {
            if (isObject(elm[key])) {
              if (!result[key] || !isObject(result[key])) {
                result[key] = {};
              }
              deepMergeWithoutCloning(result[key], elm[key]);
            } else {
              result[key] = elm[key];
            }
          }
        }
      }
    }
  }

  return result;
};

import isObject from 'lodash/isObject';

/**
 * This function should items in the given list
 *
 * @function
 * @name shuffleList
 *
 *
 * @param {*[]} list
 * @param {number} fromIndex
 * @param {number} toIndex
 * @returns {*[]} shuffled array
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default function shuffleList(list, fromIndex = 0, toIndex = 0) {
  const newList = list.map(item => {
    if (isObject(item)) {
      return { ...item };
    }
    return item;
  });

  if (fromIndex === toIndex) {
    return newList;
  }

  const item = newList[fromIndex];

  newList.splice(fromIndex, 1);

  newList.splice(toIndex, 0, item);

  return newList;
}

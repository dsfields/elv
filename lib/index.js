'use strict';


const behavior = {
  enableFalse: false,
  enableNaN: false,
  enableNull: true,
  enableUndefined: true,
};


/**
 * Checks if the provided value is defined.
 *
 * @param {*} val - The value on which to perform an existential check.
 *
 * @returns {boolean}
 */
const elv = function (val) {
  return (!behavior.enableUndefined || typeof val !== 'undefined')
    && (!behavior.enableNull || val !== null)
    && (!behavior.enableFalse || val !== false)
    && (!behavior.enableNaN || !Number.isNaN(val));
};


/**
 * Gets an object that is used to turn different existential checks on and off.
 *
 * @prop {boolean} [enableFalse=false] - Check that a value is not Boolean false.
 * @prop {boolean} [enableNaN=false] - Check that a value is not NaN.
 * @prop {boolean} [enableNull=true] - Check that a value is not null.
 * @prop {boolean} [enableUndefined=true] - CHecks that a value is not undefined.
 */
elv.behavior = behavior;


/**
 * Evaluates each argument in order, and returns the first value that passes an
 * existential check.  If the last argument is reached, and it is a function,
 * the function is called, and its value is checked.  If no argument has passes
 * an existential check, then "undefined" is returned.
 *
 * @param {...*} args - The values to coalesce.
 *
 * @returns {*|undefined}
 */
elv.coalesce = function () {
  const ubound = arguments.length - 1;
  for (let i = 0; i < arguments.length; i++) {
    const val = arguments[i];
    if (elv(val)) {
      return (i === ubound && typeof val === 'function')
        ? val()
        : val;
    }
  }
  return undefined;
};


/**
 * In addition to performing an existential check, determines if a given string,
 * array or object is not empty.  An empty object is one that has no properties.
 *
 * @param {*} val - The value to check.
 *
 * @returns {boolean}
 */
elv.populated = function (val) {
  const t = typeof val;
  return elv(val)
    && (t !== 'string' || val.length > 0)
    && (!Array.isArray(val) || val.length > 0)
    && (t !== 'object' || Object.keys(val).length > 0);
};


/**
 * Attempts to get an entry from an array at the given index.  If the given
 * index is out of the array's bounds, then a given default value is returned.
 *
 * @param {Array} val - The array from which an entry is being fetched.
 * @param {number} index - The index being referenced in the array.
 * @param {*} [def=undefined] - The default value if index is not found.
 */
elv.tryGet = function (val, index, def) {
  if (!elv(val) || index >= val.length) return def;
  return val[index];
};


module.exports = elv;

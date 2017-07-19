'use strict';

const elv = function (obj) {
  return (typeof obj !== 'undefined' && obj !== null);
};

module.exports = elv;

module.exports.coalesce = function () {
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

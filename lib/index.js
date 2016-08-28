'use strict';

const est = function(obj) {
  return (typeof obj !== 'undefined' && obj !== null);
};

module.exports = est;

module.exports.coalesce = function() {
  for (let i = 0; i < arguments.length; i++) {
    const val = arguments[i];
    if (est(val)) return (typeof val === 'function') ? val() : val;
  }
  return undefined;
};

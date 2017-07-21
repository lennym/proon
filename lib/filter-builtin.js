'use strict';

const builtin = require('builtin-modules');

module.exports = opts => list => {
  return list.filter(name => !builtin.includes(name));
};

'use strict';

const espree = require('espree');

module.exports = opts => code => {
  return espree.parse(code, {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  });
};

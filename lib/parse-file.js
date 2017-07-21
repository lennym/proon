'use strict';

const espree = require('espree');

module.exports = opts => code => {
  code = code.toString();
  // if file has a shebang then remove it as it'll make espree fail
  if (code.substr(0, 2) === '#!') {
    code = code.split('\n').slice(1).join('\n');
  }
  return espree.parse(code, {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  });
};

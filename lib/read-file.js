'use strict';

const fs = require('fs');

module.exports = opts => file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      if (err && err.code === 'EISDIR') {
        return resolve('');
      }
      return err ? reject(err) : resolve(content);
    });
  });
};

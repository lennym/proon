'use strict';

const findup = require('findup');
const path = require('path');

module.exports = dir => {
  return new Promise((resolve, reject) => {
    findup(dir, 'package.json', (err, location) => {
      return err ? reject(err) : resolve(path.join(location, 'package.json'));
    });
  })
  .catch(e => {
    throw new Error(`Unable to find package.json file in: ${dir}`);
  })
  .then(location => require(location));
};

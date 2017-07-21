'use strict';

const findup = require('findup');
const path = require('path');

module.exports = dir => {
  return new Promise((resolve, reject) => {
    findup(dir, 'package.json', (err, location) => {
      return err ? reject(err) : resolve(path.join(location, 'package.json'));
    });
  })
  .then(location => require(location));
};

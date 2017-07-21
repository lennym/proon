'use strict';

const binaries = require('./read-npm-scripts');
const cp = require('child_process');

// add some known additional binaries to some packages
// https://github.com/npm/npm/issues/17877
const extraBins = {
  mocha: ['_mocha']
};

module.exports = opts => name => {
  return new Promise((resolve, reject) => {
    cp.exec(`npm view ${name} bin --json`, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        resolve({});
      }
    })
  })
  .then(bins => Object.keys(bins))
  .then(bins => {
    if (extraBins[name]) {
      bins = bins.concat(extraBins[name]);
    }
    return bins;
  })
  .then(bins => {
    return binaries(opts)
      .then(scripts => {
        return bins.reduce((matched, bin) => {
          return matched || scripts.includes(bin);
        }, false);
      });
  });
}
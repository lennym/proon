'use strict';

const required = require('./find-required-modules');
const installed = require('./find-installed-modules');
const isBinary = require('./is-binary');
const diff = require('./diff');

const filter = require('bluebird').filter;

module.exports = opts => {
  return Promise.resolve()
    .then(() => installed(opts))
    .then(installedDeps => {
      return required(opts)
        .then(requiredDeps => {
          return {
            implicit: diff(requiredDeps, installedDeps),
            redundant: diff(installedDeps, requiredDeps)
          };
        });
    })
    .then(result => {
      if (opts.binaries) {
        return filter(result.redundant, name => isBinary(opts)(name).then(bool => !bool))
          .then(redundants => {
            result.redundant = redundants;
            return result;
          });
      }
      return result;
    });
};

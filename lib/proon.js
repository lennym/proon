'use strict';

const required = require('./find-required-modules');
const installed = require('./find-installed-modules');
const diff = require('./diff');

module.exports = opts => {
  return Promise.resolve()
    .then(() => installed(opts))
    .then(intalledDeps => {
      return required(opts)
        .then(requiredDeps => {
          return {
            implicit: diff(requiredDeps, installedDeps),
            redundant: diff(installedDeps, requiredDeps)
          };
        });
    });

};

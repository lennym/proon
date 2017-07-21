'use strict';

const readJSON = require('./read-package-json');

module.exports = opts => {
  return readJSON(opts.root)
    .then(pkg => {
      const deps = opts.production ? ['dependencies'] : ['dependencies', 'devDependencies', 'optionalDependencies'];
      return deps.reduce((all, key) => {
        if (pkg[key]) {
          return all.concat(Object.keys(pkg[key]));
        }
        return all;
      }, []);
    });
};

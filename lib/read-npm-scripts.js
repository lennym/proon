'use strict';

const readJSON = require('./read-package-json');

const blacklist = [
  'node',
  'npm',
  'npx',
  'mkdir',
  'rm',
  'cp',
  '&&',
  '|'
];

module.exports = opts => {

  return readJSON(opts.root)
    .then(pkg => {
      const scripts = pkg.scripts || {};
      return Object.keys(scripts).reduce((bins, key) => {
        return bins.concat(scripts[key].split(' '));
      }, []);
    })
    // remove known builtins
    .then(binaries => binaries.filter(name => !blacklist.includes(name)))
    // remove flags
    .then(binaries => binaries.filter(name => name[0] !== '-'))
    // remove file paths
    .then(binaries => binaries.filter(name => name[0] !== '.' && name[0] !== '/'))
    // remove env vars
    .then(binaries => binaries.filter(name => !name.includes('=')))
    // unique-ify
    .then(binaries => binaries.reduce((all, name) => all.includes(name) ? all : all.concat(name), []));

};

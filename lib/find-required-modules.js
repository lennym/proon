'use strict';

const map = require('bluebird').map;

const FileList = require('./file-list');
const ReadFile = require('./read-file');
const ParseFile = require('./parse-file');
const FilterRequires = require('./filter-requires');
const FilterBuiltin = require('./filter-builtin');

module.exports = opts => Promise.resolve()
  .then(FileList(opts))
  .then(list => {
    return map(list, file => {
      return Promise.resolve(file)
        .then(ReadFile(opts))
        .then(ParseFile(opts))
        .then(FilterRequires(opts));
    });
  })
  .then(list => {
    return list
      // flatten the list of lists
      .reduce((all, some) => all.concat(some), [])
      // unique-ify
      .reduce((all, name) => all.includes(name) ? all : all.concat(name), []);
  })
  .then(FilterBuiltin(opts));

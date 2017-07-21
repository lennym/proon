'use strict';

const glob = require('glob');
const path = require('path');
const ignore = require('ignore');
const fs = require('fs');

module.exports = opts => () => {
  const settings = {
    cwd: opts.root,
    ignore: [
      'node_modules/**'
    ]
  };
  if (opts.ignore) {
    settings.ignore = settings.ignore.concat(opts.ignore);
  }
  if (opts.production) {
    settings.ignore.push('test/**');
  }
  const paths = ['**/*.js?(x)'].concat(opts.include);
  return paths.reduce((promise, p) => {
    return promise.then(list => {
      return new Promise((resolve, reject) => {
        glob(p, settings, (err, results) => {
          return err ? reject(err) : resolve(list.concat(results));
        });
      });
    })
  }, Promise.resolve([]))
  .then(list => {
    if (opts.ignore === 'git') {
      return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(opts.root, '.gitignore'), (err, content) => {
          if (err) {
            return resolve();
          }
          resolve(content.toString());
        });
      })
      .then(ignorefile => {
        return ignore()
          .add(ignorefile)
          .filter(list);
      });
    }
    return ignore()
      .add(opts.ignore)
      .filter(list);
  })
  .then(list => list.map(file => path.join(opts.root, file)));
};

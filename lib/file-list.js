'use strict';

const glob = require('glob');
const path = require('path');
const ignore = require('ignore');
const fs = require('fs');

module.exports = opts => () => {
  return new Promise((resolve, reject) => {
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
    glob('**/*.js?(x)', settings, (err, list) => {
      return err ? reject(err) : resolve(list);
    });
  })
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

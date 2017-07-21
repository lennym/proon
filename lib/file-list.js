'use strict';

const glob = require('glob');
const path = require('path');

module.exports = opts => () => {
  return new Promise((resolve, reject) => {
    const settings = {
      cwd: opts.root,
      ignore: [
        'node_modules/**'
      ]
    };
    if (opts.production) {
      settings.ignore.push('test/**');
    }
    glob('**/*.js?(x)', settings, (err, list) => {
      return err ? reject(err) : resolve(list);
    });
  })
  .then(list => list.map(file => path.join(opts.root, file)));
};

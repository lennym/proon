'use strict';

const chalk = require('chalk');

module.exports = result => {
  console.log();
  if (result.implicit.length) {
    console.log(chalk.red('The following modules are required in code, but not listed as dependencies in package.json:'));
    result.implicit.forEach(name => console.log(`* ${name}`));
  } else {
    console.log(chalk.green('All of your required modules are listed in package.json!'));
  }
  console.log();
  if (result.redundant.length) {
    console.log(chalk.red('The following modules are listed as dependencies, but are not required in code:'));
    result.redundant.forEach(name => console.log(`* ${name}`));
  } else {
    console.log(chalk.green('All of your dependencies listed in package.json are used in code!'));
  }
};

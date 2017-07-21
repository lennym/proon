'use strict';

module.exports = (left, right) => {
  return left.filter(name => !right.includes(name));
}
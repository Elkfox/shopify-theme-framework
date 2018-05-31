const path = require('path');

const alias = {
  jquery: path.resolve('./node_modules/jquery'),
  'normalize': path.resolve('./node_modules/normalize.css'),
};

module.exports = {
  extends: {
    dev: {resolve: {alias}},
    prod: {resolve: {alias}},
  },
};

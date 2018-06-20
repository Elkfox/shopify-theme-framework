const path = require('path');

const alias = {
  jquery: path.resolve('./node_modules/jquery'),
  'normalize': path.resolve('./node_modules/normalize.css'),
};

// const config = require('$');

// import $ from 'jquery';

// var $;

module.exports = {
  extends: {
    dev: {resolve: {alias}},
    prod: {resolve: {alias}},
  },
  externals: {
    jquery: 'jQuery'
  },
};

// module.exports = {
//   slateTools: {
//     extends: {
//       dev: {
//         resolve: {alias},
//         module: {
//           rules: [
//             {
//               test: require.resolve('owl.carousel'),
//               use: 'imports-loader?$=jquery,jQuery=jquery',
//             },
//           ],
//         },
//       },
//       prod: {
//         resolve: {alias},
//         module: {
//           rules: [
//             {
//               test: require.resolve('owl.carousel'),
//               use: 'imports-loader?$=jquery,jQuery=jquery',
//             },
//           ],
//         },
//       },
//     },
//   },
// };

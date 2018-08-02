const path = require('path');

const alias = {
  jquery: path.resolve('./node_modules/jquery'),
  'normalize': path.resolve('./node_modules/normalize.css'),
};

// const config = require('$');

// import $ from 'jquery';

// var $;

module.exports = {
  slateTools: {
    promptSettings: false,
    extends: {
      dev: {
        resolve: {alias},
        module: {
          rules: [
            {
              test: require.resolve('cartfox'),
              use: 'imports-loader?jQuery=jquery,$=jquery',
            },
          ],
        },
      },
      prod: {
        resolve: {alias},
        module: {
          rules: [
            {
              test: require.resolve('cartfox'),
              use: 'imports-loader?jQuery=jquery,$=jquery',
            },
          ],
        },
      },
    },
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

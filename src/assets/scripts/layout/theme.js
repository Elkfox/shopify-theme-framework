import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';
import {cookiesEnabled} from '@shopify/theme-cart';


// See https://stackoverflow.com/questions/10462223/call-a-local-function-within-module-exports-from-another-function-in-module-ex/44461485
// ...and https://docs.npmjs.com/getting-started/packages
var CartFox = require('cartfox'); // See https://eslint.org/docs/rules/no-var
CartFox.aCartFoxFunctionHERE();

// import CartFox from 'cartfox';

// START TESTING
// import $ from 'jquery';
// import CartFox from '../../scripts/layout/cartfox';
// import '../../scripts/layout/cartfox.js';
// import CartFox from 'CartFox'
// const CartFox = require('../../scripts/layout/cartfox.js');
// var CartFox = require('../../scripts/layout/cartfox');
// END TESTING


// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

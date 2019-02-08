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

window.jQuery = require('jquery');
window.Handlebars = require('handlebars/dist/handlebars.min.js');
window.Queue = require('@elkfox/queue');
window.CartFox = require('@elkfox/cart');

// Handlebars helpers (these will move elsewhere, likely to a package)
// Format money using the CartFox formatMoney function
Handlebars.registerHelper('formatMoney', function (amount, options) {
  return cart.formatMoney(amount);
});

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

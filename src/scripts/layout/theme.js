import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';

import $ from 'jquery';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (window.navigator.cookieEnabled) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

/**
 * Micro cart - @ Cam Gould 2018
 * MIT License
 *
 * This tiny jQuery cart is provided as a simple custom Ajax example
 */

function getCart(callback) {
  $.getJSON('/cart.js', callback);
}

function addItem(form) {
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    dataType: 'json',
    data: $(form).serialize(),
    success(data) {
      addItemSuccess(data);
    },
    error(data) {
      addItemFail(data);
    },
  });
}

function addItemSuccess(product) {
  getCart(updateTotals);
  showMessage(product);
}

function updateTotals(cart) {
  $('[data-cart-item-count]').html(cart.item_count);
}

function showMessage(product) {
  $('[data-cart-feedback]').html(`${product.title} was added to the cart!`);
}

function addItemFail(data) {
  const parsedJSON = JSON.parse(data.responseText);
  $('[data-cart-feedback]').html(parsedJSON.description);
}

$(document).ready(() => {
  $('[data-add-to-cart]').on('click', function(loadCart) {
    const $form = $(this).parents('form:first');
    loadCart.preventDefault();
    addItem($form);
  });
});

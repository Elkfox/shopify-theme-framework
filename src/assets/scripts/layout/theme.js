/**
* Theme layout
**/

import "../../styles/layout/theme.scss.liquid";

// import $ from 'jquery';
// Testing only!!!!
// import jQuery from 'jquery';

import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
// window.jQuery = require('jquery');

import "../../scripts/global/q.js";
import "../../scripts/global/cartfox.js";

// import CartFox from 'CartFox'
// var CartFox = require('../../scripts/global/cartfox.js')


import {pageLinkFocus} from '@shopify/theme-a11y';

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';


// var cart;
// $.getJSON('/cart.js', function (data) {
//   console.log(data)
//   cart = new CartFox(data);
// });

$(document).ready(() => {

  // Testing only!!!!
  // alert($.fn.jquery);
  // alert(jQuery.fn.jquery);

  // Confirmation Javascript is available
  document.documentElement.className = document.documentElement.className.replace('noscript', 'js');
  // $('html').removeClass('noscript').addClass('js')

  // Check for cookie compatibility
  // See https://stackoverflow.com/questions/6125330#answer-6125366
  var cookies = ("cookie" in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
  if (cookies === true) {
    $('html').addClass('cookies')
  } else {
    $('html').addClass('no-cookies')
  }

  // TO DO
  // // Common a11y fixes
  // if (window.location.hash !== '#') {
  //   pageLinkFocus($(window.location.hash));
  // }
  //
  // $('.in-page-link').on('click', (evt) => {
  //   pageLinkFocus($(evt.currentTarget.hash));
  // });

  // Target iframes to make them responsive
  const iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]';

  // REQUIRES @shopify/theme-cart, which requires Lodash !?!?!?!
  // wrapIframe({
  //   $iframes: $(iframeSelectors),
  //   iframeWrapperClass: 'rte__video-wrapper',
  // });

});

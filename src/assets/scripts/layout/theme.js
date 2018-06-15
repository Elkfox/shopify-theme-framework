/**
* Theme layout
**/

import "../../styles/layout/theme.scss.liquid";

import $ from 'jquery';
// import jQuery from 'jquery';
import {pageLinkFocus} from '@shopify/theme-a11y';

// var Handlebars = require('Handlebars')
// import Handlebars from 'handlebars';
// import 'handlebars/dist/handlebars.min.js';
// import "../../scripts/global/cartfox.js";

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

$(document).ready(() => {

  // Testing only!!!!
  // alert($.fn.jquery);
  // alert(jQuery.fn.jquery);

  // Confirmation Javascript is available
  $('html').removeClass('noscript')

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

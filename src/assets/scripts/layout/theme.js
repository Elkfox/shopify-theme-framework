import "../../styles/layout/theme.scss.liquid";

import $ from 'jquery';
import {pageLinkFocus} from '@shopify/theme-a11y';
// import {cookiesEnabled} from '@shopify/theme-cart';

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

$(document).ready(() => {
  // Confirmation Javascript is working
  $('html').removeClass('noscript')

  // Common a11y fixes
  if (window.location.hash !== '#') {
    pageLinkFocus($(window.location.hash));
  }

  $('.in-page-link').on('click', (evt) => {
    pageLinkFocus($(evt.currentTarget.hash));
  });

  // Check for cookie compatibility
  // See https://stackoverflow.com/questions/6125330#answer-6125366
  var cookies = ("cookie" in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
  if (cookies === true) {
    $('html').addClass('cookies')
  } else {
    $('html').addClass('no-cookies')
  }

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

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
  // Common a11y fixes
  if (window.location.hash !== '#') {
    pageLinkFocus($(window.location.hash));
  }

  $('.in-page-link').on('click', (evt) => {
    pageLinkFocus($(evt.currentTarget.hash));
  });

  // Target iframes to make them responsive
  const iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]';

  // REQUIRES @shopify/theme-cart, which requires Lodash !?!?!?!
  // wrapIframe({
  //   $iframes: $(iframeSelectors),
  //   iframeWrapperClass: 'rte__video-wrapper',
  // });
  //
  // Apply a specific class to the html element for browser support of cookies.
  // if (cookiesEnabled()) {
  //   document.documentElement.className = document.documentElement.className.replace(
  //     'supports-no-cookies',
  //     'supports-cookies',
  //   );
  // }
});

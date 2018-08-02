/**
* Gift Card layout
*
* @namespace gift_card
* IMPORTANT: This currently will only work during development and will fail to
* load jQuery when deployed
**/

import '../../styles/templates/gift_card.scss.liquid';

import $ from 'jquery';

/**
* QR Code generation
* See https://github.com/soldair/node-qrcode
**/
import "qrcode/build/qrcode.js";
var QRCode = require('qrcode')

const config = {
  printButton: '#PrintGiftCard',
  giftCardCode: '#GiftCardCode',
  QRdata: $('#QR').attr('data-identifier'),
  QRwidth: 400,
};

$(document).ready(() => {
  // Confirmation Javascript is working
  $('html').removeClass('noscript')
});

// QR code for 2D barcode scanners
QRCode.toDataURL(config.printButton, {
    color: {
      dark: '#000', // Black foreground
      light: '#0000' // Transparent background
    },
    width: config.QRwidth
  }, function (err, url) {
  $('#QR').html('<img src="' + url + '" style="width:' + config.QRwidth/2 + 'px">')
})

// Print Gift Card action
$(config.printButton).on('click', () => {
  window.print();
});

// Copy Gift Card code to clipboard automatically
$(config.giftCardCode).click(function () {
   $(this).select().val();
   document.execCommand('copy');
});

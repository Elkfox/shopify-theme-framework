/**
* Gift Card layout
*
* IMPORTANT: This currently will only work during development and will fail to
* load when deployed to current issues with Slate v1
**/

alert('wtf')

import "../../styles/templates/gift_card.scss";

import $ from 'jquery';

/**
* QR Code generation
* See https://github.com/soldair/node-qrcode
**/
import "qrcode/build/qrcode.js";

const config = {
  // qrCode: '#QrCode',
  printButton: '#PrintGiftCard',
  giftCardCode: '.giftcard__code',
};

$(document).ready(() => {
  // Confirmation Javascript is working
  $('html').removeClass('noscript')
});

// QR code for 2D barcode scanners
var QRCode = require('qrcode')
var QRdata = $('#QR').attr('data-identifier')
var QRwidth = 400
QRCode.toDataURL(QRdata, {
    color: {
      dark: '#000', // Black foreground
      light: '#0000' // Transparent background
    },
    width: QRwidth
  }, function (err, url) {
  $('#QR').html('<img src="' + url + '" style="width:' + QRwidth/2 + 'px">')
})

// QRCode.toDataURL('Some text', function (err, url) {
//   $('#QR').html('<img src="' + url + '">')
// })

// new QRCode($qrCode[0], {
//   text: $qrCode.attr('data-identifier'),
//   width: 120,
//   height: 120,
// });

//
$(config.printButton).on('click', () => {
  window.print();
});

// Auto-select gift card code on click, based on ID passed to the function
$(config.giftCardCode).on('click', {element: 'GiftCardDigits'}, selectText);

function selectText(evt) {
  const text = document.getElementById(evt.data.element);
  let range = '';

  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

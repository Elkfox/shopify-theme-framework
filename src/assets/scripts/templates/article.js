/**
* Product Template Scripts
* ------------------------------------------------------------------------------
* A file that contains scripts specifically for blog article templates
*
* @namespace article
**/

import $ from 'jquery';
import {imageSize, preload, getSizedImageUrl} from '@shopify/theme-images';

/**
* Simple visibility toggle for new comments
**/

$('#newComment').click(function() {
  $('.form-container').slideToggle()
});

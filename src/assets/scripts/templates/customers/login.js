/**
* Password template scripts
* ------------------------------------------------------------------------------
* A file that contains scripts specifically for customer login templates
*
* @namespace password
**/

import $ from 'jquery';

const selectors = {
  PasswordRecoverForm: '#RecoverPassword',
  hideRecoverPasswordLink: '#HideRecoverPasswordLink',
};

function onShowHidePasswordForm(evt) {
  evt.preventDefault();
  togglePasswordRecoverForm();
}

function checkUrlHash() {
  const hash = window.location.hash;
  // Allow deep linking to recover password form
  if (hash === '#recover') {
    togglePasswordRecoverForm();
  }
}

/**
 *  Show/Hide recover password form
 */
function togglePasswordRecoverForm() {
  $('#PasswordRecoverForm').toggleClass('hidden');
  $('#customer_login').toggleClass('hidden');
}

/**
 *  Show reset password success message
 */
function resetPasswordSuccess() {
  const $formState = $('.reset-password-success');
  // check if reset password form was successfully submited.
  if (!$formState.length) {
    return;
  }
  // show success message
  $('#ResetSuccess').removeClass('hidden');
}

if ($(selectors.PasswordRecoverForm).length) {
  checkUrlHash();
  resetPasswordSuccess();
  $(selectors.PasswordRecoverForm).on('click', onShowHidePasswordForm);
  $(selectors.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);
}

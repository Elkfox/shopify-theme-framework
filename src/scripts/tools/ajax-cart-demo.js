/**
 * Ajax cart examples
 * -----------------------------------------------------------------------------
 * THESE ARE FOR DEMONSTRATION PURPOSES ONLY
 *
 * Sample functionality using @elkfox/shopify-theme/cart
 *
 * NOTE: Events are asynchronous
 * See https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#youre-building-a-quick-order-form-beware
 */

import {getCart, updateCart, updateItem, getShippingRates, clearItems} from '@elkfox/shopify-theme/scripts/cart';

// Fetch the cart
getCart();

// Then grab the returned details
document.addEventListener('cart:get', (event) => {
  // Update the cart quantity counter
  const cartCount = document.querySelector('[data-cart-count]');
  cartCount.innerHTML = event.detail.json.item_count;

  window.console.info(event.detail.json);
  window.console.info('Cart updated. The time is ', event.detail.json.note);
});

// Watch for items being added to the cart
document.addEventListener('cart:added', (event) => {
  // Alert the user if error or success
  if (event.detail.json.status === 422) {
    window.alert(event.detail.json.description);
  } else {
    window.alert(`${event.detail.json.product_title} was added to your cart`);

    // Get the cart to update the UI
    getCart();
  }
});

// Watch for rejected requests when items are added to the cart
document.addEventListener('cart:error', (event) => {
  window.console.info(event.detail.json);
});

// Example cart update (also accepts line items and cart attributes)
const rightNow = new Date().toLocaleTimeString();

const cartNote = {
  note: rightNow,
};

updateCart(cartNote);

// Watch for cart update events
document.addEventListener('cart:change', (event) => {
  window.console.info(event.detail.json);
});

// Watch for cart item clear events
document.addEventListener('cart:clear', (event) => {
  window.console.info(event.detail.json);
});

// Fetch shipping rates (requires a valid cart)
const address = {
  'shipping_address[country]': 'Australia',
  'shipping_address[province]': 'Victoria',
  'shipping_address[zip]': '3000',
};

getShippingRates(address);

// Then grab the returned details
document.addEventListener('cart:get:rates', (event) => {
  window.console.info(event.detail.json);
});

// Update 1st line item
const updateLineItem1 = document.querySelector('[data-update-item]');

updateLineItem1.addEventListener('click', () => {
  const data = {
    quantity: 2,
    line: 1,
  };

  updateItem(data);
});

// Listen for item update events
document.addEventListener('cart:change', () => {
  // Get the updated cart
  getCart();
});

// Clear cart items
const clearItemsButton = document.querySelector('[data-clear-cart]');

clearItemsButton.addEventListener('click', () => {
  clearItems();
});

// Listen for clear items events
document.addEventListener('cart:clear', () => {
  // Get the updated cart
  getCart();
});

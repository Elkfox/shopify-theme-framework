/*==============================================================================
 ___  _   _    _
/   || | | |  | |
\__  | | | |  | |  __
/    |/  |/_) |/  /  \_/\/
\___/|__/| \_/|__/\__/  /\_/
              |\
              |/

Cartfox v3.0-alpha.2
https://github.com/Elkfox/Cartfox
Copyright (c) 2018 Elkfox Co Pty Ltd

https://elkfox.com
Project lead: Oscar Strangio
MIT License
==============================================================================*/

const CartFox = function CartFox(configuration) {
  'use strict';

  // Set up our Cartfox instance with the defined configuration
  const config = configuration;
  const cart = config.cart || {};
  const selectors = config.selectors || {};
  const options = config.options || {};

  // Define the default selectors and options for the class
  const defaultSelectors = {
    cart: '[data-cart]',
    cartItemCount: '[data-cart-item-count]',
    cartTotal: '[data-cart-total]',
    decreaseQuantity: '[data-minus-one]',
    increaseQuantity: '[data-plus-one]',
    itemQuantity: '[data-item-quantity]',
    staticQuantity: '[data-static]',
    staticChangeQuantity: '[data-adjust]',
    addItem: '[data-add-to-cart]',
    quickAdd: '[data-quick-add]',
    quickAddQuantity: '[data-quick-add-qty]',
    quickAddProperties: '[data-quick-add-properties]',
    removeItem: '[data-remove-item]',
    updateItem: '[data-update-item]',
    emptyTemplate: '[data-cart-template]',
    itemsContainer: '[data-item-container]',
  };
  const defaultOptions = {
    moneyFormat: '${{amount}}',
    quantityTimeout: 500,
    logs: false,
  };

  // Create a new queue
  this.queue = new Q({
    dataType: 'json',
    method: 'POST',
  });

  // Merge and add the settings into the prototype
  this.cart = cart;

  // Keep track of items in an id centric structure
  this.items = this.createItems(cart);
  this.selectors = Object.assign(defaultSelectors, selectors);
  this.options = Object.assign(defaultOptions, options);
  this.renderCart = this.options.renderCart || this.renderCart;
  if (this.options.onRender && typeof this.options.onRender === 'function') { this.onRender = this.options.onRender.bind(this); }

  // Build the event listeners from the selectors
  this.buildEventListeners(this.selectors);
  jQuery(document).trigger('cartfox:ready', [this]);

  // Log, if needed
  this.log('Ready');
  this.log(this.selectors);
  this.log(this.options);

  return this;
}

CartFox.prototype.buildEventListeners = function buildEventListeners(selectors) {
  'use strict';

  // Try and build event listeners using jQuery
  try {
    jQuery(document).on('click', selectors.addItem, this.addToCart.bind(this));
    jQuery(document).on('click', selectors.removeItem, this.removeFromCart.bind(this));
    jQuery(document).on('click', selectors.decreaseQuantity, this.decreaseQuantity.bind(this));
    jQuery(document).on('click', selectors.increaseQuantity, this.increaseQuantity.bind(this));
    jQuery(document).on('click', selectors.quickAdd, this.quickAdd.bind(this));
    this.log('Built event listeners');
  } catch (error) {
    this.log('Could not build event listeners: ' + error, 'warn');
  }
  return this;
};

/*
  Event based Functions
*/
CartFox.prototype.addToCart = function onClickAddToCartButton(event) {
  'use strict';
  event.preventDefault();
  const id = jQuery('[name="id"]').val();
  const quantity = Number(jQuery('[name="quantity"]').val());
  const properties = {};

  if (jQuery('[name*=properties]').length > 0) {
    jQuery('[name*=properties]').each(function getProperty() {
      const key = jQuery(this).attr('name').split('[')[1].split(']')[0];
      const value = jQuery(this).val();
      properties[key] = value;
    });
  }

  const data = {
    id: id,
    quantity: quantity,
    properties: properties,
  };

  this.addItem(data);
  this.log('addItem');
};

CartFox.prototype.quickAdd = function onClickQuickAddButton(event) {
  'use strict';
  event.preventDefault();

  const id = Number(jQuery(event.currentTarget).data(this.getDataAttributeWithValue(this.selectors.quickAdd)));
  const quantity = Number(jQuery(event.currentTarget).data(this.getDataAttributeWithValue(this.selectors.quickAddQuantity))) || 1;
  const properties = jQuery(event.currentTarget).data(this.getDataAttributeWithValue(this.selectors.quickAddProperties)) || {};
  const data = {
    id: id,
    quantity: quantity,
    properties: properties,
  };

  this.addItem(data);
  this.log('quickAdd: (id: ' + id + ' quantity: ' + quantity + ' properties: ' + properties + ')');
};

CartFox.prototype.removeFromCart = function onClickRemoveButton(event) {
  'use strict';
  event.preventDefault();

  const attribute = this.getDataAttributeWithValue(this.selectors.removeItem);
  const line = Number(jQuery(event.currentTarget).data(attribute));

  this.removeItemByLine(line);
};

CartFox.prototype.decreaseQuantity = function onClickDecreaseQuantityButton(event) {
  'use strict';
  event.preventDefault();

  const attribute = this.getDataAttributeWithValue(this.selectors.decreaseQuantity);
  const line = Number(jQuery(event.currentTarget).data(attribute));
  const index = line - 1;
  const id = this.cart.items[index].id;
  const quantityAttribute = this.getAttributeWithValue(this.selectors.itemQuantity, line);
  const quantityValue = Number(jQuery(quantityAttribute).val());
  const quantity = quantityValue || this.cart.items[index].quantity;
  const newQuantity = quantity - 1;

  if (newQuantity >= 0) {
    jQuery(quantityAttribute).val(newQuantity);

    const success = function success(cart) {
      this.updateCartObject(cart);
      return jQuery(document).trigger('cartfox:itemQuantityDecreased', [cart]);
    }.bind(this);
    const error = function error(error) {
      return jQuery(document).trigger('cartfox:cannotDecreaseItemQuantity', [error]);
    }
    const options = {
      success: success,
      error: error,
    }

    if (typeof this.quantityTimeout == 'number') {
      this.log('Cleared quantityTimeout');
      clearTimeout(this.quantityTimeout);
    }

    this.quantityTimeout = setTimeout(function() {
      this.updateItemByLine(line, newQuantity, options);
      this.quantityTimeout = null;
    }.bind(this), this.options.quantityTimeout);
  }
};

CartFox.prototype.increaseQuantity = function onClickIncreaseQuantityButton(event) {
  'use strict';
  event.preventDefault();

  const attribute = this.getDataAttributeWithValue(this.selectors.increaseQuantity);
  const line = Number(jQuery(event.currentTarget).data(attribute));
  const index = line - 1;
  const id = this.cart.items[index].id;
  const quantityAttribute = this.getAttributeWithValue(this.selectors.itemQuantity, line);
  const quantityValue = Number(jQuery(quantityAttribute).val());
  const quantity = quantityValue || this.cart.items[index].quantity;
  const newQuantity = quantity + 1;
  jQuery(quantityAttribute).val(newQuantity);

  const success = function success(cart) {
    this.updateCartObject(cart);
    return jQuery(document).trigger('cartfox:itemQuantityIncreased', [cart]);
  }.bind(this);
  const error = function error(error) {
    return jQuery(document).trigger('cartfox:cannotIncreaseItemQuantity', [error]);
  }
  const options = {
    success: success,
    error: error,
  }

  if (typeof this.quantityTimeout == 'number') {
    this.log('Cleared quantityTimeout');
    clearTimeout(this.quantityTimeout);
  }

  this.quantityTimeout = setTimeout(function() {
    this.updateItemByLine(line, newQuantity, options);
    this.quantityTimeout = null;
  }.bind(this), this.options.quantityTimeout);
};
/*
  End Event based Functions
*/

/*
  AJAX API Functions
*/

// Get a fresh cart back from the API
// Request a fresh cart from 'cart.js'
// Then re-render the cart
CartFox.prototype.getCart = function getCart(config) {
  'use strict';

  const options = config || {};
  const success = options.success || function getCartSuccess(cart) {
    this.updateCartObject(cart);
  }.bind(this);

  const request = {
    url: '/cart.js',
    method: 'GET',
    success: success,
  };

  // Add the request to the queue
  this.queue.add(request);
  this.log('Queued: Get cart');
  return this.cart;
}

// Updating cart object
// Update global this.cart from the returned 'update.js' or 'change.js' API callback
// Then re-render the cart
CartFox.prototype.updateCartObject = function updateCartObjectFromNewCart(cart) {
  'use strict';

  this.cart = cart;
  this.renderCart(this.cart);
  this.log('Updated cart object');
}

// Default cart rendering
// Trigger a renderCart event and run any onRender functions
// Can be overwritten from new Cartfox init
CartFox.prototype.renderCart = function renderCartFromObject() {
  'use strict';

  $(this.selectors.cartItemCount).html(this.cart.item_count);
  jQuery(document).trigger('cartfox:onRender', this.cart);

  if (this.onRender && typeof this.onRender === 'function') {
    this.onRender(this.cart);
  }

  this.log('Triggered: onRender');
}

// Create an AJAX request to add an item the cart
// Accepts an object of the item to add:
//  - id (required)
//  - quantity
//  - properties
CartFox.prototype.addItem = function addItem(data, config) {
  'use strict';

  const item = data || {};
  const options = config || {};

  if (item.id === undefined) {
    return false;
  }
  item.quantity = item.quantity || 1;
  item.properties = item.properties || {};

  options.success = options.success || function success(lineItem) {
    this.getCart();
    return jQuery(document).trigger('cartfox:itemAdded', [lineItem]);
  }.bind(this);
  options.error = options.error || function error(error) {
    return jQuery(document).trigger('cartfox:cannotAddToCart', [error]);
  }.bind(this);

  const request = {
    url: '/cart/add.js',
    data: item,
    success: options.success,
    error: options.error,
  };

  // Add the request to the queue
  jQuery(document).trigger('cartfox:beforeItemAdded');
  this.queue.add(request);
  this.log('Queued: beforeItemAdded');
  return this;
};

// Remove item by id
// Accepts an item id and config
CartFox.prototype.removeItemById = function removeItemById(id, config) {
  'use strict';

  const data = { updates: {} };
  const options = config || {};
  data.updates[id] = 0;

  options.success = options.success || function success(cart) {
    this.updateCartObject(cart);
    return jQuery(document).trigger('cartfox:itemRemoved', [cart]);
  }.bind(this);
  options.error = options.error || function error(error) {
    return jQuery(document).trigger('cartfox:cannotRemoveFromCart', [error]);
  };

  const request = {
    url: '/cart/update.js',
    data: data,
    error: options.error,
    success: options.success,
  }

  // Add the request to the queue
  jQuery(document).trigger('cartfox:beforeItemRemoved');
  this.queue.add(request);
  this.log('Queued: beforeItemRemoved');
  return this;
}

// Remove item by line
CartFox.prototype.removeItemByLine = function removeItemFromCartUsingLineindex(line, config) {
  'use strict';

  const options = config || {};

  options.success = options.success || function success(cart) {
    this.updateCartObject(cart)
    return jQuery(document).trigger('cartfox:itemRemoved', [cart]);
  }.bind(this);
  options.error = options.error || function error(error) {
    return jQuery(document).trigger('cartfox:cannotRemoveFromCart', [error]);
  };

  const request = {
    url: '/cart/change.js',
    data: {
      line: line,
      quantity: 0,
    },
    success: options.success,
    error: options.error,
  };

  // Add the request to the queue
  jQuery(document).trigger('cartfox:beforeItemRemoved');
  this.queue.add(request);
  this.log('Queued: beforeItemRemoved');
  return this;
}

CartFox.prototype.updateItemById = function updateItemById(id, quantity, config) {
  'use strict';
  const data = { updates: {} };
  const options = config || {};

  data.updates[id] = quantity;

  options.success = options.success || function success(cart) {
    this.updateCartObject(cart)
    return jQuery(document).trigger('cartfox:itemUpdated', [cart]);
  }.bind(this);
  options.error = options.error || function error(error) {
    return jQuery(document).trigger('cartfox:cannotUpdateItem', [error]);
  };

  const request = {
    url: '/cart/update.js',
    data: data,
    error: options.error,
    success: options.success,
  }

  // Add the request to the queue
  jQuery(document).trigger('cartfox:beforeItemUpdated');
  this.queue.add(request);
  this.log('Queued: beforeItemUpdated');
  return this;
}

CartFox.prototype.updateItemByLine = function updateItemFromCartUsingLineindex(line, quantity, config) {
  'use strict';
  const options = config || {};

  options.success = options.success || function success(cart) {
    this.updateCartObject(cart)
    return jQuery(document).trigger('cartfox:itemUpdated', [cart]);
  }.bind(this);
  options.error = options.error || function error(error) {
    return jQuery(document).trigger('cartfox:cannotUpdateItem', [error]);
  };

  const request = {
    url: '/cart/change.js',
    data: {
      line: line,
      quantity: quantity,
    },
    success: options.success,
    error: options.error,
  };

  // Add the request to the queue
  jQuery(document).trigger('cartfox:beforeItemUpdated');
  this.queue.add(request);
  this.log('Queued: beforeItemUpdated (Line: ' + line + '. Quantity: ' + quantity + ')');
  return this;
}

CartFox.prototype.clearCart = function clearCart(config) {
  'use strict';
  const options = config || {};

  options.success = options.success || function success(cart) {
    this.updateCartObject(cart);
    return jQuery(document).trigger('cartfox:cartCleared', [cart]);
  }.bind(this);
  options.error = options.error || function error(error) {
    return jQuery(document).trigger('cartfox:cannotClearCart', [error]);
  };

  const request = {
    url: '/cart/clear.js',
    success: options.success,
    error: options.error,
  };

  // Add the request to the queue
  jQuery(document).trigger('cartfox:beforeCartCleared');
  this.queue.add(request);
  this.log('Queued: beforeCartCleared');
  return this;
}

/*
  END AJAX API Functions
*/

/*
  Utility Functions
*/

CartFox.prototype.getDataAttributeWithValue = function getAttributeFromDataAttributeSelector(selector, value) {
  if (typeof value != 'undefined') {
    return selector.replace('[data-', '').replace(']', '="' + value + '"');
  } else {
    return selector.replace('[data-', '').replace(']', '');
  }
};

CartFox.prototype.getAttributeWithValue = function getAttributeFromDataAttributeSelector(selector, value) {
  if (typeof value != 'undefined') {
    return selector.replace(']', '="' + value + '"]');
  } else {
    return false;
  }
};

CartFox.prototype.createItems = function createAnIdCentricDataStuctureFromTheCart(cart) {
  const items = {};

  for (var i = 0; i < cart.items.length; i++) {
    items[cart.items[i].id] = {
      line: i+1,
      quantity: cart.items[i].quantity
    }
  }

  return items;
};

CartFox.prototype.log = function createConsoleLog(log, type) {
  const message = log;

  if (typeof message == 'object') {
    var logMessage = message;
  } else {
    var logMessage = 'Cartfox: ' + message;
  }

  if (this.options.logs) {
    if (typeof type != 'undefined') {
      if (type == 'error') {
        console.error(logMessage);
      } else if (type == 'warn') {
        console.warn(logMessage);
      } else {
        console.info(logMessage);
      }
    } else {
      console.info(logMessage);
    }
  }
};

/*
  End Utility Functions
*/

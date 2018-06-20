function CartFox() {
  'use strict';

  // Check each of the parameters exist and assign them to their default type if not.
  const cart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const selectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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
  this.selectors = Object.assign(selectors, defaultSelectors);
  this.options = Object.assign(options, defaultOptions);
  // Build the event listeners from the selectors
  this.buildEventListeners(this.selectors);
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
  } catch (error) {
    console.warn('Could not build event listeners: ' + error);
  }
  return this;
};

/*
  Event based Functions
*/
CartFox.prototype.addToCart = function onClickAddToCartButton(event) {
  'use strict';
  event.preventDefault();
  const id = jQuery('[name=id]').val();
  const quantity = Number(jQuery('[name=quantity]').val());
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
};

CartFox.prototype.quickAdd = function onClickQuickAddButton(event) {
  'use strict';
  event.preventDefault();
  const id = Number(jQuery(event.currentTarget).data(this.getDataAttribute(this.selectors.quickAdd)));
  const quantity = Number(jQuery(event.currentTarget).data(this.getDataAttribute(this.selectors.quickAddQuantity))) || 1;
  const properties = jQuery(event.currentTarget).data(this.getDataAttribute(this.selectors.quickAddProperties)) || {};
  console.log(properties)
  const data = {
    id: id,
    quantity: quantity,
    properties: properties,
  };
  this.addItem(data);
};

CartFox.prototype.removeFromCart = function onClickRemoveButton(event) {
  'use strict';
  event.preventDefault();
  const attribute = this.getDataAttribute(this.selectors.removeItem);
  const line = Number(jQuery(event.currentTarget).data(attribute));
  this.removeItemByLine(line);
};

CartFox.prototype.decreaseQuantity = function onClickDecreaseQuantityButton(event) {
  'use strict';
  event.preventDefault();
  const attribute = this.getDataAttribute(this.selectors.decreaseQuantity);
  const line = Number(jQuery(event.currentTarget).data(attribute));
  const index = line - 1;
  const id = this.cart.items[index].id;
  const quantity = this.cart.items[index].quantity - 1;
  const success = function success(cart) {
    return jQuery(document).trigger('cartfox:itemQuantityDecreased', [cart]);
  }
  const error = function error(error) {
    return jQuery(document).trigger('cartfox:cannotDecreaseItemQuantity', [error]);
  }
  const options = {
    success: success,
    error: error,
  }
  this.updateItemByLine(line, quantity, options);
};

CartFox.prototype.increaseQuantity = function onClickIncreaseQuantityButton(event) {
  'use strict';
  event.preventDefault();
  console.log('increasing')
  const attribute = this.getDataAttribute(this.selectors.increaseQuantity);
  const line = Number(jQuery(event.currentTarget).data(attribute));
  const index = line - 1;
  console.log(index)
  const id = this.cart.items[index].id;
  const quantity = this.cart.items[index].quantity + 1;
  const success = function success(cart) {
    return jQuery(document).trigger('cartfox:itemQuantityIncreased', [cart]);
  }
  const error = function error(error) {
    return jQuery(document).trigger('cartfox:cannotIncreaseItemQuantity', [error]);
  }
  const options = {
    success: success,
    error: error,
  }
  this.updateItemByLine(line, quantity, options);
};
/*
  End Event based Functions
*/

/*
  AJAX API Functions
*/

CartFox.prototype.getCart = function getCart() {
  'use strict';
  return this.cart;
}

// Create an ajax request to add an item the cart
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
    return jQuery(document).trigger('cartfox:itemAdded', [lineItem]);
  };
  options.error = options.error || function error(error) {
    return jQuery(document).trigger('cartfox:cannotAddToCart', [error]);
  };

  const request = {
    url: '/cart/add.js',
    data: item,
    success: options.success,
    error: options.error,
  };

  // Add the function to the queue
  this.queue.add(request);
  return this;
};

CartFox.prototype.removeItemById = function removeItemById(id, config) {
  'use strict';
  const data = { updates: {} };
  const options = config || {};

  data.updates[id] = 0;

  options.success = options.success || function success(cart) {
    console.log(cart)
    return jQuery(document).trigger('cartfox:itemRemoved', [cart]);
  };
  options.error = options.error || function error(error) {
    console.log(error)
    return jQuery(document).trigger('cartfox:cannotRemoveFromCart', [error]);
  };
  const request = {
    url: '/cart/update.js',
    data: data,
    error: options.error,
    success: options.success,
  }
  this.queue.add(request);
  return this;
}

CartFox.prototype.removeItemByLine = function removeItemFromCartUsingLineindex(line, config) {
  'use strict';
  const options = config || {};

  options.success = options.success || function success(cart) {
    console.log(cart)
    return jQuery(document).trigger('cartfox:itemRemoved', [cart]);
  };
  options.error = options.error || function error(error) {
    console.log(error)
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
  console.log(request)

  this.queue.add(request);
  return this;
}

CartFox.prototype.updateItemById = function updateItemById(id, quantity, config) {
  'use strict';
  const data = { updates: {} };
  const options = config || {};

  data.updates[id] = quantity;

  options.success = options.success || function success(cart) {
    console.log(cart)
    return jQuery(document).trigger('cartfox:itemUpdated', [cart]);
  };
  options.error = options.error || function error(error) {
    console.log(error)
    return jQuery(document).trigger('cartfox:cannotUpdateItem', [error]);
  };
  const request = {
    url: '/cart/update.js',
    data: data,
    error: options.error,
    success: options.success,
  }
  console.log(request)
  this.queue.add(request);
  return this;
}

CartFox.prototype.updateItemByLine = function updateItemFromCartUsingLineindex(line, quantity, config) {
  'use strict';
  const options = config || {};

  options.success = options.success || function success(cart) {
    console.log(cart)
    return jQuery(document).trigger('cartfox:itemUpdated', [cart]);
  };
  options.error = options.error || function error(error) {
    console.log(error)
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
  console.log(request)

  this.queue.add(request);
  return this;
}

/*
  END AJAX API Functions
*/

/*
  Utility Functions
*/

CartFox.prototype.getDataAttribute = function getAttributeFromDataAttributeSelector(selector) {
  return selector.replace('[data-', '').replace(']', '');
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

/*
  End Utility Functions
*/

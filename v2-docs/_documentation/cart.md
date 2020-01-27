---
title:  "Cartfox"
handle: "cart"
category: "javascript modules"
---
Concrete uses [Cartfox🛒🦊](https://github.com/Elkfox/Cartfox) for all things ajax-y and cart-ish. If you're developing with Slate you can find an un-minified version in `/src/scripts/vendor/concrete.cart.js`. Upon deployment this will be minified into the `vendor.js`.

As you can see in the `/layout/theme.liquid` Cartfox is initialized here using Concrete's default elements for selectors. If you wish to changes class names or apply different selectors, you can do so here.

{% highlight javascript %}
var cart;
$(document).ready(function() {
  cart = new Cartfox.Cart({{ cart | json }}, {
    addItem: '[data-add-to-cart]',
    cartItemCount: "[data-cart-item-count]",
    cartTotal: "[data-cart-total]",
    decreaseQuantity: "[data-minus-one]",
    increaseQuantity: "[data-plus-one]",
    itemQuantity: '[data-item-quantity]',
    removeItem: '[data-remove-item]',
    emptyTemplate: '[data-cart-template]',
    itemsContainer: '[data-item-container]'
  });
});
{% endhighlight %}

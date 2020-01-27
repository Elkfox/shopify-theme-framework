---
title:  "Concrete Sections"
handle: "concrete-sections"
category: "javascript modules"
---

With the introduction of Sections came some new challenges. It is important that the merchant has a seamless experience when modifying the theme throughout the theme customiser. Shopify has supplied us with some JavaScript events that are fired when the merchant interacts with the customiser. You can read more about this [here](https://help.shopify.com/themes/development/theme-editor/sections#understand-the-interaction-between-theme-javascript-and-the-theme-editor).

These events are at the time of writing this:
  - `shopify:section:load`
  - `shopify:section:unload`
  - `shopify:section:select`
  - `shopify:section:deselect`
  - `shopify:section:reorder`
  - `shopify:block:select`
  - `shopify:block:deselect`

On the container of the product form the data attribute `data-section-type="product"` has been applied. Using the the section type we can register the sections javascript at the bottom of our app.js like this:

{% highlight javascript %}
// Initialize on document ready
$(document).ready(function() {
  var sections = new concrete.Sections();
  sections.register('product', concrete.Product);
})
{% endhighlight %}

At the bottom of `concrete.Product` you can see the method `unload()` which will remove all of the event handlers that we have applied when the section is unloaded.

{% highlight javascript %}
onUnload: function() {
  this.$container.off();
}
{% endhighlight %}

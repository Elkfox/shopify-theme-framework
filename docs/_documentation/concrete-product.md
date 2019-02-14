---
title:  "Concrete Product"
handle: "concrete-product"
category: "javascript modules"
---

There are lots of elements to manage on the product page. `concrete.Product` handles these. To function correctly, it needs to be able to capture the product in `JSON` format. The easiest way to do this is on the bottom of the product template like so:
{% highlight html %}
{% raw %}
<script type="application/json" id="ProductJson">
 {{ product | json }}
</script>
{% endraw %}
{% endhighlight %}

Once it has captured the product JSON it handles to following features:
 - Initialising `concrete.Variants` with the option of modifying the history to display the correct variant.
 - `_initVariants`: Setting up event listeners for variant changing.
 - `_updateAddToCart`: Updating the add to cart button. For example when a variant is out of stock, or if no variant has been selected yet the text of the button will change and the button will become disabled.
 - `_updateVariantId`: Modifying the variant that will be added to the cart.
 - `_updatePrices`: Displaying the correct variant price, and whether the product is on sale.


We have included the important parts but it's very easy to extend this function with additions of your own.

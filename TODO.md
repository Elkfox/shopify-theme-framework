* Add lorem ipsum placeholder to labguage file and inclide as placeholder for 'if empty' pages

* The rivets delay issue needs more work

* See if we can reverse the addresses in the customer address template so the default address appears first
  * This does not work:
  ``{% assign addresses = customer.addresses | sort: reversed %}
   {% for address in addresses %}``

* Product Page
  * Compare at price function is not working on variant switch
    * See https://concrete-theme.myshopify.com/products/product-demo-1?variant=32550079759
  * Add savings as percentage using Cart.js
  * Add SKU (default to hidden)
  * Add quantity available (default to hidden)
  * Clean up product image gallery functions and tie them to variant selection more cleanly
    * Ideally should be more easily integrated with sliders etc
    * We will probably need the following options by default
      * Image zoom
      * Popup image gallery


## Libraries that may or may not be added later

* [FastClick](https://github.com/ftlabs/fastclick) eliminates the 300ms delay on click events on mobile browsers
* Unslider by Idiot http://unslider.com

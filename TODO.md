* Add lorem ipsum placeholder to labguage file and inclide as placeholder for 'if empty' pages
* See if we can reverse the addresses in the customer address template so the default address appears first
  * This does not work:
  ``{% assign addresses = customer.addresses | sort: reversed %}
   {% for address in addresses %}``


 ## Libraries that may or may not be added later

 * [FastClick](https://github.com/ftlabs/fastclick) eliminates the 300ms delay on click events on mobile browsers

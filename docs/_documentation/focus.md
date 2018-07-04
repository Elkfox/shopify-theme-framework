---
title:  "Focus"
handle: "focus"
category: "javascript modules"
---

Popup visibility is handled by our very own visibility module, [Focus](https://github.com/Elkfox/Focus).

By default Concrete has three popups; cart, address and errors. These are located in the snippets directory and are always prefixed with `popup-`.

Creating a new popup is very easy; here is the basic structure:

{% highlight html %}
{% raw %}
<div id="PopupNew" class="popup overlay">
  <div class="popup-inner">
    <div class="popup-content left">
      <h1>New Popup</h1>

      <a href="#close" class="popup-close" data-close aria-label="{{ 'common.close' | t }}">{% include 'icon' with 'close' %}</a>
    </div>
  </div>
</div>

<script>
  var newPopup = new Focus('#PopupNew');
</script>
{% endraw %}
{% endhighlight %}

This will create a basic popup with a heading and a close button. Now we want to display the popup every time someone clicks an element.

{% highlight html %}
<button data-trigger="popup" data-target="#PopupNew">Click Me</button>
{% endhighlight %}

##### Selectors
 - `data-trigger="popup"` Defines an element that will trigger a popup when clicked.
 - `data-target="#examplePopup"` Defines the popup that we are targeting.
 - `data-close` Closes the current popup.

##### jQuery Events
The following events occur when opening, closing, or toggling a Focus element:

| Event        | Parameters          | Description  |
| ------------- |:-------------| :-----|
| focus:open     | target (String) | Fires when a Focus element has finished opening, passes the target element to the event. |
| focus:close    | target (String)     |   Fires when a Focus element has finished closing, passes the target element to the event. |
| focus:error | error (String)      | Fires when an event cannot open or close, passes the error to the event. |

You can learn more about working with popups over at our [Focus docs](https://github.com/Elkfox/Focus).

---
title:  "Focus"
handle: "focus"
category: "javascript modules"
---

Popup visibility is handle by our very own popup module, [Focus](https://github.com/Elkfox/Focus).

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
  The following events occur when opening, closing, or toggling a popup.

| Event        | Parameters          | Description      |
| ------------ | ------------------- | ---------------- |
| `focus:open`     | None | Fires when a popup has finished opening |
| `focus:close`    | None     |   Fires when a popup has finished closing |
| `focus:error` | error (String)      | Fires when an event cannot open or close. Returns the error event |

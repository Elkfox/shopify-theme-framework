---
title:  "Container"
handle: "grid-container"
category: "grid"
---
The `container` class is used to stop elements from touching the edges of the window by a factor of `$gutter`. You can optionally add a `max-width` using a breakpoint helper such as `l` or `s`

{% highlight html %}
<!-- This element is full width and will touch the screen edges -->
<div></div>

<!-- This element is full width but has horizontal padding equal to $gutter -->
<div class="container"></div>

<!-- This element is full width but has horizontal padding equal to $gutter, and it's max-width is equal to the $l breakpoint  -->
<div class="container l"></div>

<!-- This element is full width but has horizontal padding equal to $gutter, and it's max-width is equal to the $s breakpoint  -->
<div class="container s"></div>
{% endhighlight %}

<div class="demo-wrapper">
  <div class="demo-grid">
  Full width
  </div>

  <div class="container demo-grid">
  container
  </div>

  <div class="container s demo-grid">
  container s
  </div>
</div>

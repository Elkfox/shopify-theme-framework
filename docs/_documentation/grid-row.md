---
title:  "Row"
handle: "grid-row"
category: "grid"
---
Rows provide spacing below to differentiate `div`isions within a container. They also help align child `column`'s left edge by applying a negative margin.

{% highlight html %}
<div class="container">
  <div class="row"></div>
</div>
{% endhighlight %}



By default the row class has a bottom margin equal to `$gutter`. You will find that in some scenarios this is not desired.

{% highlight html %}
<!-- This will have a bottom margin equal to $gutter -->
<div class="row"></div>

<!-- This will not have a bottom margin -->
<div class="row collapse"></div>
{% endhighlight %}
<div class="demo-wrapper">
  <div class="container demo-grid">
    container
    <div class="row demo-grid">row</div>
    <div class="row demo-grid">row</div>
    <div class="row demo-grid">row</div>
  </div>
</div>

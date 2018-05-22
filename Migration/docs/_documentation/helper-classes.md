---
title:  "Helper classes"
handle: "helper-classes"
category: "styles"
---
Concrete has some helper classes to... well, help.
##### Alignment

{% highlight html %}
<div class="container">
  <div class="row">
    <div class="column l12 left">
      Left
    </div>
  </div>
  <div class="row">
    <div class="column l12 center">
      Center
    </div>
  </div>
    <div class="row">
      <div class="column l12 right">
       Right
      </div>
    </div>
</div>
{% endhighlight %}
<div class="demo-wrapper">
  <div class="container demo-grid">
    <div class="row demo-grid">
      <div class="column l12 left demo-grid">
        Left
      </div>
    </div>
    <div class="row demo-grid">
      <div class="column l12 center demo-grid">
        Center
      </div>
    </div>
      <div class="row demo-grid">
        <div class="column l12 right demo-grid">
         Right
        </div>
      </div>
  </div>
</div>

You can also define different alignment for different screen sizes.
{% highlight html %}
<div class="container">
  <div class="row">
    <div class="column l12 xl-left l-center m-right">
      xl-left l-center m-right
    </div>
  </div>
  <div class="row">
    <div class="column l12 l-center m-center s-right">
        l-center m-center s-right
    </div>
  </div>
    <div class="row">
      <div class="column l12 s-right">
        s-right
      </div>
    </div>
</div>
{% endhighlight %}

Adjust your screen width to see the alignment change.
<div class="demo-wrapper">
  <div class="container demo-grid">
    <div class="row demo-grid">
      <div class="column l12 xl-left l-center m-right demo-grid">
        xl-left l-center m-right. <br>
        Because there is no small position defined, the position will default to left.
      </div>
    </div>
    <div class="row demo-grid">
      <div class="column l12 l-center m-center s-right demo-grid">
          l-center m-center s-right. <br>
          Because there is no extra large position defined, the position will default to left.
      </div>
    </div>
      <div class="row demo-grid">
        <div class="column l12 s-right demo-grid">
          s-right
        </div>
      </div>
  </div>
</div>

##### Display methods
###### inline
{% highlight html %}
<!-- This will display vertically -->
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ul>
<!-- This will display horizontally and won't have a list style -->
<ul class="inline">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ul>
{% endhighlight %}

<div class="demo-wrapper">
  <ul class="demo-grid">
    <li class="demo-grid">One</li>
    <li class="demo-grid">Two</li>
    <li class="demo-grid">Three</li>
    <li class="demo-grid">Four</li>
    <li class="demo-grid">Five</li>
  </ul>
  <!-- This will display horizontally -->
  <ul class="inline demo-grid">
    <li class="demo-grid">One</li>
    <li class="demo-grid">Two</li>
    <li class="demo-grid">Three</li>
    <li class="demo-grid">Four</li>
    <li class="demo-grid">Five</li>
  </ul>
</div>

###### Hide
`hidden` can be used to hide any element. If you wish to hide on a extra large screen sizes you can use `xl-hide`.

{% highlight html %}
  <div class="hidden">Always Hidden</div>
  <div class="xl-hide">Hidden on extra large screens</div>
  <div class="l-hide">Hidden on large screens</div>
  <div class="m-hide">Hidden on medium screens</div>
  <div class="s-hide">Hidden on small screens</div>
{% endhighlight %}

Adjust your screen size to see the elements hide and display

<div class="demo-wrapper">
  <div class="hidden demo-grid">Always Hidden</div>
  <div class="xl-hide demo-grid">Hidden on extra large screens</div>
  <div class="l-hide demo-grid">Hidden on large screens</div>
  <div class="m-hide demo-grid">Hidden on medium screens</div>
  <div class="s-hide demo-grid">Hidden on small screens</div>
</div>

###### Show

Elements will only be visible on the defined screen width.
{% highlight html %}
  <div class="xl-show">Only visible on extra large screens</div>
  <div class="l-show">Only visible on large screens</div>
  <div class="m-show">Only visible on medium screens</div>
  <div class="s-show">Only visible on small screens</div>
{% endhighlight %}

Adjust your screen size to see the elements display and hide.

<div class="demo-wrapper">
  <div class="xl-show demo-grid">Only visible on extra large screens</div>
  <div class="l-show demo-grid">Only visible on large screens</div>
  <div class="m-show demo-grid">Only visible on medium screens</div>
  <div class="s-show demo-grid">Only visible on small screens</div>
</div>

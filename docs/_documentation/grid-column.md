---
title:  "Column"
handle: "grid-column"
category: "grid"
---
The `column` class is used to divide rows into horizontal sections.

{% highlight html %}

<!-- These columns are using row they will fill the width of the container -->
<div class="container">
  <div class="row">
    <div class="column">
      column
    </div>
    <div class="column">
      column
    </div>
  </div>
</div>
{% endhighlight %}

<div class="demo-wrapper">
  <div class="container demo-grid">
    <div class="row demo-grid">
      <div class="column demo-grid">
        column
      </div>
      <div class="column demo-grid">
        column
      </div>
    </div>
  </div>
</div>

As you can see the above columns aren't filling the row, because they have no default width.

By default Grid50 is a twelve column layout. This is easily modified: if you want to find out more about this visit the or if you wish to add a 5 column layout [Grid50 documentation](http://grid50.com).

{% highlight html %}
<div class="container">
  <div class="row">
    <!-- 4 on large, 2 on medium, 1 on small -->
    <div class="column l3 m6 s12"></div>
    <div class="column l3 m6 s12"></div>
    <div class="column l3 m6 s12"></div>
    <div class="column l3 m6 s12"></div>
  </div>
</div>
{% endhighlight %}

<div class="demo-wrapper">
  <div class="container demo-grid">
    <div class="row demo-grid">
      <!-- 4 on large, 2 on medium, 1 on small -->
      <div class="column l3 m6 s12 demo-grid">column l3 m6 s12</div>
      <div class="column l3 m6 s12 demo-grid">column l3 m6 s12</div>
      <div class="column l3 m6 s12 demo-grid">column l3 m6 s12</div>
      <div class="column l3 m6 s12 demo-grid">column l3 m6 s12</div>
    </div>
    <div class="row demo-grid">
      <div class="column l4 m4 s12 demo-grid">column l4 m4 s12</div>
      <div class="column l4 m4 s12 demo-grid">column l4 m4 s12 - Grid50 can automatically clear columns of differing height</div>
      <div class="column l4 m4 s12 demo-grid">column l4 m4 s12</div>
      <div class="column l4 m4 s12 demo-grid">column l4 m4 s12</div>
      <div class="column l4 m4 s12 demo-grid">column l4 m4 s12</div>
      <div class="column l4 m4 s12 demo-grid">column l4 m4 s12</div>
    </div>
  </div>
</div>
As you can see above despite the middle column of the top row being of a differing height the columns clear to the left.

By default Concrete is actually desktop first, however many people prefer to work mobile first: Concrete is easily adapted to do this. You can find out how on the styles page.
{% highlight html %}
<!-- by default concrete is desktop first -->
<div class="container">
  <div class="row">
    <!-- Because Grid50 is desktop first this will result in 4 on large, 4 on medium, 4 on small -->
    <div class="column l3"></div>
    <div class="column l3"></div>
    <div class="column l3"></div>
    <div class="column l3"></div>
  </div>
</div>

<div class="container">
  <div class="row">
    <!-- Because the large and medium breakpoints have not been defined, these columns will be the width of the contents on large and medium screen sizes but one quarter of the width on small -->
    <div class="column s3"></div>
    <div class="column s3"></div>
    <div class="column s3"></div>
    <div class="column s3"></div>
  </div>
</div>
{% endhighlight %}

<div class="demo-wrapper">
  <!-- by default concrete is desktop first -->
  <div class="container demo-grid">
    <div class="row demo-grid">
      <!-- 4 on large, 4 on medium, 4 on small -->
      <div class="column l3 demo-grid">column l3</div>
      <div class="column l3 demo-grid">column l3</div>
      <div class="column l3 demo-grid">column l3</div>
      <div class="column l3 demo-grid">column l3</div>
    </div>
  </div>

  <div class="container demo-grid">
    <div class="row demo-grid">
      <div class="column s3 demo-grid">column s3</div>
      <div class="column s3 demo-grid">column s3</div>
      <div class="column s3 demo-grid">column s3</div>
      <div class="column s3 demo-grid">column s3</div>
    </div>
  </div>
</div>

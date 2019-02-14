---
title:  "SCSS mixins"
handle: "sass-mixins"
category: "styles"
---
Concrete has some really helpful mixins to speed up development. If you are developing using Slate, these are located in `src/styles/utils/mixins.scss`.

###### Prefixer
Use the Prefixer mixin to generate the correct vendor prefixes for the best cross browser support.
{% highlight scss %}
// Input
.class {
  @include prefixer(transform, translateY(-200%), webkit moz ms spec);
}

// Output
.class {
  -webkit-transform: translateY(-200%);
  -moz-transform: translateY(-200%);
  -ms-transform: translateY(-200%);
  transform: translateY(-200%);
}
{% endhighlight %}

###### Media queries
Use the media query mixins to apply styling only to specific screen sizes.

{% highlight scss %}
// Input
.class {
  padding: $gutter;
  @include s() {
    padding: $gutter/4;
  }
}

// Output
.class {
  padding: 50px;
}
@media (max-width: 450px) {
  .class {
    padding: 12.5px;
  }
}

{% endhighlight %}

---
title:  "SCSS Variables"
handle: "sass-variables"
category: "styles"
---
Concrete has some SCSS variables defined that will help to ensure your theme is consistent throughout. If you are building on Slate these variables are located in `src/settings/variables.scss.liquid`.

Note that some of the color variables are defined using liquid, meaning that the variables can be easily tweaked from the theme settings.

##### Colors
{% highlight scss %}
{% raw %}  
// This colour is the main brand color, for example if the website was coca-cola you would set this to red.
$colorBrand: {{ settings.color_brand }};

// This is your main text color if you are building a light theme this will likely need to be dark to contrast, perhaps #333
$colorText: {{ settings.color_body }};

// colorForeground is used to differentiate elements that are in the foreground from the background, such as popups or dropdown menus, modals, tooltips and popups.
$colorForeground: {{ settings.color_foreground }};

// This is the background color for the website ensure it is different from foreground to make things clearer.
$colorBackground: {{ settings.color_background }};

// If your brand has a secondary colour you can set this here for example if the website was Pepsi and the brand color had been set to blue, you would set this to red.
$colorHighlight: {{ settings.color_highlight }};

// If your brand has a tertiary colour you can set this here. Alternatively it will be fine to set this to the brand color too.
$colorAlternate: {{ settings.color_alternate }};

{% endraw %}
{% endhighlight %}

##### Breakpoints
Concrete's default breakpoints. These are used to control media queries and container widths.
{% highlight scss %}
$s: 650px;
$m: 850px;
$l: 1050px;
$xl: 1450px;
{% endhighlight %}

##### Gutter

This is where Grid50 gets it's name. Gutter is always set to 50px, when you apply spacing around the site using gutter can save heaps of time. If you want a space that is less or more than 50 try using SCSS arithmetic functions.

{% highlight scss %}
$gutter: 50px;

.class {
  padding-left: $gutter/2;
  margin: ($gutter/3) ($gutter/5) ($gutter*2);
}
{% endhighlight %}

Knowing that your gutter will be a multiple of 50px is helpful for creating mockups and designing too! 

---
title:  "Sass Variables"
handle: "sass-variables"
category: "styles"
---
Concrete has some sass variables defined that will help to ensure that your theme is consistent throughout. If you are building on Slate these variables are located in `src/settings/variables.scss.liquid`.

Note that some of the color variables are defined using liquid, this means that the variables can be easily tweaked from the theme settings.

##### Colour Variables
{% highlight scss %}
{% raw %}  
// This colour is the main brand color, for example if the website was coca-cola you would set this to red.
$colorBrand: {{ settings.color_brand }};

// This is your main text color if you are building a light theme this will likely be dark, perhaps #333
$colorText: {{ settings.color_body }};

// colorForeground is use to differentiate elements that are in the foreground from the background, such as popups or dropdowns.
$colorForeground: {{ settings.color_foreground }};

// This is the background color for the website ensure it is different from foreground to make things clearer.
$colorBackground: {{ settings.color_background }};

// If your brand has a secondary colour you can set this here for example if the website was pepsi and the brand color had been set to blue, you would set this to red.
$colorHighlight: {{ settings.color_highlight }};

// If your brand has a tertiary colour you can set this here, alternatively it will be fine to set this to the brand color too.
$colorAlternate: {{ settings.color_alternate }};

{% endraw %}
{% endhighlight %}

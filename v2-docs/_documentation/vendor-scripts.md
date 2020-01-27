---
title:  "Vendor scripts"
handle: "vendor-scripts"
category: "scripts"
---
Concrete ships with a few JavaScript libraries. These are minified into the `assets/vendor.js` file, or if you are working in Slate they are in individual files in `src/scripts/vendor/`.

#### [Modernizr](https://modernizr.com/)
Modernizr is used to add features to older browsers and different devices. We have included a lightweight custom build of Modernizr that only includes the features that we require. This custom build can be viewed and modified [here](https://modernizr.com/download/?-csstransforms-csstransforms3d-flexbox-placeholder-svg-touchevents-domprefixes-prefixes-setclasses-testallprops-testprop-teststyles).

#### [jQuery 2.2.3](https://jquery.com/)
I'm sure this doesn't need any introduction. We include jQuery because it saves time and most projects will use it.

#### [Handlebars 4.0.10](http://handlebarsjs.com/)
Handlebars is a 'liquid-like' javascript templating library. We include it because Cartfox uses Handlebars to render the cart but there are heaps of other uses for it in an online store.

#### [Lodash](https://lodash.com/)
As per the Lodash website: Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
Lodash’s modular methods are great for:

Iterating arrays, objects, & strings
Manipulating & testing values
Creating composite functions

We use Lodash in some of concrete functions (`concrete.Sections`, `concrete.Product`, `concrete.Variants`) because it makes things faster (in the browser), and easier to maintain.

#### [Focus](https://elkfox.github.io/Focus/)
Modals and popups are used so frequently on commerce websites that we developed our own flavour because we weren't that impressed with the alternatives. Focus lives in the vendor scripts because it is a dependency of the framework - although it doesn't need to be if you choose otherwise.

Learn about working with Focus in Concrete [here](#focus).

#### [Cartfox](https://github.com/Elkfox/Cartfox)
Cartfox is our very own ajax cart, lightweight and integrated to concrete but is easily adaptable to any theme.

There is some basic documentation [here](#cart).

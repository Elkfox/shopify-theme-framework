# Shopify Theme Framework

v4 is a complete rebuild of the Concrete Framework for Shopify theme development. The framework is currently dependant on Slate v1 \(beta\), though is being developed with a view to less reliance on the Shopify development team.

If you are looking for the Slate v0 version, please see [this](https://github.com/Elkfox/Concrete/tree/slate_0) branch.

## Framework or boilerplate

Components will be liberated from the main framework where possible to offer a quickstart out-of-the-box, while still allowing developers to use their preferred libraries and own code instead.

### Default libraries

The following libraries are included by default. They can easily be replaced with your own preferences. The framework and these libraries will be consistently updated with the intention of creating the most flexible and modular starting point possible.

#### [sass-library](https://docs.sasslibrary.com/)

This package facilitates rapid creation of responsive layouts and component styling.

#### [@Shopify/theme-scripts](https://github.com/Shopify/theme-scripts)

> Theme Scripts is a collection of utility libraries which help theme developers with problems unique to Shopify Themes.

#### [@elkfox/shopify-theme](https://www.npmjs.com/package/@elkfox/shopify-theme)

Additional tools to help theme developers with problems that are unique to Shopify Themes. Includes an **Ajax cart**, **cookie** tools, geolocation tools, quantity input tools, and more.

#### [Normalize.css](https://necolas.github.io/normalize.css/)

> Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.

## Slate, Starter Theme, & Concrete v4

There are some key differences to Starter Theme that should be noted:

* jQuery is out, but you can add it if you want it
* US English is currently the only language shipped, but others can be easily added
* The product page works out-of-the-box with a single variant product

And some more, coming soon:

* Optional sections library
* Support for upcoming [breaking Shopify theme changes](https://developers.shopify.com/changelog/the-new-online-store-design-experience-is-now-available-in-developer-preview-and-here-s-what-you-need-to-know)
* We will be adding more tools to [@elkfox/shopify-theme](https://www.npmjs.com/package/@elkfox/shopify-theme) to help make theme development as efficient as possible without encouraging over reliance

{% page-ref page="getting-started.md" %}

## Contributing

For help on setting up the repository locally, building, testing, and contributing please see [CONTRIBUTING.md](https://github.com/Elkfox/Concrete/blob/master/CONTRIBUTING.md).

## Code of Conduct

All developers who wish to contribute through code or issues, take a look at the [Code of Conduct](https://github.com/Elkfox/Concrete/blob/master/CODE_OF_CONDUCT.md).

## License

Copyright © 2019 Elkfox Co Pty Ltd. See [LICENSE](https://github.com/Elkfox/Concrete/blob/master/LICENSE) for further details.

Concrete v4 was built on Shopify's Starter Theme - Copyright © 2018 Shopify. See [LICENSE](https://github.com/Shopify/starter-theme/blob/master/LICENSE) for further details.

## [![](.gitbook/assets/elkfox_logotype-email_signature.png)](https://elkfox.com/)


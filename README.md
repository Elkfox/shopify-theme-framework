# Concrete v4

v4 is a complete rebuild of the Concrete Framework for Shopify theme development. The framework is currently dependant on Slate v1 \(beta\), though is being developed with a view to less reliance on the Shopify development team.

-----------

If you are looking for the Slate v0 version, please see [this](https://github.com/Elkfox/Concrete/tree/slate_0) branch.

-----------

Components will be liberated from the main framework where possible to allow for personal preferences while offering a solid starting point out-of-the-box.

There are some key differences to Starter Theme that should be noted:

* jQuery is out, but you can add it if you want it
* [@elkfox/shopify-theme](https://www.npmjs.com/package/@elkfox/shopify-theme) is used to add some important features
* We will be adding more tools to [@elkfox/shopify-theme](https://www.npmjs.com/package/@elkfox/shopify-theme) that you can use to extend your theme development, if you choose.
* Mixins and some other basic styles are pulled from [sass-library](https://www.npmjs.com/package/sass-library)
* US English is currently the only language shipped, but others can be easily added
* The product page works out-of-the-box with a single variant product
* The breakpoints set in the variables.scss work out-of-the-box

#### Coming soon:

* Optional sections library
* Support for upcoming [breaking Shopify theme changes](https://developers.shopify.com/changelog/the-new-online-store-design-experience-is-now-available-in-developer-preview-and-here-s-what-you-need-to-know)

### Getting started

Fork this branch to get started.

### System requirements

* **Node:** The current LTS \(long-term support\) release. We like to use a Node Version Manager like [NVM](https://github.com/creationix/nvm).
* **NPM 5+ or Yarn:** Both of these package managers have [ups and downs](https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/), choose whichever you prefer. Follow the installation instructions [for Yarn](https://yarnpkg.com/en/docs/install) or [NPM](https://www.npmjs.com/get-npm) to make sure you're using the latest version.

### Contributing

For help on setting up the repository locally, building, testing, and contributing please see [CONTRIBUTING.md](https://github.com/Elkfox/Concrete/blob/master/CONTRIBUTING.md).

### Code of Conduct

All developers who wish to contribute through code or issues, take a look at the [Code of Conduct](https://github.com/Elkfox/Concrete/blob/master/CODE_OF_CONDUCT.md).

### License

Copyright © 2019 Elkfox Co Pty Ltd. See [LICENSE](https://github.com/Elkfox/Concrete/blob/master/LICENSE) for further details.

Concrete v4 was built on Shopify's Starter Theme - Copyright © 2018 Shopify. See [LICENSE](https://github.com/Shopify/starter-theme/blob/master/LICENSE) for further details.

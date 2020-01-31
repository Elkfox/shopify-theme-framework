# Getting started

## System requirements

* **Node:** The current LTS \(long-term support\) release. We like to use a Node Version Manager like [NVM](https://github.com/creationix/nvm).
* **NPM 5+ or Yarn:** Both of these package managers have [ups and downs](https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/), choose whichever you prefer. Follow the installation instructions [for Yarn](https://yarnpkg.com/en/docs/install) or [NPM](https://www.npmjs.com/get-npm) to make sure you're using the latest version.

## Setup

Assuming you are using Yarn;

1. Fork the master branch
2. Install dependencies `$ yarn`
3. Create and configure your .env file
4. Run `$ yarn start`
5. Get coding!

### The .env file

A sample .env file is provided. Create new .env files as needed by adding a unique enxtension name.

For example; a production environment .env file may be named **`.env.production`**

{% code title=".env.production" %}
```text
SLATE_STORE=[YOUR_STORE].myshopify.com
SLATE_PASSWORD=[YOUR_API_PASSWORD]
SLATE_THEME_ID=[YOUR_THEME_ID]
SLATE_IGNORE_FILES=config/settings_data.json
```
{% endcode %}


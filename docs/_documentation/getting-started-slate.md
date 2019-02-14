---
title:  "Getting started with Shopify Slate"
handle: "getting-started-slate"
category: "getting started"
---
If you are using [Shopify Slate](https://shopify.github.io/slate/) and wish to work from the build files you can start by cloning this repository and installing the dependencies.

{% highlight bash %}
$ git clone https://github.com/Elkfox/Concrete.git
$ cd Concrete
$ npm install
{% endhighlight %}

Next create a config.yml in the root of your Concrete folder, edit the following api details to match your store.

{% highlight yaml %}
development:
  password: abcdefghijklmnop12345678
  theme_id: 12345679
  store: your-store.myshopify.com
  ignore_files:
    - settings_data.json # Uncomment this line to avoid resetting theme settings
{% endhighlight %}

Now run either

{% highlight bash %}

$ slate deploy
#to deploy just once
#or
$ slate watch
#for continual deployment
{% endhighlight %}

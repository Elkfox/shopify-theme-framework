---
title:  "Getting started with Shopify Theme Kit"
handle: "getting-started-theme-kit"
category: "getting started"
---
If you are using [Shopify Theme Kit](https://shopify.github.io/themekit/) you can get started from the terminal.

Assuming you are in the directory where you wish to install Concrete run the following command, replacing `api-password` and `your-store.myshopify.com` with the correct details. If you wish to rename the theme you can use `--name=your-name`.

{% highlight bash %}
$ theme bootstrap --password=api-password --store=your-store.myshopify.com --url=https://github.com/Elkfox/Concrete/archive/master.zip
{% endhighlight %}

Now Concrete will be installed on your Shopify store and the `config.yml` will have been created for you, but you will not have the theme files locally. To get the theme files locally, you can use:

{% highlight bash %}$ theme download{% endhighlight %}

Now if you open the directory in your text editor, you can get to work customising concrete.

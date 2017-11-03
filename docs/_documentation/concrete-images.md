---
title:  "Concrete Images"
handle: "concrete-images"
category: "javascript modules"
---

Helpers for working with images in javascript.

| Command | Usage |
| :------ | :---- |
| [preload](#preload) | `concrete.Images.preload(images, size)` |
| [imageLoad](#imageLoad) | `concrete.Images.imageLoad(src)` |
| [getImageUrl](#getImageUrl) | `concrete.Images.getImageUrl(src, size)` |
| [imageSize](#imageSize) | `concrete.Images.imageSize(src)` |
| [switchImage](#switchImage) | `concrete.Images.switchImage(image, element, callback)` |
| [removeProtocol](#removeprotocol) | `concrete.Images.removeProtocol(path)` |

##### preload

Preload a single image or an array of images at a given size. A common use for preloading is reducing the loading delay when enlarging a thumbnail.

| Parameters         | Type            | Description   |
| :----------------- | :-------------- | :------------ |
| `images`           | array or string | Single image URL or list of image URLs |
| `size`             | string          | Size of image to request |

{% highlight javascript %}
concrete.Image.preload(['image-url-1.jpg', 'image-url-2.jpg'], '1024x1024');
{% endhighlight %}

##### imageLoad

Loads and caches an image in the browser's cache.

| Parameters      | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `src`           | string          | Image URL     |

{% highlight javascript %}
concrete.Image.imageLoad('https://cdn.shopify.com/s/files/big-ol-image.jpeg');
{% endhighlight %}

##### getImageUrl

Creates a valid image URL with the protocol removed and a specified size.

| Parameters      | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `src`           | string          | Image URL     |
| `size`          | string          | Required image size     |

{% highlight javascript %}
concrete.Image.getImageUrl('https://cdn.shopify.com/s/files/big-ol-image.jpeg', '250x250');

// Returns string
'//cdn.shopify.com/s/files/big-ol-image_250x250.jpeg'
{% endhighlight %}

##### imageSize

Get the size of an image based on the URL.

| Parameters      | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `src`           | string          | Image URL     |

{% highlight javascript %}
concrete.Image.imageSize('https://cdn.shopify.com/s/files/big-ol-image_480x480.jpeg');

// Returns string
'480x480'
{% endhighlight %}

##### switchImage

Replaces one element for another, maintaining the correct size.

| Parameters      | Type            | Description           |
| :-------------- | :-------------- | :-------------------- |
| `imageOne`      | object          | Image element         |
| `imageTwo`      | object          | Image element         |
| `callback`      | function        | Callback function     |


##### removeProtocol

| Parameters      | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `path`          | string          | Image URL     |

{% highlight javascript %}
concrete.Image.removeProtocol('https://cdn.shopify.com/s/files/big-ol-image_480x480.jpeg')

// Returns string
'//cdn.shopify.com/s/files/big-ol-image_480x480.jpeg'
{% endhighlight %}

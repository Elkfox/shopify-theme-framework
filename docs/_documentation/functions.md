---
title:  "Functions"
handle: "functions"
category: "functions"
---

### `concrete.customer.shopKeeper()`
`shopKeeper` is the initalization function. It handles the other functions.

---

### `concrete.customer.localStorageSupport( callback, options )`
Will return true if localStorage is supported.

| Param | Type | Description |
| --- | --- | --- |
| callback | ``function`` | A call back function.  |
| options | ``any`` | Pass any data into the callback function  |

---

### `concrete.customer.sessionStorageSupport( callback, options )`
Will return true if sessionStorage is supported.

| Param | Type | Description |
| --- | --- | --- |
| callback | ``function`` | A call back function.  |
| options | ``any`` | Pass any data into the callback function  |

---

### `concrete.customer.update( data, callback, options )`
Use to update customer information.

| Param | Type | Description |
| --- | --- | --- |
| data | ``function`` | The data you wish to modify and what you wish to modify it with.  |
| callback | ``function`` | A call back function.  |
| options | ``any`` | Pass any data into the callback function  |

Pass it an object of updates to update the customer information
{% highlight javascript %}
  concrete.customer.update({
    firstName: 'George',
    acceptsMarketing: false
  })
{% endhighlight %}

---

### `concrete.customer.fetch( data, callback, options )`

| Param | Type | Description |
| --- | --- | --- |
| data | ``string`` | The data you wish to return, don't include a value to return all of the data. |
| callback | ``function`` | A callback function. |
| options | ``any`` | Pass any data into the callback function. |

Dont pass it a parameter to get all of the customer data
{% highlight javascript %}
  concrete.customer.fetch()
  // returns all of the customer data in JSON
{% endhighlight %}

Pass it a key to return the data associated
{% highlight javascript %}
  concrete.customer.fetch('firstName')
  // George
{% endhighlight %}

---

### `concrete.customer.create( data, callback, options )`
The `shopKeeper` passes it an object to create the storage and fill it with data for the first time.

| Param | Type | Description |
| --- | --- | --- |
| data | ``object`` | The data you wish to create in the customer object. |
| callback | ``function`` | A callback function. |
| options | ``any`` | Pass any data into the callback function. |

---

### `concrete.customer.destroy( callback, options )`
Removes all data stored for the customer including the default cookies.

| Param | Type | Description |
| --- | --- | --- |
| callback | ``function`` | A callback function. |
| options | ``any`` | Pass any data into the callback function. |

---

### `concrete.customer.customerLocator( method, callback, options )`
Tracks customer location.

| Param | Type | Description |
| --- | --- | --- |
| method | ``string`` |  Use ``freegeo``, ``geolocation``, ``both`` or ``none`` to chose how we obtain the customer location. freegeo will use the customers ip address to acquire their location, this is less accurate but less intrusive.  |
| callback | ``function`` | A callback function. |
| options | ``any`` | Pass any data into the callback function. |

Turn `concrete.customer.locator` to `freegeo`, `geolocation`, `both` or `none`. It's set to `both` by default alternatively pass the method as a parameter to use

---

### `concrete.customer.freeGeoIp( callback, options )`
Used by the `concrete.customer.customerLocator()` to get the customers location from their IP. If `concrete.customer.locator` is set to `both` or `freegeo` it sends an Ajax request to FreeGeoIP. Checkout
 [FreeGeoIP](http://freegeoip.net/) for more info.

| Param | Type | Description |
| --- | --- | --- |
| callback | ``function`` | A callback function. |
| options | ``any`` | Pass any data into the callback function. |

---

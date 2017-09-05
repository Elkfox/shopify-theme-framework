---
title:  "Default Data"
handle: "default-data"
category: "default data"
---
By default some data is created by the shopkeeper event to get you started.

### localStorage - Before registration
{% highlight json %}
{
  "browserLanguage": "en-GB",
  "browserTimezone": -600,
  "city": "Melbourne",
  "country_code": "AU",
  "country_name": "Australia",
  "firstWebsiteVisit": "2017-06-07T05:01:10.842Z",
  "ip": "203.173.41.57",
  "landingPage": "https://reinforced.myshopify.com/",
  "latitude": -37.8286,
  "longitude": 145.0077,
  "metro_code": 0,
  "positionLat": -37.813313199999996,
  "positionTimestamp": 1496811751815,
  "referrer": "direct",
  "region_code": "VIC",
  "region_name": "Victoria",
  "registered": false,
  "screenHeight": 1080,
  "screenWidth": 1920,
  "time_zone": "Australia/Melbourne",
  "zip_code": "3121",
}
{% endhighlight %}


### localStorage - After registration
Note that this information is accessible even after the customer has logged out.
In addition to what we already know:
{% highlight json %}
{
  "acceptsMarketing": false,
  "addresses": {
    "Address1": {
      "address1": "1 Mirka Lane",
      "address2": "St Kilda",
      "city": "Melbourne",
      "company": "Elkfox",
      "country": "Australia",
      "countryCode": "AU",
      "firstName": "George",
      "id": "5098769029",
      "lastName": "Butter",
      "phone": "",
      "province": "Victoria",
      "provinceCode": "VIC",
      "street": "1 Mirka Lane, St Kilda",
      "zip": ""
    }
  },
  "country_code": "AU",
  "country_name": "Australia",
  "email": "george@elkfox.com",
  "firstName": "George",
  "id": "4635493253",
  "lastName": "Butter",
  "registered": true,
  "total": "0",
}
{% endhighlight %}

### localStorage - After being set by customer
##### Set by clicking on a link with "data-country" attribute: `<a href="website.co.uk" data-country="uk">UK</a>`
{% highlight json %}
{
  "localizedCode": "uk",
  "localizedUrl": "website.co.uk"
}
{% endhighlight %}

---

### Cookies - After being set by customer
###### Set by clicking on a link with "data-country" attribute: `<a href="website.co.uk" data-country="uk">UK</a>`
{% highlight cookie %}
concrete_customer_country
localizedUrl
{% endhighlight %}

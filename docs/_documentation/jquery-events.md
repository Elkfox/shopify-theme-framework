---
title:  "jQuery Events"
handle: "jquery-events"
category: "jquery events"
---
Customer has a range of custom events that are triggered when events are completed.

| Event | Returns | Description |
| --- | --- | --- |
| customer:located | ``object`` | Fires at the end of the customer locator script. Returns the customers location. |
| customer:registered | ``object`` | Fires when customer believes the user has registered for the first time. Bare in mind that this will fire if the customer deletes there locl storage also. Returns the customer data. |
| customer:created | ``object`` | Fires whenever new customer data is created. Returns the customer data. |
| customer:registered_but_not_logged_in | ``object`` | Fires on every page load that the user is registered and logged in. Returns the customer. |
| customer:not_registered | ``object`` | Fires on every page load that the customer is not registered. Returns the customer. |
| customer:updated | ``object``, ``object`` | Fires when the users data has been updated. Returns the customer data and the updates that were applied. |

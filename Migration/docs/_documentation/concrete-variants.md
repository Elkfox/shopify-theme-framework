---
title:  "Concrete Variants"
handle: "concrete-variants"
category: "javascript modules"
---

concrete.Variants handles the following
 - Sets up an event listener for each option selector.
 - `_getCurrentOptions` Maps each option selector into JSON whether they be a select dropdown or radio buttons.
 - `_getVariantFromOptions` Returns the variant from each of the currently selected options.
 - `_onSelectChange`: Triggers the jQuery `variantChange` event passing in the current variant as an event parameter. Fires the following passing in the current variant:
   - `_updateMasterSelect(variant)`
   - `_updateImages(variant)`
   - `_updatePrice(variant)`
   - `_updateSKU(variant)`
   - `_updateHistoryState(variant)`

###### `_updateMasterSelect(variant)`
The 'Master select' refers to a hidden element that holds all of the variants. This gets updated to the current variant when this function is fired.

###### `_updateImages(variant)`
Triggers the `variantImageChange` jQuery event if the current variant has a featured image that is different to the currently selected image. This event is passed the current variant as an event parameter.

###### `_updatePrice(variant)`
If the variant price or compare at price has changed the `variantPriceChange` jQuery event is triggered. This event is passed the current variant as an event parameter.

###### `_updateSKU(variant)`
If the SKU has changed, the `variantSKUChange` jQuery event is triggered. This event is passed the current variant as an event parameter.

###### `_updateHistoryState(variant)`
Updates the url with the direct url of the currently selected variant and pushes it to the history.

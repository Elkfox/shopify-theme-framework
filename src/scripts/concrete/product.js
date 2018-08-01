concrete.Product = (function() {
  function Product(container) {
    var $container = this.$container = $(container);

    this.settings = {
      enableHistoryState: $container.data('enable-history-state') || false,
    };

    // Create our selectors
    this.selectors = {
      addToCart: '[data-add-to-cart]',
      addToCartText: '#AddToCartText',
      comparePrice: '#ComparePrice',
      originalPrice: '#ProductPrice',
      quantityDecrease: '[data-product-quantity-minus]',
      quantityIncrease: '[data-product-quantity-plus]',
      quantityAmount: '[data-product-quantity-amount]',
      onSale: '#OnSale',
      featuredImage: '#ProductPhotoImg',
      featuredImageContainer: '#ProductPhoto',
      originalSelectorId: '#ProductSelect',
      singleOptionSelector: '.single-option-selector',
      variantId: '[name=id]',
    };
    // Find the product json
    if (!$('#ProductJson').html()) {
      return;
    }
    this.productSingleObject = JSON.parse(document.getElementById('ProductJson').innerHTML);
    this._stringOverrides();
    this._initVariants();

    this.$container.on('click', this.selectors.quantityIncrease, function(event) {
      event.preventDefault();
      const max = Number($container.find(this.selectors.quantityAmount).attr('max')) || null;
      const quantity = Number($container.find(this.selectors.quantityAmount).val());
      const newQuantity = quantity + 1;

      if ((newQuantity <= max) || max == null) {
        $container.find(this.selectors.quantityAmount).val(newQuantity);
      }
    }.bind(this));
    this.$container.on('click', this.selectors.quantityDecrease, function(event) {
      event.preventDefault();
      const min = Number($container.find(this.selectors.quantityAmount).attr('min'));
      const quantity = Number($container.find(this.selectors.quantityAmount).val());
      const newQuantity = quantity - 1;

      if (newQuantity >= min) {
        $container.find(this.selectors.quantityAmount).val(newQuantity);
      }
    }.bind(this));
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    _stringOverrides: function() {
      concrete.productStrings = concrete.productStrings || {};
      _.extend(concrete.strings, concrete.productStrings);
    },

    _initVariants: function() {
      var options = {
        $container: this.$container,
        enableHistoryState: this.settings.enableHistoryState,
        singleOptionSelector: this.selectors.singleOptionSelector,
        product: this.productSingleObject,
      };

      this.variants = new concrete.Variants(options);
      this.$container.on('variantChange', this._updateAddToCart.bind(this));
      this.$container.on('variantChange', this._updateVariantId.bind(this));
      this.$container.on('variantChange', this._updatePrices.bind(this));
    },

    _updateAddToCart: function(evt) {
      var variant = evt.variant;
      $(this.selectors.productPrices).removeClass('hidden');

      if (variant) {
        if (variant.available) {
          $(this.selectors.addToCart).prop('disabled', false);
          $(this.selectors.addToCartText).text(concrete.strings.addToCart);
        } else {
          $(this.selectors.addToCart).prop('disabled', true);
          $(this.selectors.addToCartText).text(concrete.strings.soldOut);
        }
      } else {
        $(this.selectors.addToCart).prop('disabled', true);
        $(this.selectors.addToCartText).text(concrete.strings.unavailable);
        $(this.selectors.productPrices).addClass('hidden');
      }
    },

    _updatePrices: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(this.selectors.originalPrice).html(concrete.Currency.formatMoney(variant.price));
        if (variant.price < variant.compare_at_price) {
          $(this.selectors.onSale).removeClass('hidden')
          $(this.selectors.comparePrice).html(concrete.Currency.formatMoney(variant.compare_at_price, concrete.moneyFormat))
        } else {
          $(this.selectors.onSale).addClass('hidden');
        }
      } else {
        $(this.selectors.originalPrice).html('-');
        $(this.selectors.onSale).addClass('hidden');
      }
    },

    _updateVariantId: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(this.selectors.variantId).val(variant.id);
      }
    },

    onUnload: function() {
      this.$container.off();
    }
  });

  return Product;
  // intialize self
})();

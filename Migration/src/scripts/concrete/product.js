concrete.Product = (function() {

  function Product(container) {
    var $container = this.$container = $(container);
    //var sectionId = $container.attr('data-section-id');
    this.settings = {
      enableHistoryState: $container.data('enable-history-state') || false,
    };

    // Create our selectors
    this.selectors = {
      addToCart: '[data-add-to-cart]',
      addToCartText: '#AddToCartText',
      comparePrice: '#ComparePrice',
      originalPrice: '#ProductPrice',
      onSale: '#OnSale',
      featuredImage: '#ProductPhotoImg',
      featuredImageContainer: '#ProductPhoto',
      originalSelectorId: '#productSelect',
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
      $(this.selectors.originalPrice).html(concrete.Currency.formatMoney(variant.price));
      if (variant.price < variant.compare_at_price) {
        $(this.selectors.onSale).removeClass('hidden')
        $(this.selectors.comparePrice).html(concrete.Currency.formatMoney(variant.compare_at_price, concrete.moneyFormat))
      } else {
        $(this.selectors.onSale).addClass('hidden');
      }
    },

    _updateVariantId: function(evt) {
      var variant = evt.variant;
      if (variant)
        $(this.selectors.variantId).val(variant.id);
    },

    onUnload: function() {
      this.$container.off();
    }

  });

  return Product;
  // intialize self
})();

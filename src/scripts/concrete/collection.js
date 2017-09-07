concrete.Collection = (function() {

  function Collection(container) {
    var $container = this.$container = $(container);
    this.selectors = {
      sortBy: '#SortBy'
    }

    $container.on('change', this.selectors.sortBy, this._onSortByChange.bind(this));
  }

  Collection.prototype = _.assignIn({}, Collection.prototype, {

    _getSortBy: function() {
      return $(this.selectors.sortBy+' option:selected').val();
    },

    _onSortByChange: function() {

      var sortBy = this._getSortBy();
      this.$container.trigger({
        type: 'sortByChange',
        sortBy: sortBy
      });

      concrete.urlParams.sort_by = this.currentSortBy = sortBy;
      location.search = jQuery.param(concrete.urlParams);
    },

    onUnload: function() {
      this.$container.off();
    }

  });
  return Collection;
  // intialize self
})();

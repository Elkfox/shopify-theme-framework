// Javascript helpers for users with visual impairment

concrete.a11y = {

  // For use after scrolling using an anchor link, focus will change to the correct location so that hitting tab does not scroll the user back up.
  pageLinkFocus: function($element) {

    $element.first()
      .attr('tabIndex', '-1')
      .focus()
      .data('a11y-focus')
      .one('blur', callback);

    function callback() {
      $element.first()
        .removeData('a11y-focus')
        .removeAttr('tabindex');
    }
  },
  // Detect if the user has visited an anchored url if so update the focus to the correct location
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },
  // On click of an anchor link fire the page focus function
  bindInPageLinks: function() {
    $('a[href*=#]').on('click', function(evt) {
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },
  // Traps the focus within a specific container for example a popup that is open
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
        options.$container.focus();
      }
    });
  },

  // Stop trapping of focus
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }

}

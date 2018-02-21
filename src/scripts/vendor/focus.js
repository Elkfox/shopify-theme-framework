/*==============================================================================
 ___  _   _    _
/   || | | |  | |
\__  | | | |  | |  __
/    |/  |/_) |/  /  \_/\/
\___/|__/| \_/|__/\__/  /\_/
              |\
              |/
Focus v1.3
https://github.com/Elkfox/Focus
Copyright (c) 2017 Elkfox Co Pty Ltd
https://elkfox.com
Project lead: George Butter
MIT License
==============================================================================*/

var Focus = function(target, config) {
  this.target = target;
  this.element = jQuery(target);
  this.config = {
    'visibleClass': 'visible',
    'bodyClass': 'active-popup',
    'innerSelector': '.popup-inner',
    'popupContent': '.popup-content',
    'avoidSubpixels': false,
    'autoFocusSelector': '[data-auto-focus]'
  };
  // Merge configs
  if(config) {
    for (var key in config) {
      this.config[key] = config[key];
    }
  }
  this.visible = false;
  this.width = jQuery(this.config.popupContent).outerWidth();
  // Bind the functions
  this.show = this.show.bind(this);
  this.hide = this.hide.bind(this);
  this.toggle = this.toggle.bind(this);
  // Capture the variable so that we can fire it's proto methods by it's target.
  Focus.elements[target] = this;
}
Focus.elements = {};
Focus.getTarget = function(element, event) {
  if (jQuery(element).is('a')) {
    event.preventDefault();
  }
  const selector = this.getSelectorFromElement(element);
  target = selector ? selector : null;
  return target;
}
Focus.getSelectorFromElement = function(element) {
  var selector = jQuery(element).data('target');
  if (!selector || selector === '#') {
    // href can be used as a fallback instead of data target attribute
    selector = jQuery(element).attr('href') || null;
  }
  return selector
}
Focus.eventHandler = function(target, method) {
  var element = Focus.elements[target];
  if(!element) {
    var element = new Focus(target);
  }
  method === 'hide' ? element.hide() : element.toggle();
}
Focus.prototype.verticalAlign = function() {
  var _this = this;
  if (_this.config.avoidSubpixels) {
    var popupHeight = Math.round(jQuery(this.target).find(_this.config.popupContent).outerHeight() / 2);
    var windowHeight = Math.round($(window).height() / 2);
    jQuery(this.target).find(_this.config.popupContent).css('top', windowHeight - popupHeight).css('transform', 'translateY(0)');
  }
}
Focus.prototype.show = function() {
  var _this = this;
  if (!this.visible || !this.element.hasClass(this.config.visibleClass)) {
    this.element.addClass(this.config.visibleClass);
    jQuery('body').addClass(this.config.bodyClass);
    this.visible = true;

    // Set our vertical height using JS to override subpixel placement
    _this.verticalAlign();

    // Focus on an input field
    if (jQuery(this.target + ' ' + this.config.autoFocusSelector).length) {
      setTimeout(function(){
        jQuery(_this.target + ' ' + _this.config.autoFocusSelector).focus();
      }, 300);
    }

    // When someone clicks the [data-close] button then we should close the modal
    this.element.on('click', '[data-close]', function (e) {
      e.preventDefault();
      _this.hide();
    });

    // When someone clicks on the inner class hide the popup
    this.element.on('click', this.config.innerSelector, function (e) {
      if (jQuery(e.target).is(_this.config.innerSelector) || jQuery(e.target).parents(_this.config.target).length === 0) {
        _this.hide();
      }
    });

    // When someone presses esc hide the popup and unbind the event listener
    jQuery(document).on('keyup', this.element,  function (e) {
      if (e.keyCode === 27) {
        jQuery(document).off('keyup', this.element);
        _this.hide();
      }
    });
    return jQuery(document).trigger('focus:open', [this.target]);
  }
  return jQuery(document).trigger('focus:error', { error: 'Popup already open' });
}
Focus.prototype.hide = function() {
  if (this.visible || this.element.hasClass(this.config.visibleClass)) {
    this.element.removeClass(this.config.visibleClass);
    jQuery('body').removeClass(this.config.bodyClass);

    // Remove any vertical height that overrides subpixel placement
    if (this.config.avoidSubpixels) {
      jQuery(this.target).find(this.config.popupContent).removeAttr('style');
    }
    // Unbind event listeners
    this.element.off('click', this.config.innerSelector);
    this.element.off('click', '[data-close]');

    this.visible = false;
    return jQuery(document).trigger('focus:close', [this.target]);
  }
  return jQuery(document).trigger('focus:error', { error: 'Focus element is already closed' });
}
Focus.prototype.toggle = function() {
  return this.visible ? this.hide() : this.show();
}
jQuery(document).ready(function() {
  jQuery('.popup:not(.sticky)').detach().appendTo('body');
  jQuery(document).on('click', '[data-trigger="popup"]', function(event) {
    var target = Focus.getTarget(jQuery(this), event);
    Focus.eventHandler(target, 'toggle');
  });
  jQuery(document).on('click', '[data-close]', function(event) {
    var target = Focus.getTarget(jQuery(this), event);
    if(target) Focus.eventHandler(target, 'hide');
  });
});
jQuery(window).resize(function() {
  for (var key in Focus.elements) {
    if (Focus.elements[key].visible) {
      Focus.elements[key].verticalAlign();
    }
  }
});

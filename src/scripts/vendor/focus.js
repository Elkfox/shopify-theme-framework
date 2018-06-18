/*==============================================================================
 ___  _   _    _
/   || | | |  | |
\__  | | | |  | |  __
/    |/  |/_) |/  /  \_/\/
\___/|__/| \_/|__/\__/  /\_/
              |\
              |/
Focus v1.5
https://github.com/Elkfox/Focus
Copyright (c) 2018 Elkfox Co Pty Ltd
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
    'targetClass': null,
    'sticky': null,
    'innerSelector': '.popup-inner',
    'autoFocusSelector': '[data-auto-focus]',
    'slide': null,
    'slideDuration': 'fast',
    'visible': false
  };
  // Merge configs
  if (config) {
    for (var key in config) {
      this.config[key] = config[key];
    }
  }

  // Update current popup config
  this.visible = this.config.visible;

  // Detach unless set to be sticky
  if (!this.config.sticky) {
    jQuery(document).ready(function() {
      jQuery(target).detach().appendTo('body');
    });
  };

  // Bind the functions
  this.show = this.show.bind(this);
  this.hide = this.hide.bind(this);
  this.toggle = this.toggle.bind(this);
  // Capture the variable so that we can fire it's proto methods by it's target
  Focus.elements[target] = this;
}
Focus.elements = {};
Focus.getTarget = function(element, event) {
  if (jQuery(element).is('a')) {
    event.preventDefault();
  }
  const selector = jQuery(element).data('target');
  target = selector ? selector : null;
  return target;
}
Focus.eventHandler = function(target, method) {
  var element = Focus.elements[target];
  if (!element) {
    var element = new Focus(target);
  }
  method === 'hide' ? element.hide() : element.toggle();
}
Focus.prototype.show = function() {
  var _this = this;
  if (!this.visible || !this.element.hasClass(this.config.visibleClass)) {
    if (this.config.targetClass) {
      jQuery('[data-target="'+this.target+'"]').addClass(this.config.targetClass);
    };
    if (this.config.slide) {
      this.element.slideDown(this.config.slideDuration);
    };
    this.element.addClass(this.config.visibleClass);
    jQuery('body').addClass(this.config.bodyClass);
    this.visible = true;

    // Focus on an input field
    if (jQuery(this.target + ' ' + this.config.autoFocusSelector).length) {
      setTimeout(function(){
        jQuery(_this.target + ' ' + _this.config.autoFocusSelector).focus();
      }, 300);
    }

    // When someone clicks the [data-close] button then we should close the modal
    this.element.on('click', '[data-close]', function (e) {
      var target = Focus.getTarget(jQuery(this), event);
      if (target) {
        Focus.eventHandler(target, 'hide');
      } else {
        _this.hide();
      }
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
    if (this.config.targetClass) {
      jQuery('[data-target="'+this.target+'"]').removeClass(this.config.targetClass);
    };
    if (this.config.slide) {
      this.element.slideUp(this.config.slideDuration);
    };
    jQuery('body').removeClass(this.config.bodyClass);

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
  jQuery(document).on('click', '[data-trigger]', function(event) {
    var trigger = $(this).data('trigger');
    var target = Focus.getTarget(jQuery(this), event);
    Focus.eventHandler(target, 'toggle');
  });
  jQuery(document).on('click', '[data-close]', function(event) {
    var target = Focus.getTarget(jQuery(this), event);
    if (target) Focus.eventHandler(target, 'hide');
  });
});

/*==============================================================================
 ___  _   _    _
/   || | | |  | |
\__  | | | |  | |  __
/    |/  |/_) |/  /  \_/\/
\___/|__/| \_/|__/\__/  /\_/
              |\
              |/
Focus v1.0
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
    'innerSelector': '.popup-inner'
  };
  // Merge configs
  if(config) {
    for (var key in config) {
      this.config[key] = config[key];
    }
  }
  this.visible = false;
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
  if (selector) {
    target = selector;
  }
  return target;
}
Focus.getSelectorFromElement = function(element) {
  var selector = jQuery(element).data('target');
  if (!selector || selector === '#') {
    // Href can be used instead of data target attribute
    selector = jQuery(element).attr('href') || '';
  }
  return selector
}
Focus.eventHandler = function(target, method) {
  var element = Focus.elements[target];
  method === 'hide' ? element.hide() : element.toggle();
}
Focus.prototype.show = function() {
  var _this = this;
  if (!this.visible || !this.element.hasClass(this.config.visibleClass)) {
    this.element.addClass(this.config.visibleClass);
    this.visible = true;

    // When someone clicks the [data-close] button then we should close the modal.
    this.element.one('click', '[data-close]', function (e) {
      e.preventDefault();
      _this.hide();
    });
    // When someone clicks on the inner class hide the popup
    this.element.one('click', this.config.innerSelector, function (e) {
      if (jQuery(e.target).is(_this.config.innerSelector) || jQuery(e.target).parents(_this.config.target).length === 0) {
        _this.hide();
        jQuery(_this.config.innerSelector).unbind('click');
      }
    });
    // When someone presses esc hide the popup

    this.element.on('keyup', function (e) {
      e.preventDefault();
      if (e.keyCode === 27) {
        this.element.off('keyup');
        _this.hide();
      }
    });
    return jQuery(document).trigger('concrete:popup:open', [this.target]);
  }
  return jQuery(document).trigger('concrete:popup:error', { error: 'Popup already open' });
}
Focus.prototype.hide = function() {
  if (this.visible || this.element.hasClass(this.config.visibleClass)) {
    this.element.removeClass(this.config.visibleClass);
    this.visible = false;
    return jQuery(document).trigger('focus:close', [this.target]);
  }
  return jQuery(document).trigger('focus:error', { error: 'Focus element is already closed' });
}
Focus.prototype.toggle = function() {
  return this.visible ? this.close() : this.show();
}
jQuery(document).on('ready', function() {
  jQuery(document).on('click', '[data-trigger]', function(event) {
    var target = Focus.getTarget(jQuery(this), event);
    Focus.eventHandler(target, 'toggle');
  });
  jQuery(document).on('click', '[data-close]', function(event) {
    var target = Focus.getTarget(jQuery(this), event);
    Focus.eventHandler(target, 'hide');
  });
});

/**
 *
 * From Shopifys "Slate" theme.
 * With a few modifications here and there.
 *
 */
concrete.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
  .on('shopify:section:load', this._onSectionLoad.bind(this))
  .on('shopify:section:unload', this._onSectionUnload.bind(this))
  .on('shopify:section:select', this._onSelect.bind(this))
  .on('shopify:section:deselect', this._onDeselect.bind(this))
  .on('shopify:section:reorder', this._onSectionReorder.bind(this))
  .on('shopify:block:select', this._onBlockSelect.bind(this))
  .on('shopify:block:deslect', this._onBlockDeselect.bind(this));
};

concrete.Sections.prototype = _.assign({}, concrete.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof(constructor) === 'undefined') {
      return;
    }

    var instance = _.assign(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-type]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = this.instances.filter( function(instance) {
      var isEventInstance = (instance.id === evt.detail.sectionId);
      if (isEventInstance) {
        if (typeof(instance.onUnload) === 'function') {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    var instance = this.instances.filter(function(instance) {
      return instance.id === evt.detail.sectionId;
    })[0];

    if (typeof(instance) !== 'undefined' && typeof(instance.onSelect) === 'function') {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    var instance = this.instances.filter(function(instance) {
      return instance.id === evt.detail.sectionId;
    })[0];

    if (typeof(instance) !== 'undefined' && typeof(instance.onDeselect) === 'function') {
      instance.onDeselect(evt);
    }
  },

_onSectionReorder: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onSectionReorder === 'function') {
      instance.onSectionReorder(evt);
    }
  },

  _onBlockSelect: function(evt) {
    var instance = this.instances.filter(function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (typeof(instance) !== 'undefined' && typeof(instance.onBlockSelect) === 'function') {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    var instance = this.instances.filter(function(instance) {
      return instance.id === evt.detail.sectionId;
    })[0];

    if (typeof(instance) !== 'undefined' && typeof(instance.onBlockDeselect) === 'function') {
      instance.onBlockDeselect(evt);
    }
  },
  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(idx, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

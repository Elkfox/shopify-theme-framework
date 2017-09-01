/**
 *  This is an example of a new sections javascript. When you call: sections.register('empty-section', EmptySection)
 * the function EmptySection() will fire with a container set to $('[data-section-type=empty-section]')
 * This is also fired when the shopify:section:onload event fires.
 * You can edit the individual events to modify what happens in the theme editor yourself; but be aware that EmptySection() is also fired on page load on the live site.
 * Any functions unique to your section should do inside the EmptySection.prototype object and the function name should be preceeded with an _.
 * Format: _myFunction: function(arguments) { //Function code }.
 * Settings can be passed to this.settings by adding data attributes to your sections parent div and selecting them inside this.settings.
 **/
concrete.EmptySection = (function() {
  function EmptySection(container) {
    var $container = $(container);
    var sectionId = $container.data('section-id');
    this.settings = {};
    this.selectors = {};
  }

  EmptySection.prototype = _.assignIn({}, EmptySection.prototype, {
    onSectionUnload: function(evt) { },
    onSectionSelect: function(evt) { },
    onSectionDeselect: function(evt) { },
    onBlockSelect: function(evt) { },
    onBlockDeselect: function(evt) { },
  });

  return EmptySection;
})();

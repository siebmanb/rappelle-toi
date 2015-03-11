// Defines the Timeline view behavior: showing and managing entries.
cordova.define('app.views.timeline', function (require, exports, module) {
  'use strict';

  // Import dependencies (Cordova modules).
  var app = require('app.data');
  var utils = require('app.utils');

  // Define private variables here since we won't show
  // more than one Timeline view in the entire app.
  var timelineElement;
  var menuElement;
  var toggleElement;

  function handleEmptyTimeline() {
    utils.classes(menuElement, 'add', 's-visible');
    utils.classes(toggleElement, 'add', 'fa-minus-circle');
    return utils.template(app.templates.help, {});
  }

  // Refreshes the timeline.
  function resetEntries() {
    var html = '';
    // Iterate on sorted stored entries if any.
    function descending(a, b) { return a.value.id > b.value.id ? -1 : 1; }
    utils.each(utils.store().sort(descending), function (entry) {
      // Exclude potentially non-related data.
      if (!entry.key.match(app.namespace)) { return; }
      // Append the entry's HTML content.
      var entryTemplate = app.templates[entry.value.type];
      entry.value.html = utils.template(entryTemplate, entry.value);
      entry.value.id = entry.key.split('.').pop();
      html += utils.template(app.templates.timeline, entry.value);
    });
    // Update the DOM with some new content.
    timelineElement.innerHTML = html || handleEmptyTimeline();
  }

  // An utility for displaying confirm windows.
  function showConfirm(text, confirm, cancel) {
    // Only two buttons here: ok or not. So execute `confirm` only if ok.
    utils.confirm(text, app.title, [app.cancel, app.ok], function (button) {
      if (button === 2) { confirm(); } else if (cancel) { cancel(); }
    });
  }

  // Handles showing or hiding action buttons.
  function onToggleClick() {
    utils.classes(menuElement, 'toggle', 's-visible');
    utils.classes(toggleElement, 'toggle', 'fa-minus-circle');
  }

  // Handles clearing up the whole timeline if not empty.
  function onClearClick() {
    if (!utils.store().length) { return; }
    // Ask the user if she really wants to continue.
    showConfirm(app.confirmAll, function () {
      location.hash = 'timeline';
      utils.store(null);
      resetEntries();
    });
  }

  // Handles deleting the selected entry.
  function onDeleteClick(event, deleteElement) {
    // Make sure the `onEntryClick` handler doesn't run.
    event.stopImmediatePropagation();
    // Ask the user if she really wants to continue.
    showConfirm(app.confirm, function () {
      location.hash = 'timeline';
      var entryId = deleteElement.getAttribute('data-entry-id');
      utils.store(app.namespace + '.' + entryId, null);
      resetEntries();
    // Blur the delete entry element to let CSS rules react accordingly.
    }, function () { deleteElement.blur(); });
  }

  // Makes sure the `onEntryClick` handler doesn't run.
  function onVideoClick(event) { event.stopImmediatePropagation(); }

  // Focuses the delete entry element to let CSS rules react accordingly.
  function onEntryClick(event, entryElement) {
    utils.element('.j-delete', entryElement).focus();
  }

  // Initializes the view binding listeners and managing stuff,
  // therefore should only be called once.
  function init(rootElement) {
    // Using `j-` prefixed classnames as a convention for naming JS hooks.
    timelineElement = utils.element('.j-timeline', rootElement);
    menuElement = utils.element('.j-menu', rootElement);
    toggleElement = utils.element('.j-toggle', rootElement);
    var clearElement = utils.element('.j-clear', rootElement);
    utils.on(toggleElement, 'click', onToggleClick);
    utils.on(clearElement, 'click', onClearClick);
    utils.on(timelineElement, 'click', '.j-delete', onDeleteClick);
    utils.on(timelineElement, 'click', '.j-video', onVideoClick);
    utils.on(timelineElement, 'click', '.j-entry', onEntryClick);
    resetEntries();
  }

  // Persists the entry content then refreshes and shows the timeline.
  function storeEntry(year, content) {
    content.id = parseInt(year + Date.now(), 10);
    content.year = parseInt(year, 10);
    // Use some king of unique key name.
    utils.store(app.namespace + '.' + content.id, content);
    resetEntries();
    // Change the hash part in the URL to trigger CSS-based routing
    // and scroll the timeline right to the freshly created entry
    // using the browser's built in anchor feature (elements ids).
    location.hash = content.id;
  }

  // Define the interface that will be accessible to other modules.
  module.exports = {
    init: init,
    storeEntry: storeEntry
  };
});

// Defines the Text modal view behavior: sharing some text content.
cordova.define('app.views.text', function (require, exports) {
  'use strict';

  // Import dependencies (Cordova modules).
  var app = require('app.data');
  var utils = require('app.utils');
  var modal = require('app.views.modal');

  // Define private variables here since we won't show
  // more than one Text modal view in the entire app.
  var textElement;

  // If no text has been written yet, show the appropriate error message.
  function validate() {
    return !utils.trim(textElement.value) && app.errors.text;
  }

  // Returns the JSON object to be persisted as the timeline entry.
  function format() {
    var content = utils.escapeHTML(textElement.value);
    return { type: 'text', content: content };
  }

  // Reverts the view back to its pristine/original state.
  function clean() { textElement.value = null; }

  // Initializes the view binding listeners and managing stuff,
  // therefore should only be called once.
  function init(rootElement) {
    // Using `j-` prefixed classnames as a convention for naming JS hooks.
    textElement = utils.element('.j-text', rootElement);
    modal.handleEntryPosting(rootElement, validate, format, clean);
  }

  // Define the interface that will be accessible to other modules.
  exports.init = init;
});

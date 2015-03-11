// The module defining a modal view common behavior which is timeline
// entries validation (showing errors if needed) and posting.
cordova.define('app.views.modal', function (require, exports, module) {
  'use strict';

  // Import dependencies (Cordova modules).
  var app = require('app.data');
  var utils = require('app.utils');
  var timelineView = require('app.views.timeline');

  // An utility for displaying error messages.
  function showError(message) {
    utils.alert(app.errors.prefix + message, app.title, app.ok);
  }

  // Returns `true` if the passed entry year and content both are valid.
  // Content validation goes through a custom per-view `validate` function
  // returning the error message to display if invalid or a falsy value.
  // If any of those values is invalid, the associated error message is shown.
  function validateEntry(year, validate) {
    var isValidYear = /^\d+$/.test(year);
    var error = isValidYear ? validate() : app.errors.year;
    return !error || showError(error);
  }

  // Adds entry posting common behavior to a given modal view,
  // therefore should only be called once per `rootElement`.
  function handleEntryPosting(rootElement, validate, format, clean) {
    // Using `j-` prefixed classnames as a convention for naming JS hooks.
    var formElement = utils.element('.j-form', rootElement);
    var yearElement = utils.element('.j-year', rootElement);
    utils.on(formElement, 'submit', function (event) {
      event.preventDefault();
      var year = utils.escapeHTML(yearElement.value);
      if (!validateEntry(year, validate)) { return; }
      // Persist the entry content, then revert the modal form to its
      // pristine/original state. Per-view `format` and `clean` functions
      // have to be passed in to allow for custom per-view behavior.
      timelineView.storeEntry(year, format());
      yearElement.value = null;
      clean();
    });
    utils.on(yearElement, 'focus', function () {
      // Add the current year in the date field if it doesn't
      // contain any value (blank characters excluded).
      if (utils.trim(yearElement.value)) { return; }
      yearElement.value = (new Date()).getFullYear();
    });
  }

  // Define the interface that will be accessible to other modules.
  module.exports = {
    handleEntryPosting: handleEntryPosting,
    showError: showError
  };
});

// Defines the Location modal view behavior: sharing a geolocation.
cordova.define('app.views.location', function (require, exports) {
  'use strict';

  // Import dependencies (Cordova modules).
  var app = require('app.data');
  var utils = require('app.utils');
  var modal = require('app.views.modal');

  // Define private variables here since we won't show
  // more than one Location modal view in the entire app.
  var previewElement;
  var locateElement;
  var location;

  // If no location has been found yet, show the appropriate error message.
  function validate() { return !location && app.errors.location; }

  // Returns the JSON object to be persisted as the timeline entry.
  function format() { return { type: 'location', content: location }; }

  // Reverts the view back to its pristine/original state.
  function clean() { previewElement.innerHTML = location = null; }

  function onLocationComplete() { locateElement.disabled = false; }

  function onLocationError(error) {
    modal.showError(app.errors.generic + error.message);
    onLocationComplete();
  }

  // A possible improvement here would be to save the Google image
  // file to the application storage directory and synchronize
  // its lifecycle with the one of its associated entry.
  function onLocationSuccess(position) {
    location = position.coords.latitude + ',' + position.coords.longitude;
    var html = utils.template(app.templates.location, format());
    // Show a preview in the dedicated DOM element.
    previewElement.innerHTML = html;
    var imageElement = utils.element('.j-map', previewElement);
    utils.on(imageElement, 'load', onLocationComplete);
    utils.on(imageElement, 'error', onLocationError);
  }

  function onLocateCLick() {
    // Temporarily disable the button to prevent spamming.
    locateElement.disabled = true;
    // Use the Cordova Geolocation plugin to get the user's geolocation.
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError,
      { enableHighAccuracy: true }
    );
  }

  // Initializes the view binding listeners and managing stuff,
  // therefore should only be called once per `rootElement`.
  function init(rootElement) {
    // Using `j-` prefixed classnames as a convention for naming JS hooks.
    previewElement = utils.element('.j-preview', rootElement);
    locateElement = utils.element('.j-locate', rootElement);
    modal.handleEntryPosting(rootElement, validate, format, clean);
    utils.on(locateElement, 'click', onLocateCLick);
  }

  // Define the interface that will be accessible to other modules.
  exports.init = init;
});

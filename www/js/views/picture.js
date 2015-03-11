// Defines the Picture modal view behavior: taking and sharing a picture.
cordova.define('app.views.picture', function (require, exports) {
  'use strict';

  // Import dependencies (Cordova modules).
  var app = require('app.data');
  var utils = require('app.utils');
  var modal = require('app.views.modal');

  // Define private variables here since we won't show
  // more than one Picture modal view in the entire app.
  var previewElement;
  var takePictureElement;
  var pictureURL;

  // If no picture has been taken yet, show the appropriate error message.
  function validate() { return !pictureURL && app.errors.picture; }

  // Returns the JSON object to be persisted as the timeline entry.
  function format() { return { type: 'image', content: pictureURL }; }

  // Reverts the view back to its pristine/original state.
  function clean() { previewElement.innerHTML = pictureURL = null; }

  function onTakeComplete() { takePictureElement.disabled = false; }

  function onTakeError(message) { // TODO: do nothing if user cancelled
    modal.showError(app.errors.generic + message);
    onTakeComplete();
  }

  // A possible improvement here would be to move the image
  // file to the application storage directory and synchronize
  // its lifecycle with the one of its associated entry.
  function onTakeSuccess(url) {
    pictureURL = url;
    var html = utils.template(app.templates.image, format());
    // Show a preview in the dedicated DOM element.
    previewElement.innerHTML = html;
    var imageElement = utils.element('.j-image', previewElement);
    utils.on(imageElement, 'load', onTakeComplete);
    utils.on(imageElement, 'error', onTakeError);
  }

  function onTakePictureClick() {
    clean();
    // Temporarily disable the button to prevent spamming.
    takePictureElement.disabled = true;
    // Use the Cordova Camera plugin to take a picture.
    navigator.camera.getPicture(onTakeSuccess, onTakeError, {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      quality: 50
    });
  }

  // Initializes the view binding listeners and managing stuff,
  // therefore should only be called once.
  function init(rootElement) {
    // Using `j-` prefixed classnames as a convention for naming JS hooks.
    previewElement = utils.element('.j-preview', rootElement);
    takePictureElement = utils.element('.j-takePicture', rootElement);
    modal.handleEntryPosting(rootElement, validate, format, clean);
    utils.on(takePictureElement, 'click', onTakePictureClick);
  }

  // Define the interface that will be accessible to other modules.
  exports.init = init;
});

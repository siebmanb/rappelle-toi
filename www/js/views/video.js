// Defines the Video modal view behavior: taking and sharing a video clip.
cordova.define('app.views.video', function (require, exports) {
  'use strict';

  // Import dependencies (Cordova modules).
  var app = require('app.data');
  var utils = require('app.utils');
  var modal = require('app.views.modal');

  // Define private variables here since we won't show
  // more than one Video modal view in the entire app.
  var previewElement;
  var takeVideoElement;
  var videoURL;

  // If no video has been recorded yet, show the appropriate error message.
  function validate() { return !videoURL && app.errors.video; }

  // Returns the JSON object to be persisted as the timeline entry.
  function format() { return { type: 'video', content: videoURL }; }

  // Reverts the view back to its pristine/original state.
  function clean() { previewElement.innerHTML = videoURL = null; }

  function onTakeComplete() { takeVideoElement.disabled = false; }

  function onTakeError(error) {
    // Do not show an error dialog box if the user cancelled the take.
    var notCancelled = error.code !== CaptureError.CAPTURE_NO_MEDIA_FILES;
    if (notCancelled) { modal.showError(app.errors.generic + error.message); }
    onTakeComplete();
  }

  // A possible improvement here would be to move the video
  // file to the application storage directory and synchronize
  // its lifecycle with the one of its associated entry.
  function onTakeSuccess(files) {
    // As playing local videos on Android is tricky, we need to
    // get the actual file entry URL on the device (using the
    // Cordova File plugin) to make it work as expected.
    resolveLocalFileSystemURL(files[0].fullPath, function (fileEntry) {
      videoURL = fileEntry.toURL();
      var html = utils.template(app.templates.video, format());
      // Show a preview in the dedicated DOM element.
      previewElement.innerHTML = html;
      onTakeComplete();
    }, onTakeError);
  }

  function onTakeVideoClick() {
    // Temporarily disable the button to prevent spamming.
    takeVideoElement.disabled = true;
    var options = { duration: 10 };
    // Use the Cordova Media Capture plugin to record a video clip.
    navigator.device.capture.captureVideo(onTakeSuccess, onTakeError, options);
  }

  // Initializes the view binding listeners and managing stuff,
  // therefore should only be called once.
  function init(rootElement) {
    // Using `j-` prefixed classnames as a convention for naming JS hooks.
    previewElement = utils.element('.j-preview', rootElement);
    takeVideoElement = utils.element('.j-takeVideo', rootElement);
    modal.handleEntryPosting(rootElement, validate, format, clean);
    utils.on(takeVideoElement, 'click', onTakeVideoClick);
  }

  // Define the interface that will be accessible to other modules.
  exports.init = init;
});

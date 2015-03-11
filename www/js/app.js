// The app main module, exports an `init` method to start the app.
// Cordova modules pretty much work like AMD modules (see RequireJS)
// thought without including any loading feature (scripts still need
// to explicitly be imported in `index.html` using a `script` tag).
// The main advantages of using those modules are easy namespacing
// and free closures preventing not needed global variables.
cordova.define('app', function (require, exports) {
  'use strict';

  // Import dependencies (Cordova modules).
  var utils = require('app.utils');
  var timelineView = require('app.views.timeline');
  var pictureView = require('app.views.picture');
  var videoView = require('app.views.video');
  var textView = require('app.views.text');
  var locationView = require('app.views.location');

  function onDeviceReady() { navigator.splashscreen.hide(); }

  // The app entry point. Of course we'll only call this function once.
  function init() {
    utils.on(document, 'deviceready', onDeviceReady);
    FastClick.attach(document.body);
    // Initialize views passing their associated root DOM element.
    // At this point, since scripts are inserted right before the
    // `body` closing tag, we can query previous DOM elements without
    // waiting for the DOM to be ready. On the contrary, we could just
    // have moved those lines inside the `onDeviceReady` callback.
    timelineView.init(utils.element('#timeline'));
    pictureView.init(utils.element('#picture'));
    videoView.init(utils.element('#video'));
    textView.init(utils.element('#text'));
    locationView.init(utils.element('#location'));
  }

  // Define the interface that will be accessible to other modules.
  exports.init = init;
});

// The app setup module, exports an object which holds templates, strings
// and other configuration values so that i18n may be easier when needed.
cordova.define('app.data', function (require, exports, module) {
  'use strict';

  var utils = require('app.utils');

  // A shortcut function to easily get a template from an element.
  function getTemplate(id) {
    return utils.element('#' + id + 'Template').textContent;
  }

  var data = {
    namespace: 'com.cordovabook.app',
    title: 'Le journal de l\'aventurier',
    confirmAll: 'Voulez-vous vraiment tout supprimer ?',
    confirm: 'Voulez-vous vraiment supprimer cette entrée ?',
    ok: 'Continuer',
    cancel: 'Annuler',
    location: 'Vous êtes ici !',
    errors: {
      prefix: 'Attention, ',
      generic: 'l\'erreur suivante est survenue : ',
      year: 'année non valide.',
      picture: 'veuillez prendre une photo.',
      video: 'veuillez prendre une vidéo.',
      text: 'veuillez écrire un texte.',
      location: 'veuillez vous localiser.'
    },
    templates: {
      help: getTemplate('help'),
      text: getTemplate('text'),
      image: getTemplate('image'),
      video: getTemplate('video'),
      location: getTemplate('location'),
      timeline: getTemplate('timeline')
    }
  };

  // Define the interface that will be accessible to other modules.
  module.exports = data;
});

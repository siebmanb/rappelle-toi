// A module exporting some jQuery/Underscore-like utilities.
cordova.define('app.utils', function (require, exports, module) {
  'use strict';

  function noop() {}

  // Uses the Cordova Dialogs plugin to show alert boxes.
  function alert(text, title, button, callback) {
    if (typeof callback !== 'function') { callback = noop; }
    navigator.notification.alert(text, callback, title, button);
  }

  // Uses the Cordova Dialogs plugin to show confirm boxes.
  function confirm(text, title, buttons, callback) {
    navigator.notification.confirm(text, callback, title, buttons);
  }

  // Converts array-like objects (like `arguments`) to real arrays.
  function array(arrayLike) { return Array.prototype.slice.call(arrayLike); }

  // Gets rid of strings surrounding unwanted spaces.
  function trim(string) { return string.replace(/^\s+|\s+$/g, ''); }

  // Allows getting or manipulating CSS classes of a given DOM element.
  // `action` matches the ClassList API method names, `names` must be
  // a string containing space-separated class names.
  function classes(element, action, names) {
    var list = element.classList;
    // If only `element` is passed, return an array of class names.
    if (arguments.length < 2) { return array(list); }
    names = trim(names).split(/\s+/);
    if (action === 'contains') { return names.every(list[action], list); }
    names.forEach(function (name) { list[action](name); });
    return element;
  }

  // Allows to easily iterate on arrays and objects.
  // Should not be used directly (see `each` and `map`).
  function iterate(object, iterator, options) {
    if (!options) { options = {}; }
    if (!options.method) { options.method = 'forEach'; }
    if (!options.proxy) { options.proxy = function (value) { return value; }; }
    return Object.keys(object)[options.method](function (key) {
      var value = iterator.call(options.context, object[key], key, object);
      return options.proxy(value, key, object);
    });
  }

  // Works pretty much like the Underscore.js `each` method.
  function each(object, iterator, context) {
    function proxy(value) { return value === false; }
    var options = { method: 'some', proxy: proxy, context: context };
    iterate(object, iterator, options);
    return object;
  }

  // Works pretty much like the Underscore `each` method.
  // Can also be called on objects with a slightly different result.
  function map(object, iterator, context) {
    var options = { method: 'map', context: context };
    function proxy(value, key) { return { key: key, value: value }; }
    if (!Array.isArray(object)) { options.proxy = proxy; }
    return iterate(object, iterator, options);
  }

  // Returns an array of DOM elements matching a CSS selector
  // starting from an optional root. The array may be empty.
  function elements(selector, root) {
    return array((root || document).querySelectorAll(selector));
  }

  // Returns the first DOM element matching a CSS selector,
  // starting from an optional root, if any.
  function element(selector, root) {
    return (root || document).querySelector(selector);
  }

  // A basic event delegation helper, should not be called directly.
  function delegate(root, selector, event, handler) {
    var node = event.target;
    while (node && node !== root) {
      if (!node.webkitMatchesSelector(selector)) { node = node.parentNode; }
      else { return handler.call(node, event, node); }
    }
  }

  // Light jQuery-like shortcut to bind an event listener on a
  // DOM element. Supports simple event delegation and returns
  // the handler so that it can easily be removed when needed.
  function on(element, eventName, selector, handler) {
    var callback = arguments.length < 4 ? selector : function (event) {
      return delegate(element, selector, event, handler);
    };
    element.addEventListener(eventName, callback, false);
    return callback;
  }

  // Light Mustache-like templating utility.
  function template(string, data) {
    function replace($0, $1) { return data[$1]; }
    return trim(string).replace(/{{(\w+)}}/g, replace);
  }

  // Because trying to parse an invalid value as JSON throws an error
  // we just sometimes don't want to be thrown.
  function parse(value) {
    try { return JSON.parse(value); }
    catch (error) { return value; }
  }

  // `parse` counterpart.
  function stringify(value) { return JSON.stringify(value); }

  // A persistent key/value jQuery-like (see `$.data`) data storage utility.
  function store(key, value) {
    // Get stored entries.
    if (!arguments.length) { return map(localStorage, parse); }
    // Store or remove an entry.
    if (arguments.length > 1) {
      if (value === null) { localStorage.removeItem(key); }
      else { localStorage.setItem(key, stringify(value)); }
    }
    // Get the stored entry at `key` if any.
    else if (key !== null) { return parse(localStorage.getItem(key)); }
    // Delete stored entries if `keys` is `null`.
    else { localStorage.clear(); }
  }

  // An attempt at preventing XSS exploits.
  function escapeHTML(string) {
    var div = document.createElement('div');
    div.textContent = string;
    return trim(div.innerHTML);
  }

  // Define the interface that will be accessible to other modules.
  module.exports = {
    noop: noop,
    alert: alert,
    confirm: confirm,
    array: array,
    classes: classes,
    iterate: iterate,
    each: each,
    map: map,
    elements: elements,
    element: element,
    on: on,
    template: template,
    parse: parse,
    stringify: stringify,
    store: store,
    trim: trim,
    escapeHTML: escapeHTML
  };
});

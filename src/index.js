/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";

if (
  typeof Promise === "undefined" ||
  typeof Promise.prototype.finally === "undefined"
) {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require("promise/lib/rejection-tracking").enable();
  require("promise/lib/finally.js");
  window.Promise = require("promise/lib/es6-extensions.js");
}

// Make sure we're in a Browser-like environment before importing polyfills
// This prevents `fetch()` from being imported in a Node test environment
if (typeof window !== "undefined") {
  // fetch() polyfill for making API calls.
  require("whatwg-fetch");
}

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require("object-assign");

// Support for...of (a commonly used syntax feature that requires Symbols)
require("core-js/es6/symbol");
// Support iterable spread (...Set, ...Map)
require("core-js/fn/array/from");

// React 16+ relies on Map, Set, and requestAnimationFrame
require("core-js/es6/map");
require("core-js/es6/set");
require("raf").polyfill(window);

// antd needs
if (!String.prototype.startsWith) {
  require("core-js/fn/string/starts-with");
}

if (!String.prototype.endsWith) {
  require("core-js/fn/string/ends-with");
}

// redux-actions needs
if (!String.prototype.includes) {
  require("core-js/fn/string/includes");
}

if (!Array.prototype.fill) {
  require("core-js/fn/array/fill");
}

if (!Array.prototype.from) {
  require("core-js/fn/array/from");
}

if (!Array.prototype.findIndex) {
  require("core-js/fn/array/find-index");
}

if (!Array.prototype.includes) {
  require("core-js/fn/array/includes");
}

if (!Array.prototype.find) {
  require("core-js/fn/array/find");
}

if (!String.prototype.includes) {
  require("core-js/fn/string/includes");
}

if (!Object.prototype.values) {
  require("core-js/fn/object/values");
}

if (!Number.isNaN) {
  require("core-js/fn/number/is-nan");
}

if (!Number.isInteger) {
  require("core-js/fn/number/is-integer");
}

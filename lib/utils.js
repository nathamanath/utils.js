"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dg = dg;
exports.$ = $;
exports.$$ = $$;
exports.throttle = throttle;
exports.merge = merge;
exports.curry = curry;
exports.scale = scale;
/**
 * Utils - General pourpose utility functions for frontend js projects
 *
 * @author NathanG
 * @license MIT
 * @module Utils
 */

/**
 * document.getElementById
 *
 * @param {String} id - dom node id
 * @returns {Object}
 */
function dg(id) {
  return document.getElementById(id);
}

/**
 * querySelector
 *
 * @param {String} selector - css selector
 * @param {Object} [scope=document] - context in which to select node from
 * @returns {Object}
 */
function $(selector) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return scope.querySelector(selector);
}

/**
 * querySelectorAll
 *
 * @param {String} selector - css selector string
 * @param {Object} [scope=document] - context in which to select nodes from
 * @returns {Array.<Object>} matching nodes
 */
function $$(selector) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return Array.prototype.slice.call(scope.querySelectorAll(selector));
}

/**
 * no operation
 */
var noop = exports.noop = function noop() {};

/**
 * throttle calls to a function
 *
 * @param {Function} callback - function to be throttled
 * @param {Number} [threshhold=300] - min time in ms between calls to fn
 * @param {Boolean} [trail=false] - fire callback at end of last timeout
 * @param {Object} [scope=this] - scope in which fn is executed
 * @returns {Function} throttled version of function
 */
function throttle(callback) {
  var threshhold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var trail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;


  var last = void 0;
  var deferTimer = void 0;
  var offset = trail === false ? 0 : threshhold;

  return function () {

    var now = new Date().getTime();
    var elapsed = now - last - offset;
    var args = arguments;

    var fn = function fn() {
      deferTimer = clearTimeout(deferTimer);
      last = now;

      callback.apply(scope, args);
    };

    // Allow first call immediately after throttling function.
    // All later calls will be >= `threshhold` ms appart
    if (!last || elapsed >= threshhold) {
      fn();
    } else if (!deferTimer && trail !== false) {
      deferTimer = setTimeout(fn, threshhold);
    }
  };
}

// TODO: deep merge

/**
 * (shallow) merge object a into object b
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {Object} - a merged into b
 */
function merge(a, b) {
  var out = {};
  var getKeys = Object.keys;

  getKeys(a).concat(getKeys(b)).forEach(function (key) {
    out[key] = a[key] || b[key];
  });

  return out;
}

// TODO: set context for curried function?

/**
 * Curry up a function
 *
 * @param {Function} fn - Function to be curried
 * @param {...*} arguments - remaining arguments are curried into `fn`
 * @returns {Function} fn curried with `arguments` 1+
 */
function curry(fn) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 1);

  return function () {
    return fn.apply(this, args.concat(slice.call(arguments, 0) // convert arguments into array
    ));
  };
}

/**
 * Scale a number from poition in origional range to position in another
 *
 * @param {Number} value - number to be scaled
 * @param {Number} srcMin - Min bound of input value
 * @param {Number} srcMin - Max bound of input value
 * @param {Number} destMin - Min bound of scaled value
 * @param {Number} destMax - Max bound of scaled value
 * @returns {Number} value scaled between `destMin` and `destMax`
 */
function scale(srcMin, srcMax, destMin, destMax, value) {
  var preMapped = (value - srcMin) / (srcMax - srcMin);
  return preMapped * (destMax - destMin) + destMin;
}
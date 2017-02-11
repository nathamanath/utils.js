/**
 * Utils - General pourpose utility functions for frontend js projects
 *
 * @author NathanG
 * @license MIT
 */

/**
 * document.getElementById
 *
 * @param {String} id - dom node id
 */
export const dg = (id) => {
  return document.getElementById(id)
}

/**
 * querySelector
 *
 * @param {String} selector - css selector
 * @param {Object} [scope=document] - context in which to select node from
 */
 export const $ = (selector, scope=document) => {
   return scope.querySelector(selector)
 }

/**
 * querySelectorAll
 *
 * @param {String} selector - css selector string
 * @param {Object} [scope=document] - context in which to select nodes from
 * @returns {Array.<Object>} matching nodes
 */
export const $$ = (selector, scope=document) => {
  return Array.prototype.slice.call(scope.querySelectorAll(selector));
}

/**
 * no operation
 */
export const noop = function() {}

/**
 * throttle calls to a function
 *
 * @param {Function} callback - function to be throttled
 * @param {Number} [threshhold=300] - min time in ms between calls to fn
 * @param {Boolean} [trail=false] - fire callback at end of last timeout
 * @param {Object} [scope=this] - scope in which fn is executed
 *
 * @returns {Function} throttled version of function
 */
export const throttle = function(callback, threshhold=300, trail=false, scope=this) {

  let last
  let deferTimer
  let offset = (trail === false) ? 0 : threshhold

  return function() {

    let now = (new Date()).getTime()
    let elapsed = (now - last - offset)
    let args = arguments

    let fn = function() {
      deferTimer = clearTimeout(deferTimer)
      last = now

      callback.apply(scope, args)
    }

    // Allow first call immediately after throttling function.
    // All later calls will be >= `threshhold` ms appart
    if(!last || elapsed >= threshhold) {
      fn()
    } else if(!deferTimer && trail !== false) {
      deferTimer = setTimeout(fn, threshhold)
    }

  }
}

// TODO: deep merge

/**
 * (shallow) merge object a into object b
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {Object} - a merged into b
 */
export const merge = function(a, b) {
  let out = {}
  let getKeys = Object.keys

  getKeys(a).concat(getKeys(b)).forEach(function(key) {
    out[key] = a[key] || b[key]
  })

  return out
}

// TODO: set context for curried function?

/**
 * Curry up a function
 *
 * @param {Function} fn - Function to be curried
 */
export const curry = function(fn) {
  let slice = Array.prototype.slice
  let args = slice.call(arguments, 1)

  return function() {
    return fn.apply(this, args.concat(
      slice.call(arguments, 0) // convert arguments into array
    ))
  }
}

/**
 * Scale a number from poition in origional range to position in another
 *
 * @param {Number} value - number to be scaled
 * @param {Number} srcMin - Min bound of input value
 * @param {Number} srcMin - Max bound of input value
 * @param {Number} destMin - Min bound of scaled value
 * @param {Number} destMax - Max bound of scaled value
 *
 * @returns {Number} value scaled into rangeTo
 */
export const scale = function(srcMin, srcMax, destMin, destMax, value) {
  let preMapped = (value - srcMin) / (srcMax - srcMin)
  return preMapped * (destMax - destMin) + destMin
}

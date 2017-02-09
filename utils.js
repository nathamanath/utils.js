/**
 * General pourpose utility functions
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

    let exec = function() {
      deferTimer = clearTimeout(deferTimer)
      last = now

      callback.apply(scope, args)
    }

    if(!last || elapsed >= threshhold) {
      exec()
    } else if(!deferTimer && trail !== false) {
      deferTimer = setTimeout(exec, threshhold)
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

/**
 * Curry up a function
 *
 * @param {Function} fn - Function to be curried
 * @example `curry.apply(global, [tester, 11])`
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

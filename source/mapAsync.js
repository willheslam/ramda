import _curry2 from './internal/_curry2';
import curryN from './curryN';

/**
 * Takes a function and
 * an async function [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to the Promise's resolved values, and returns
 * a function of the same arity as the async function.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called with the contents of the Promise of the input `asyncFunction`.
 * @param {AsyncFunction} asyncFunction The async function that returns the Promise to be mapped over.
 * @return {Function} The new function.
 * @see R.map
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, async () => 4); //=> () => (async () => 8)()
 */
var mapAsync = _curry2(function mapAsync(fn, asyncFunction) {
  return curryN(asyncFunction.length, async function() {
    return fn.call(this, await asyncFunction.apply(this, arguments));
  });
});
export default mapAsync;

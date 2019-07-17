import _curry2 from './internal/_curry2';
import curryN from './curryN';

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the Generator of the input `generatorFunction`.
 * @param {GeneratorFunction} generatorFunction The generator function that returns the Generator to be mapped over.
 * @return {Function} The new function.
 * @see R.map
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, function*(){ yield 4 }); //=> () => (function*(){ yield 8 })()
 */
var mapGenerator = _curry2(function mapGenerator(fn, generatorFunction) {
  return curryN(generatorFunction.length, function*() {
    for (let val of generatorFunction.apply(this, arguments)) {
      yield fn.call(this, val);
    }
  });
});
export default mapGenerator;

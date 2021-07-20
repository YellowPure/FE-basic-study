var _ = require('ramda');
const { iif } = require('rxjs');

function add(a, b) {
  return a + b;
}

function addCurring(a) {
  return function (b) {
    return a + b;
  };
}
const mm = curry(m);
console.log(mm(6)(7)(8));
// const match = curry((what, str) => {
//     return str.match(what);
// });

// 练习 1
//==============
// 通过局部调用（partial apply）移除所有参数

// split = _.map(function() {

// });

var words = _.split(' ');

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = _.map(words);
// console.log(sentences('sss bbb'));

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions

var filterQs = _.filter(_.match(/q/i));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any arguments

// LEAVE BE:
var _keepHighest = function (x, y) {
  return x >= y ? x : y;
};

// REFACTOR THIS ONE:
var max = function (xs) {
  return reduce(
    function (acc, x) {
      return _keepHighest(acc, x);
    },
    -Infinity,
    xs
  );
};
var max = _.reduce(_keepHighest, -Infinity);

// Bonus 1:
// ============
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)
var slice = _.curry(function (start, end, xs) {
  return xs.slice(start, end);
});
// console.log([1,2,3].slice(0, 2));
console.log(slice(0)(2)([1, 2, 3]));

// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. Make it curried
var take = slice(0);
console.log(take(5)([1, 2, 3, 4, 5, 6, 7]));

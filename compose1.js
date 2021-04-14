const _ = require('lodash/fp');
var R = require('ramda')
// var compose = function (f, g) {
//   return function (x) {
//     return f(g(x));
//   };
// };

// var snakeCase = function (word) {
//   return word.toLowerCase().replace(/\s+/ig, '_');
// };
// snakeCase= R.compose(R.replace(/\s+/ig, '_'), R.toLowerCase);
// console.log('snakeCase',snakeCase('name'))

// var initials = function (name) {
//   return name.split(' ').map(compose(toUpperCase, head)).join('. ');
// };

var initials = _.compose(_.join('. ') ,_.map(_.compose(_.toUpperCase, _.head)), _.split(' '));
initials("hunter stockton thompson");

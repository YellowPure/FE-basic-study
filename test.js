var R = require('ramda');

var a = '  a  ';
a = R.replace(/\s/g, '', a);
console.log(a.length); 
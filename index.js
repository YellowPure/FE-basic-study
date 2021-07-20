// 截流
// 有时候我们希望函数在某些操作执行完成之后被触发。例如，实现搜索框的 Suggest 效果，如果数据是从服务器端读取的，为了限制从服务器读取数据的频率，我们可以等待用户输入结束 100ms 之后再触发 Suggest 查询：
const debounce = (fn, delay) => {
  let timer = null;
  return function (...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
};
debounce(() => {
  console.log('1');
}, 1000);
// 防止一个按钮短时间的的重复点击，防止 resize、scroll 和 mousemove 事件过于频繁地触发等。
const throttle = (fn, wait = 100) => {
  let timer = null;
  return function (...arg) {
    if (!timer) {
      setTimeout(() => (timer = null), wait);
      return fn.apply(this, arg);
    }
  };
};

// 2345678923456782345678345
const bigNumAdd = (a = 1, b = 2) => {
  const maxLen = Math.max(a.length, b.length);
  const astr = a.toString().padStart(maxLen, '0');
  const bstr = a.toString().padStart(maxLen, '0');

  let t = 0;
  let f = 0;
  let sum = '';
  for (let index = maxLen - 1; index >= 0; index--) {
    t = parseInt(astr[index]) + parseInt(bstr[index]) + f;
    f = Math.floor(t / 10);

    sum = (t % 10) + sum;
  }
  if (f === '1') {
    sum = '1' + sum;
  }
  return sum;
};
// console.log(
//   bigNumAdd('2345678923456782345678345', '2345678923456782345678345')
// );

const compose = (...fns) => {
  return function (...result) {
    return fns.reduceRight((acc, fn) => fn(acc), ...result);
  };
};

const curry = (fn) => {
  const len = fn.length;
  return function f1(...arg1) {
    if (arg1.length >= len) {
      return fn.apply(null, arg1);
    } else {
      return function f2(...arg2) {
        return f1.apply(null, arg1.concat(arg2));
      };
    }
  };
};

const sum = curry((a, b, c) => a + b + c);
const multi = (a) => {
  console.log(typeof a);
  return a * 2;
};
const test = compose(multi, sum(2)(3));
console.log(test(4));

// 实现promise
// extends

function Animal() {}
Animal.prototype.setAge = function (age) {
  this.age = age;
};

function Cat() {}
Cat.prototype = Object.create(Animal.prototype, {});
const c = new Cat();
c.setAge(5);
console.log(c.age);
// 实现call
Function.prototype.myCall = function (context) {
  var context = context || window;
  const args = [...arguments].slice(1);
  context.fn = this;
  var result = context.fn(...args);
  delete context.fn;
  return result;
};

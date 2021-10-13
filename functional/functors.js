var _ = require('ramda');
var Task = require('data.task');

const Container = function (value) {
  this.__value = value;
};

Container.of = (x) => new Container(x);

// console.log(Container.of(Container.of({name: 'yoda'})));

// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
  return Container.of(f(this.__value));
};

// console.log(Container.of(2).map(two => two + 2));

// console.log(Container(4));

var Maybe = function (x) {
  this.__value = x;
};

Maybe.of = function (x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function () {
  return this.__value === null || this.__value === undefined;
};

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe(null) : Maybe.of(f(this.__value));
};

// console.log(Maybe.of("Malkovich Malkovich").map(_.match(/a/ig)));

// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数
var ex1 = _.map(_.add(1));

// console.log('ex1', ex1([1,2,3]))
//练习 2
// ==========
// 使用 _.head 获取列表的第一个元素
var xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

var ex2 = _.map(_.head);

// initial :: User -> Maybe String
var ex2 = _.map(_.head);

console.log(ex2(xs));

// 练习 3
// ==========
// 使用 safeProp 和 _.head 找到 user 的名字的首字母
var safeProp = _.curry(function (x, o) {
  return Maybe.of(o[x]);
});

var user = {
  id: 2,
  name: 'Albert',
};

var ex3 = _.compose(_.map(_.head), safeProp('name'));

var trace = _.curry(function (tag, x) {
  // console.log(tag, x);
  return x;
});

var ex3 = _.compose(_.map(_.head), safeProp('name'));

console.log(ex3(user));

// 练习 4
// ==========
// 使用 Maybe 重写 ex4，不要有 if 语句

// var ex4 = function (n) {
//     if (n) { return parseInt(n); }
// };

var ex4 = _.compose(_.map(parseInt), Maybe.of);
console.log('ex4', ex4(null));

// 练习 5
// ==========
// 写一个函数，先 getPost 获取一篇文章，然后 toUpperCase 让这片文章标题变为大写

// getPost :: Int -> Future({id: Int, title: String})
var getPost = function (i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res({
        id: i,
        title: 'Love them futures',
      });
    }, 300);
  });
};

var upperTitle = _.compose(_.toUpper, _.prop('title'));
var ex5 = _.compose(_.map(upperTitle), getPost);

// console.log('ex5', ex5(1).)

ex5(1).fork(
  function () {
    console.log('rej');
  },
  function (result) {
    console.log('1', result);
  }
);

var Left = function (x) {
  this.__value = x;
};

Left.of = function (x) {
  return new Left(x);
};

Left.prototype.map = function (f) {
  return this;
};

var Right = function (x) {
  this.__value = x;
};

Right.of = function (x) {
  return new Right(x);
};

Right.prototype.map = function (f) {
  return Right.of(f(this.__value));
};

// 练习 6
// ==========
// 写一个函数，使用 checkActive() 和 showWelcome() 分别允许访问或返回错误
var add = _.curry((a, b) => {
  return a + b;
});
var showWelcome = _.compose(add('Welcome '), _.prop('name'));

var checkActive = function (user) {
  return user.active ? Right.of(user) : Left.of('Your account is not active');
};

var ex6 = _.compose(_.map(showWelcome), checkActive);
console.log('ex6', ex6({ active: true, name: 'yellow' }));

var ex6 = _.compose(_.map(showWelcome), checkActive);
console.log(
  'ex6',
  ex6({
    name: 'hl',
    active: true,
  })
);

// 练习 7
// ==========
// 写一个验证函数，检查参数是否 length > 3。如果是就返回 Right(x)，否则就返回
// Left("You need > 3")

var ex7 = function (x) {
  return x.length > 3 ? Right(x) : Left('you need > 3');
};

// 练习 8
// ==========
// 使用练习 7 的 ex7 和 Either 构造一个 functor，如果一个 user 合法就保存它，否则
// 返回错误消息。别忘了 either 的两个参数必须返回同一类型的数据。

var IO = function (f) {
  this.__value = f;
};

IO.of = function (x) {
  return new IO(function () {
    return x;
  });
};

IO.prototype.map = function (f) {
  return new IO(_.compose(f, this.__value));
};

// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map((_) => user));

// save :: User -> IO User
const save = (user) => new IO(() => ({ ...user, saved: true }));

// validateName :: User -> Either String ()
const validateName = function ({ name }) {
  return name.length > 3 ? Either() : Left('you need > 3');
};

// register :: User -> IO String
const register = compose(undefined, validateUser(validateName));
//  either :: (a -> c) -> (b -> c) -> Either a b -> c
// var either = _.curry(function(f, g, e) {
//     switch(e.constructor) {
//       case Left: return f(e.__value);
//       case Right: return g(e.__value);
//     }
// });
var ex8 = _.compose(_.either(_.identity, save), ex7);

console.log(ex8('user'));

import _ from 'ramda';
import dayjs from 'dayjs';
import fs from 'fs';
import Task from 'data.task';
/**
 * Container是个只有一个属性的对象
 * 想象Container是个玻璃罐
 * @param {*} x
 */
const Container = function (x) {
  /**
   * value是任意类型
   */
  this.___value = x;
};

/**
 * 值放到容器中的一种方式
 * @param {*} x
 * @returns
 */
Container.of = function (x) {
  return new Container(x);
};

/**
 * 使用方式和Array.map 类似，区别在于此函数参数是Container a，数组为[a]
 * 为什么要使用这种方法？
 * 不离开Container情况下操作其中的值
 * 连续的调用map，运行任何我们想要的函数，可以改变值的类型
 * @param {*} f
 * @returns
 */
Container.prototype.map = function (f) {
  return Container.of(f(this.___value));
};
console.log(
  Container.of(2).map(function (two) {
    return two + 2;
  })
);

console.log(Container.of('bombs').map(_.concat(' away')).map(_.prop('length')));
/**
 * functor 是实现了 map 函数并遵守一些特定规则的容器类型。
 * 让容器自己去运用函数能给我们带来什么好处？
 * 抽象
 *
 */
function functor() {}

/**
 * 空值检查
 * 增加函数安全性
 * 把函数分为2种类型 非空和空
 * @param x
 */
const Maybe = function (x) {
  this.__value = x;
};

Maybe.of = function (x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function () {
  return this.__value === null || this.__value === undefined;
};

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

// console.log(Maybe.of('striang').map(_.match(/a/g)));

// console.log(
//   Maybe.of({ name: 'yellow' }).map(_.prop('age')).map(_.props('length'))
// );
// console.log(Maybe.of(null).map(_.match(/a/g)));

const map = _.curry(function (f, any_functor_at_all) {
  return any_functor_at_all.map(f);
});

/**
 * 空值检查
 * @param xs
 * @returns
 */
const safeHead = function (xs) {
  return Maybe.of(xs[0]);
};

const streetName = _.compose(
  map(_.prop('street')),
  safeHead,
  _.prop('addresses')
);

console.log(streetName({ addresses: [] }));

/**
 * maybe :: b -> (a -> b) -> Maybe a -> b
 * 避免if/else 命令式语句
 */
const maybe = _.curry(function (x, f, m) {
  return m.isNothing() ? x : f(m.___value);
});

/**
 * Left 和Right是Eight抽象的2个子类
 * Left 无视map函数调用 类似Container
 * @param x
 */
const Left = function (x) {
  this.___value = x;
};
Left.of = function (x) {
  return new Left(x);
};

Left.prototype.map = function (f) {
  return this;
};

const Right = function (x) {
  this.___value = x;
};

Right.of = function (x) {
  return new Right(x);
};

Right.prototype.map = function (f) {
  return Right.of(f(this.___value));
};

Right.of('rain').map((str) => 'b' + str);

Left.of('rain').map((str) => 'b' + str);

//  getAge :: Date -> User -> Either(String, Number)
const getAge = _.curry(function (now, user) {
  const birthdate = dayjs(user.birthdate, 'YYYY-MM-DD');
  if (!birthdate.isValid()) return Left.of('Birth date could not be parsed');
  return Right.of(now.diff(birthdate, 'years'));
});

console.log(getAge(dayjs(), { birthdate: 'bbb' }));

const fortune = _.compose(
  _.concat('if you survive, you will be '),
  _.toString,
  _.add(1)
);

/**
 * 一个函数在调用时，如果被map包裹了，它就会由非functor函数转换为一个functor函数，这个过程称为称为lifting
 * 函数最好使用普通数据类型而不是容器类型，根据需要将其提升到正确的容器中
 * 这样可以得到更简单，重用性更高的函数 能随需求变动 兼容任意functor
 */
const zoltar = _.compose(map(console.log), map(fortune), getAge(dayjs()));
console.log(zoltar({ birthdate: '2015-08-02' }));

const either = _.curry(function (f, g, e) {
  switch (e.constructor) {
    case Left:
      return f(e.___value);
    case Right:
      return g(e.___value);
  }
});
const zoltar1 = _.compose(
  console.log,
  either(_.identity, fortune),
  getAge(dayjs())
);

console.log(zoltar1({ birthdate: '2010-08-02' }));

const getFromStorage = (key) => () => localStorage[key];

/**
 * 把不纯的操作关到笼子中
 * 何时打开笼子开关？
 * 把责任推到调用者身上
 * $value不真正的包含值，也不是一个私有属性
 * 为了提醒我们这个函数输出的易变性，改为unsafePerformIO
 */
class IO {
  static of(x) {
    return new IO(() => x);
  }
  constructor(fn) {
    this.unsafePerformIO = fn;
  }
  map(fn) {
    return new IO(_.compose(fn, this.unsafePerformIO));
  }
  inspect() {
    return `IO(${inspect(this.unsafePerformIO)})`;
  }
}

const $ = (selector) => new IO(() => document.querySelectorAll(selector));
console.log(
  $('#myDiv')
    .map(_.head)
    .map((div) => div.innerHTML)
);

const url = new IO(() => window.location.href);

const toPairs = _.compose(map(_.split('=')), _.split('&'));

const params = _.compose(toPairs, _.last, _.split('?'));

const findParams = (key) =>
  map(
    _.compose(Maybe.of, _.find(_.compose(_.equals(key), _.head)), params),
    url
  );

// findParams('search').unsafePerformIO();

/**
 * Task包含了either
 * Promise包含了either 为了处理将来可能发生的错误
 * 普通的控制流在异步的世界中不适用
 * @param filename
 * @returns
 */
const readFile = (filename) =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      return err ? reject(err) : resolve(data);
    });
  });

console.log(
  readFile('functors.js').then(
    _.compose(console.log, _.head, _.split('\n')),
    console.error
  )
  // .then(_.head)
  // .then(console.log, console.error)
  // .fork(console.error, console.log)
);

// const pp = new Promise((resolve, reject) => {
//   const num = Math.random();
//   num > 0.5 ? resolve(1) : reject(2);
// });

// pp.then(console.log, console.error);

class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

const left = (a) => new Left(a);
const dbUrl = ({ uname, pass, host, db }) => {
  if (uname && pass && host && db) {
    return Either.of(`db:pg://${uname}:${pass}@${host}5432/${db}`);
  }
  return left(Error('Invalid config'));
};

// const connectDb = _.compose(map(Postgres));

const idLaw1 = map(_.identity);
const idLaw2 = _.identity;

console.log(idLaw1(Container.of(2)));

console.log(idLaw2(Container.of(2)));

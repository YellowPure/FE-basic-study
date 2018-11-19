var _ = require('ramda');
var accounting = require('accounting');

var compose = function (f, g) {
    return function (x) {
        return f(g(x));
    }
}

var toUpperCase = function(x) {
    return x.toUpperCase();
};
var  exclaim = function(x) {return x + '!'}
var shout = compose(toUpperCase, exclaim);
console.log(shout('Hello world'));
var reverse = _.reduce(function(acc, x){ return [x].concat(acc); }, []);
var head = function(x) {return x[0]};
// console.log(reverse(['jumpkick', 'roundhouse', 'uppercut']));

// 结合律（associativity）
// var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
// true

// 前面的例子中我们必须要写两个组合才行，但既然组合是符合结合律的，我们就可以只写一个，
// 而且想传给它多少个函数就传给它多少个，然后让它自己决定如何分组。
var lastUpper = compose(toUpperCase, reverse, head);
var loudLastUpper = _.compose(exclaim, toUpperCase, head, reverse)
var last = compose(head, reverse);
var angry = compose(exclaim, toUpperCase);
var lUpper = compose(toUpperCase, last);

// var loudLastUpper = compose()

var headUpper = compose(toUpperCase, head);
console.log(loudLastUpper(['jumpkick', 'roundhouse', 'uppercut']));

// 示例数据
var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

var trace = _.curry(function(tag, x){
    console.log(tag, x);
    return x;
});

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
var isLastInStock = function(cars) {
    var last_car = _.last(cars);
    return _.prop('in_stock', last_car);
};
var isLastInStock1 = _.compose(_.prop('in_stock'), _.last);
console.log(isLastInStock1(CARS));

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
var nameOfFirstCar = _.compose(_.prop('name'), _.head);
console.log(nameOfFirstCar(CARS));

// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
var _average = function(xs) { return _.reduce(_.add, 0, xs) / xs.length; }; // <- 无须改动

var averageDollarValue = function(cars) {
  var dollar_values = map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
};

var averageDollarValue1 = _.compose(_average, _.map(_.prop('dollar_value')));

console.log(averageDollarValue1(CARS));

// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

var _underscore = _.replace(/\W+/g, '_'); //<-- 无须改动，并在 sanitizeNames 中使用它

var sanitizeNames = _.map(_.compose(_.toLower, _underscore));
console.log(sanitizeNames(["Hello World"]));

// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices

var availablePrices = function(cars) {
    var available_cars = _.filter(_.prop('in_stock'), cars);
    return available_cars.map(function(x){
      return accounting.formatMoney(x.dollar_value);
    }).join(', ');
};
var formatPrice = _.compose(accounting.formatMoney, _.prop('dollar_value'));
var availablePrices1 = _.compose(_.join(', '), _.map(formatPrice), _.filter(_.prop('in_stock')));
console.log(availablePrices1(CARS));

// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()

var fastestCar = function(cars) {
    var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
    var fastest = _.last(sorted);
    return fastest.name + ' is the fastest';
};
// var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
var append = _.flip(_.concat);
var fastestCar1 = _.compose(append(' is the fastest'), _.prop('name'), _.last, _.sortBy(_.prop('horsepower')));
console.log(fastestCar1(CARS));

// // 是否ios 32位系统
// 是否ios 32位系统
function isIOS32(model) {
    const match = ['iphone3', 'iphone4', 'iphone5', 'ipad1', 'ipad2', 'ipad3'];
    return _.indexOf(_.toLower(model))(match) >= 0;

}
console.log(isIOS32('phone4'));
function getEnv(url) {
    if(url.indexOf('live') !== -1) {
        return 'live';
    } else if(url.indexOf('dz11') !== -1) {
        return 'trunk';
    }
    return 'production';
}

a = _.curry(function(obj, key ) {
    return obj[key];
});

function getADX(url) {
    // const env = this.getEnv(url);
    const goldenHosts = {
        live: 'https://adx-gateway-live.dz11.com',
        trunk: 'https://adx-gateway-pre.dz11.com',
        production: 'https://rtbapi.douyucdn.cn'
    };
    var temp = a(goldenHosts);

    return compose(temp, getEnv)(url);
    // compose(curry((env1, obj) => obj[env1]),this.getEnv);
    // return goldenHosts[this.getEnv(url)];
}
console.log(getADX('live'));
const goldenHosts = {
    live: 'https://adx-gateway-live.dz11.com',
    trunk: 'https://adx-gateway-pre.dz11.com',
    production: 'https://rtbapi.douyucdn.cn'
};
function getEnv(url) {
    const l = ['live', 'dz11'];
    const index = _.indexOf(url)(l);
    // console.log(url, index);
    return index != -1 ? l[index]: 'production';
}

const aa = _.flip(_.prop);

getUrlByEnv = compose(_.flip(_.prop)(goldenHosts), getEnv);
console.log(getUrlByEnv('live'));
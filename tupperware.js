var _ = require('ramda');

const Container = function(value) {
    this.__value = value;
}

Container.of = (x) => new Container(x);

// console.log(Container.of(Container.of({name: 'yoda'})));

// (a -> b) -> Container a -> Container b
Container.prototype.map = function(f) { 
    return Container.of(f(this.__value));
};

// console.log(Container.of(2).map(two => two + 2));

// console.log(Container(4));

var Maybe = function(x) {
    this.__value = x;
}

Maybe.of = function(x) {
    return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
    return this.isNothing() ? Maybe(null): Maybe.of(f(this.__value));
}

// console.log(Maybe.of("Malkovich Malkovich").map(_.match(/a/ig)));

// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数
var ex1 = _.map(_.add(1));

//练习 2
// ==========
// 使用 _.head 获取列表的第一个元素
var xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
// initial :: User -> Maybe String  
var ex2 = undefined

console.log(xs);
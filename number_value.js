console.log(Number(0b11110111));
let a = 1;
// 判断浮点数相等
function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

// console.log(withinErrorMargin(0.1 + 0.2, 0.3));
// 去除数的小数部分
console.log(Math.trunc(1.1));
// 判断一个数到底是正数、负数、还是零。
console.log(Math.sign('80'));
// 计算立方根
console.log(Math.cbrt(8));

console.log(Math.sin(.95));
console.log(typeof Object.assign(2));

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    //   Object.assign(this, {x, y});
    }
}
const p = new Point(10, 20);
console.log(p.x, p.y);

// 大招
var aa = {name: 'hl', age: { deep: 23}};

var b = JSON.parse(JSON.stringify(aa));

b.age.deep = 'bb';
console.log(aa, b);

const set = new Set([1,2,3,4,5,5]);
console.log([...set]);
// 去除数组的重复成员
const set = new Set([1,2,3,4,5,5,5,5]);
console.log(set);

const map = new Map();
const o = {name: 'lily'};
map.set(o, '25');
console.log(map.get(o));
console.log(map[Symbol.iterator]);

// console.log(Array.from(set));
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }

  dec() {
    let counter = _counter.get(this);
    if(counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if(counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));
c.dec();
c.dec();
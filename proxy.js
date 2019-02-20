// const dom = new Proxy({}, {
//     get(target, property) {
//       return function(attrs = {}, ...children) {
//         const el = document.createElement(property);
//         for (let prop of Object.keys(attrs)) {
//           el.setAttribute(prop, attrs[prop]);
//         }
//         for (let child of children) {
//           if (typeof child === 'string') {
//             child = document.createTextNode(child);
//           }
//           el.appendChild(child);
//         }
//         return el;
//       }
//     }
//   });
  
//   const el = dom.div({},
//     'Hello, my name is ',
//     dom.a({href: '//example.com'}, 'Mark'),
//     '. I like:',
//     dom.ul({},
//       dom.li({}, 'The web'),
//       dom.li({}, 'Food'),
//       dom.li({}, '…actually that\'s it')
//     )
//   );
  
//   document.body.appendChild(el);

var handler = {
    has (target, key) {
      if (key[0] === '_') {
        return false;
      }
      return key in target;
    }
  };
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log(Object.keys(proxy));

const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}

const person = observable({
    name: '张三',
    age: 20
});
function print() {
    console.log(`${person.name}，${person.age}` );
}
observe(print);

person.age = '历史';
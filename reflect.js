console.log(Function.prototype.apply.call(Math.round, undefined, [1.5]))

// console.log(Reflect.apply(Math.round, undefined, [1.5]))
const res = Reflect.apply(Math.round, undefined, [1.5])
Reflect.apply(console.log, undefined, [res])

class Person {
  constructor(name) {
    this.name = name
  }
}
const person = Reflect.construct(Person, ['yellow'])
console.log(person.name)

const obj = {name: undefined}

console.log(Reflect.has(obj, 'name'))
class MyClass {
    constructor() {

    }

    get prop() {
        return 'getter';
    }

    set prop(value) {
        console.log(`setter:${value}`);
    }
}
let inst = new MyClass();
inst.prop = 123;
console.log(inst.prop);

// 带版本功能数组
class VersionArray extends Array {
    constructor() {
        super();
        this.history = [[]];
    }
    commit() {
        this.history.push(this.slice());
    }
    revert() {
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
}

var x = new VersionArray();
x.push(1);
x.push(2);

console.log(x.history);

x.commit();
console.log(x.history);

x.push(3);
console.log(x);
x.revert();
console.log(x);

class ExtendableError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

class MyError extends ExtendableError{
    constructor(m) {
        super(m);
    }
}

var myerror = new MyError('11');
console.log(myerror.message);
console.log(myerror instanceof Error);
console.log(myerror.name);
console.log(myerror.stack);

function mix(...mixins) {
    class Mix{}

    for (const mixin of mixins) {
        copyProperties(Mix.prototype, mixin);
        copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin));
    }
    return Mix;
}

function copyProperties(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        if( key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

class DistrbutedEdit extends mix({name: 'lily'}, {age: 23}) {

}
var d = new DistrbutedEdit();

const Serializable = Sup => class extends Sup {
    constructor(...args) {
        super(...args);
        if(typeof this.constructor.stringify !== 'function') {
            throw new ReferenceError('Please define stringify method to the Class!');
        }
        if(typeof this.constructor.parse !== 'function') {
            throw new ReferenceError('Please define parse method to the Class!');
        }
    }
    toString() {
        return this.constructor.stringify(this);
    }
}

class Person {
    constructor(name, age, gender) {
        Object.assign(this, {name, age, gender});
    }
}

class Employee extends Serializable(Person) {
    constructor(name, age, gender, level, salary) {
        super(name, age, gender);
        this.level = level;
        this.salary = salary;
    }
    static stringify(employee) {
        let { name, age, gender, level, salary} = employee;
        return JSON.stringify({name, age, gender, level, salary});
    }
    static parse(str) {
        let { name, age, gender, level, salary} = JSON.parse(str);
        return new Employee(name, age, gender, level, salary);
    }
}

let employee = new Employee('jane', 25, 'f', 1, 1999);
let employee2 = Employee.parse(employee+'');

console.log(employee2, 
    employee2 instanceof Employee,  //true 
    employee2 instanceof Person,  //true
    employee == employee2);   //false


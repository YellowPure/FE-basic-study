/**
 * @module:  栈
 * @author Liang Huang 
 * @date 2020-08-25 19:07:28 
 */
class Stack {
  constructor() {
    this.items = []
  }

  pop() {
    return this.items.pop();
  }

  push(element) {
    this.items.push(element)
  }

  peek() {
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }
}

const stack = new Stack();
console.log(stack.isEmpty())
stack.push(5)
stack.push(8)

console.log(stack.peek())

// 十进制转化为二进制
function decimal2Binary(decNumber) {
  const stack = new Stack();
  let str = ''
  let rem;
  let number = decNumber
  while (number !== 0) {
    rem = Math.floor(number % 2);
    stack.push(rem);
    number = Math.floor(number / 2)
  }

  while (!stack.isEmpty()) {
    str += stack.pop().toString();
  }
  return str;
}


function baseConverter(decNumber, base) {
  const stack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (base <= 2 || base > 36) {
    return '';
  }
  let str = ''
  let rem;
  let number = decNumber
  while (number !== 0) {
    rem = Math.floor(number % base);
    stack.push(rem);
    number = Math.floor(number / base)
  }

  while (!stack.isEmpty()) {
    str += digits[stack.pop()].toString();
  }
  return str;
}

console.log(baseConverter(15, 16))

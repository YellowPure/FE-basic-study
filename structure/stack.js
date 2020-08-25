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
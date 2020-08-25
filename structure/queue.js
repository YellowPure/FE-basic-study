/**
 * @module:  队列
 * @author Liang Huang 
 * @date 2020-08-25 19:12:00 
 */
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift(); 
  }

  peek() {
    return this.items[0];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }
  toString() {
    return this.items;
  }
}
const queue = new Queue();
console.log(queue.isEmpty())
queue.enqueue('John')
queue.enqueue('Wick')
queue.enqueue('Camila')
queue.dequeue()
queue.dequeue()
console.log(queue.toString())

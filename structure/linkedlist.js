/**
 * @module:  链表
 * @author Liang Huang 
 * @date 2020-08-25 19:45:37 
 */
class Node {
  constructor(element) {
    this.next = null;
    this.element = element;
  }
}

class LinkedList {
  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (!this.head) {
      this.head = node
    } else {
      current = this.head;
      while (current.next !== null) {
        current = current.next
      }
      current.next = node;
    }
    this.length++;
  }
  insert(element, position) {

  }

  getElementAt(index) {

  }

  remove(element) {

  }

  indexOf(element) {

  }

  removeAt(position) {
    if (position >= 0 && position < this.length) {
      let current = this.head;

      if (position === 0) {
        this.head = current.next;
      } else {
        let previous;
        for (let i = 0; i < position; i++) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      this.length--;
      return current.element;
    }
    return null;
  }

  isEmpty() {

  }

  size() {

  }

  toString() {

  }
}

const list = new LinkedList();
list.push(15)
list.push(10)
list.push(20)
console.log(list.head.next)
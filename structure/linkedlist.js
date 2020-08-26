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
    if (position >= 0 && position < this.length) {
      const node = new Node(element);
      if (position === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        previous = this.getElementAt(position - 1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.length++;
      return true
    }
    return false
  }

  getElementAt(index) {
    if (index >= 0 && index < this.length) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node;
    }
    return undefined;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.length && current != null; i++) {
      if (this.equalsFn(current, element)) {
        return i
      }
      current = current.next;
    }
    return -1;
  }

  equalsFn(ele1, ele2) {
    return ele1 === ele2;
  }

  removeAt(position) {
    if (position >= 0 && position < this.length) {
      let current = this.head;

      if (position === 0) {
        this.head = current.next;
      } else {
        let previous = this.getElementAt(position - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.length--;
      return current.element;
    }
    return null;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  toString() {
    let objString = ``;
    let current = this.head;
    for (let i = 0; i < this.length && current != null; i++) {
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }

    return objString;
  }
}

const list = new LinkedList();
list.push(15)
list.push(10)
list.push(20)
console.log(list.toString())
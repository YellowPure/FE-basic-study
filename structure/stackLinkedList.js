/**
 * @module:  栈
 * @author Liang Huang 
 * @date 2020-09-01 14:21:02 
 */
import {
  DoublyLinkedList
} from './doublyLinkedList'
class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList()
  }
  push(element) {
    this.items.push(element)
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(this.size() - 1)
  }

  size() {
    return this.items.size();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.getElementAt(this.size() - 1);
  }
  toString() {
    return this.items.toString()
  }

  clear() {
    this.items.clear();
  }

  isEmpty() {
    return this.items.isEmpty();
  }
}
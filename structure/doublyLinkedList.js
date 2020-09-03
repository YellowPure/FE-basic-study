/**
 * @module:  双向链表
 * @author Liang Huang 
 * @date 2020-09-01 10:49:57 
 */
import {
  Node,
  LinkedList,
  defaultEquals
} from './linkedlist'
export class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

export class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.length) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head === null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
      } else if (index === this.length) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      this.length++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.length) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
        if (this.length === 1) {
          this.tail = undefined
        } else {
          this.head.prev = undefined;
        }
      } else if (index === this.length - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        previous.next = current.next;
        current.next.prev = previous;
      }
      this.length--;
      return current.element;
    }

    return undefined;
  }
}
/**
 * @module:  循环链表
 * @author Liang Huang 
 * @date 2020-09-01 11:18:29 
 */
import {
  LinkedList,
  Node,
  defaultEquals
} from './linkedlist'

class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  insert(element, index) {
    if (index >= 0 && index <= this.length) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head === null) {

          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.size())
          this.head = node;
          current.next = this.head;
        }
      } else {
        previous = this.getElementAt(index - 1);
        // const current = previous.next;
        node.next = previous.next;
        previous.next = node;
      }
      this.length++;
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.length) {
      let current = this.head;
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.length);
          this.head = removed.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        let previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.length--;
      return current.element;
    }
    return null;
  }
}
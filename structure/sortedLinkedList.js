/**
 * @module:  有序链表
 * @author Liang Huang 
 * @date 2020-09-01 11:48:56 
 */

const { LinkedList, defaultEquals } = require("./linkedlist");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

function defaulCompare(a, b) {
  if (a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaulCompare) {
    super(equalsFn)
    this.compareFn = compareFn;
  }

  insert(element, index = 0) {
    if(this.isEmpty()) {
      return super.insert(element, 0)
    }

    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }

  push(element) {
    if(this.isEmpty()) {
      return super.push(element)
    } else {
      const pos = this.getIndexNextSortedElement(element);
      super.insert(element, pos)
    }
  }
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for(; i< this.size()&& current;i++) {
      const comp = this.compareFn(element, current.element);
      if(comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}
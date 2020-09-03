/**
 * @module:  分离链接
 * @author Liang Huang 
 * @date 2020-09-03 11:21:13 
 */

import { defaultToString } from "./utils.js";
import { LinkedList } from  "./linkedlist.js";
import { ValuePair } from "./dictionary.js";
import { HashTable } from './hashTable'
class HashTableSeparateChainging extends HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {}
  }

  put(key, value) {
    if(key != null && value != null) {
      const position = this.hashCode(key);
      if(this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    const linkedlist = this.table[position];
    if(linkedlist !== null && !linkedlist.isEmpty()) {
      let current = linkedlist.getHead();
      while(current != null) {
        if(current.element.key === key) {
          return current.element.next;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    const linkedlist = this.table[position]
    if(linkedlist !== null && !linkedlist.isEmpty()) {
      let current = linkedlist.getHead();
      while(current != null) {
        if(current.element.key === key) {
          linkedlist.remove(current.element);
          if(linkedlist.isEmpty()) {
            delete this.table[position]
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
}
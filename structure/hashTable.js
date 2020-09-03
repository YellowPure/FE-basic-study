/**
 * @module:  散列表
 * @author Liang Huang 
 * @date 2020-09-01 16:14:15 
 */
import {
  defaultToString
} from './utils.js'
import { ValuePair } from './dictionary.js'

export class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    if(key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value)
    }
  }

  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if(valuePair != null) {
      delete this.table[hash]
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
}

// const hash = new HashTable(); hash.put('Ygritte', 'ygritte@email.com'); hash.put('Jonathan', 'jonathan@email.com'); hash.put('Jamie', 'jamie@email.com'); hash.put('Jack', 'jack@email.com'); hash.put('Jasmine', 'jasmine@email.com'); hash.put('Jake', 'jake@email.com'); hash.put('Nathan', 'nathan@email.com'); hash.put('Athelstan', 'athelstan@email.com'); hash.put('Sue', 'sue@email.com'); hash.put('Aethelwulf', 'aethelwulf@email.com'); hash.put('Sargeras', 'sargeras@email.com');
// // 散列值可能相同 导致覆盖
// console.log(hash.hashCode('Nathan'))  // 10
// console.log(hash.hashCode('Sargeras'))// 10

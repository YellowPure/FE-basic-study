/**
 * @module:  字典
 * @author Liang Huang 
 * @date 2020-09-01 15:46:51 
 */
import {
  defaultToString
} from './utils.js'
export class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

export class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true;
    }
    return false;
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  get(key) {
    if (this.hasKey(key)) {
      return this.table[this.toStrFn(key)].value
    }
    return null;
  }

  clear() {
    this.table = {}
  }
  size() {
    return Object.keys(this.table).length;
  }
  isEmpty() {
    return this.size() === 0;
  }

  keys() {
    return Object.keys(this.table)
  }
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  keyValues() {
    return Object.values(this.table)
    // return Object.entr
  }
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const ele = valuePairs[i]
      const result = callbackFn(ele.key, ele.value);
      if (result === false) {
        break;
      }
    }
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`
    }
    return objString;
  }
}



// const dictionary = new Dictionary();
// dictionary.set('Gandalf', 'gandalf@email.com');
// dictionary.set('John', 'johnsnow@email.com');
// dictionary.set('Tyrion', 'tyrion@email.com');

// console.log(dictionary.get('Tyrion'), dictionary.size(), dictionary.keys(), dictionary.values());

// dictionary.remove('John')
// console.log(dictionary.keys());
// console.log(dictionary.values());
// console.log(dictionary.keyValues());
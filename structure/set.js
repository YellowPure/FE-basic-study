/**
 * @module:  集合
 * @author Liang Huang 
 * @date 2020-09-01 14:25:20 
 */

class Sett {
  constructor() {
    this.items = {}
  }

  add(element) {
    if(!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false
  }

  delete(element) {
    if(this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  clear() {
    this.items = {}
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.values(this.items);
  }
  // 并集
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  intersection(otherSet) {
    const intersectionSet = new Set();
    // get shorter set length
    const values = this.values();
    const otherValues = otherSet.values();
    let shortSet = values;
    let longSet = otherValues;
    if(shortSet.length > longSet.length) {
      shortSet = otherSet;
      longSet = values;
    }
    shortSet.forEach((value) => {
      console.log('count')
      if(longSet.includes(value)) {
        intersectionSet.add(value)
      }
    })

    return intersectionSet;
  }

  difference(otherSet) {
    const differenceSet = new Set();

    otherSet.values().forEach(value => {
      if(!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })
    return differenceSet;
  }

  isSubsetOf(otherSet) {
    if(this.size() > otherSet.size()) {
      return false;
    }
    return this.values().every(value => {
      return otherSet.has(value);
    })
  }
}

const set = new Set();
set.add(1)
console.log(set.values())
console.log(set.has(1))
console.log(set.size)

// const setA = new Set(); setA.add(4); setA.add(2); setA.add(6);
// const setB = new Set(); setB.add(3); setB.add(4); setB.add(5); setB.add(6);setB.add(1)
// const unionAB = setA.intersection(setB);

// console.log(unionAB.values())

// const setA = new Set(); setA.add(1); setA.add(2);
// const setB = new Set(); setB.add(1); setB.add(2); setB.add(3);
// const setC = new Set(); setC.add(2); setC.add(3); setC.add(4);
// console.log(setA.isSubsetOf(setB)); console.log(setA.isSubsetOf(setC));
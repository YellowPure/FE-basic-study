class Deque {
  constructor() {
    // this.count = 0;
    // this.lowestCount = 0;
    this.items = []
  }

  addFront(element) {
    this.items.unshift(element)
  }

  addBack(...element) {
    this.items.push(...element)
  }

  removeFront() {
    return this.items.shift()
  }

  removeBack() {
    return this.items.pop()
  }
  peekFront() {
    return this.items[0]
  }
  peekBack() {
    return this.items[this.items.length - 1]
  }
  isEmpty() {
    return this.items.length === 0;
  }
  clear() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
  toString() {
    return this.items.toString();
  }
}

function palindromeChecker(aString) {
  if(typeof aString !== 'string' || (aString.length === 0 && aString !== null)) {
    return false;
  }
  let deque = new Deque();
  let lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let isEqual = true;
  let firstChar, lastChar;
  deque.addBack(...lowerString.split(''));
  while(deque.size() > 1) {
    // console.log('deque.toString',deque.size(), deque.toString())
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    // console.log(firstChar, lastChar, deque.toString())
    if(firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));

// const deque = new Deque();
// console.log(deque.isEmpty())
// deque.addBack('Jon')
// deque.addBack('Jack')
// console.log(deque.toString())
// deque.addBack('Camila')
// console.log(deque.toString(), deque.size(), deque.isEmpty());
// deque.removeFront()
// console.log(deque.toString())
// deque.removeBack()
// console.log(deque.toString())
// deque.addFront('John')
// console.log(deque.toString())
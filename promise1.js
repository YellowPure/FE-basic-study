try {
  module.exports = Promise;
} catch (error) {

}

function Promise(executor) {
  let self = this;
  self.status = 'pending';
  self.data = undefined;
  self.onResolved = [];
  self.onRejected = [];

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value;
        self.onResolved.forEach(fn => fn(value))
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {

      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason;
        self.onRejected.forEach(fn => fn(reason))
      }
    })

  }
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  let self = this;
  let promise2;
  // console.log('onFulfilled', onfulfilled)
  onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
  onrejected = typeof onrejected === 'function' ? onrejected : err => {
    throw err
  };

  if (self.status === 'resolved') {
    return promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {

          let x = onfulfilled(self.data)
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      })
    })

  }

  if (self.status === 'rejected') {
    return promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {

          let x = onrejected(self.data)
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      })
    })

  }

  if (self.status === 'pending') {
    return promise2 = new Promise((resolve, reject) => {

      self.onResolved.push(function (value) {
        try {

          let x = onfulfilled(value)
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      })
      self.onRejected.push(function (reason) {
        try {

          let x = onrejected(reason)
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      })
    });

  }

}

Promise.prototype.catch = function (onrejected) {
  return this.then(null, onrejected);
}

function resolvePromise(promise2, x, resolve, reject) {
  let called = false;
  let then;
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function (value) {
        return resolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject);
    }
  }
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          return resolvePromise(promise2, y, resolve, reject);
        }, (e) => {
          if (called) return;
          called = true;
          return reject(e);
        })
      } else {
        resolve(x);
      }

    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

Promise.deferred = Promise.defer = function () {
  let dfd = {};
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.export = Promise
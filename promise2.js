function Promise(executor) {
  let self = this;
  self.value = undefined;
  self.reason = undefined;
  self.status = 'pending';
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    setTimeout(() => {
      if (self.status === 'pending') {

        self.status = 'fulfilled';
        self.value = value;
        self.onResolvedCallback.forEach(fn => fn())
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === 'pending') {

        self.status = 'rejected';
        self.reason = reason;
        self.onResolvedCallback.forEach(fn => fn())
      }
    })
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  let promise2;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
  onRejected = typeof onRejected === 'function' ? onRejected : err => {
    throw err
  }
  let self = this;
  if (self.status === 'fulfilled') {
    onFulfilled(self.value);

  }
  if (self.status === 'rejected') {
    onRejected(self.reason)

  }
  if (self.status === 'pending') {
    self.onResolvedCallback.push(function () {
      onFulfilled(self.value)
    });
    self.onRejectedCallback.push(function () {
      onRejected(self.reason)
    });

  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw (new TypeError('循环调用'))
  }
  if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    let thenable = x.then;
    if (typeof thenable === 'function') {
      resolvePromise(promise2, x, resolve, reject)
    } else {
      resolve(promise2.value);
    }
  } else {
    resolve(x.value);
  }
}
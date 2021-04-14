// promise 解决了什么问题 回调地狱
// 业界实现
// 常用API then catch finally Promise.all
// 微任务
// 缺陷?

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('chaning circle error'))
  }
  let called;
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, rs => {
          if (called) return;
          called = true;
          resolvePromise(promise2, rs, resolve, reject)
        }, rj => {
          if (called) return;
          called = true
          reject(rj)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return;
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = 'pending'
    this.reason = ''
    this.value = ''
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value

        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason

        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    };

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {

          try {

            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            onRejected(error)
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
          // onRejected(this.value)
        });
      }
    })
    return promise2;
    //   if (this.status === 'fulfilled') {
    //     onFulfilled(this.value)
    //   } else if (this.status === 'rejected') {
    //     onRejected(this.reason)
    //   }

    //   if (this.status === 'pending') {
    //     this.onFulfilledCallbacks.push(() => {
    //       onFulfilled(this.value)
    //     })

    //     this.onRejectedCallbacks.push(() => {
    //       onRejected(this.value)
    //     })
    //   }
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise;
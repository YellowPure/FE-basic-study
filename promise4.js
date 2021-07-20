class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;

    this.status = 'pending';
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.resolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.rejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 如果缺省则默认 空function
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => err;

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === 'rejected') {
        setTimeout(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        }, 0);
      }

      if (this.status === 'pending') {
        this.resolvedCallbacks.push(() => {
          setTimeout(() => {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) return new TypeError('循环');

  let called = false;
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;
      // then 为函数则调用
      if (typeof then === 'function') {
        then.call(
          x,
          (rs) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, x, resolve, reject);
          },
          (rj) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, x, resolve, reject);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }
  } else {
    resolve(x);
  }
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 1000);
}).then(
  (data) => {
    console.log('success', data);
  },
  (err) => {
    console.log('faild', err);
  }
);

try {
    module.exports = Promise;
} catch (error) {
    
}
function Promise(executor) {
    var self = this;
    self.status = 'pending';
    self.data = undefined;
    self.onResolveCallbacks = [];
    self.onRejectCallbacks = [];

    function resolve(value) {
        if(value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = value;
                for (var i = 0; i < self.onResolveCallbacks.length; i++) {
                    self.onResolveCallbacks[i](value);
                }
            }
        });
    }

    function reject(reason) {
        setTimeout(() => {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = reason;
                for (var i = 0; i < self.onRejectCallbacks.length; i++) {
                    self.onRejectCallbacks[i](reason);
                }
            }
        })
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }

}

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2;
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) {
        return v
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) {
        throw r
    };

    if (self.status === 'resolved') {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onResolved(self.data);
                    resolvePromise(promise2, x,resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    if (self.status === 'rejected') {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onRejected(self.data);
                    resolvePromise(promise2, x,resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    if (self.status === 'pending') {
        return promise2 = new Promise(function (resolve, reject) {
            self.onResolveCallbacks.push(function (value) {
                try {
                    var x = onResolved(value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });

            self.onRejectCallbacks.push(function (reason) {
                try {
                    var x = onRejected(reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}



/**
 * @description resolvePromise函数即为根据x的值来决定promise2的状态的函数
 * @param {*} promise2 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
    var callThenThrow = false;
    var then;

    if(promise2 === x) {
        reject(new TypeError('chaning circle error'));
    }
    if(x instanceof Promise) {
        if(x.status === 'pending') {
            x.then(function(value) {
                return resolvePromise(promise2, value, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
        return;
    }
    if((x !== null) && (typeof x === 'object' || typeof x === 'function')) {
        try {
            then = x.then;
            if(typeof then === 'function') {
                then.call(x, function rs(y) {
                    if(callThenThrow) return;
                    callThenThrow = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, function rj(r) {
                    if(callThenThrow) return;
                    callThenThrow = true;
                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (error) {
            if(callThenThrow) return;
            callThenThrow = true;
            return reject(error);
        }
    } else {
        resolve(x);
    }
}

Promise.deferred = Promise.defer = function() {
    var dfd = {};
    dfd.promise = new Promise(function(resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
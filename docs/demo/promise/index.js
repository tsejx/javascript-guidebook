/**
 * 参考：https://juejin.im/post/6856213486633304078
 */

const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}

function Promise (executor) {
  let self = this
  this.status = STATUS.PENDING
  this.value = null
  this.reason = null
  this.onFulfilledHandlers = []
  this.onRejectionHandlers = []

  function resolve (value) {
    if (self.status === STATUS.PENDING) {
      self.status = STATUS.FULFILLED
      self.value = value

      self.onFulfilledHandlers.forEach((handler) => handler(self.value))
    }
  }

  function reject (reason) {
    if (self.status === STATUS.PENDING) {
      self.status = STATUS.REJECTED
      self.reason = reason

      self.onRejectionHandlers.forEach((handler) => handler(self.reason))
    }
  }

  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

// promise 是要返回的 Promise 实例
// x 是 onFulfilled / onRejected 的返回结果
function resolvePromise (promise, x, resolve, reject) {
  // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 这是为了防止死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'))
  }

  if (x instanceof Promise) {
    // 如果 x 为 Promise ，则使 promise 接受 x 的状态
    // 也就是继续执行 x，如果执行的时候拿到一个 y，还要继续解析 y
    // 这个 if 跟下面判断 then 然后拿到执行其实重复了，可有可无
    x.then(function (y) {
      resolvePromise(promise, y, resolve, reject)
    }, reject)

  } else if (typeof x === 'object' || typeof x === 'function') {
    // 如果 x 为 null，应该直接返回 resolve
    if (x === null) {
      return resolve(x)
    }

    let then = null
    try {
      // 这里要用 var（坑死）
      // 把 x.then 赋值为 then
      then = x.then
    } catch (err) {
      // 如果取 x.then 的值时抛出 err，则以 err 为拒因决绝 Promise
      return reject(err)
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false

      // 将 x 作为函数作用域 this 调用之
      // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise，第二个参数叫做 rejectPromise
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          function (y) {
            // 如果 resolvePromise 和 rejectPromise 均被调用
            // 或者同一参数调用多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          // 如果 rejectPromise 以拒因 r 为参数被调用，则以拒因 r 拒绝 promise
          function (r) {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (err) {
        // 如果调用 then 方法抛出了异常 err
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (called) return

        reject(err)
      }
    } else {
      // 如果 then 不是函数，以 x 参数执行 Promise
      resolve(x)
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 resolve
    resolve(x)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const self = this
  const onFulfillment = typeof onFulfilled === 'function' ? onFulfilled : value => value
  const onRejection = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  let returnPromise = new Promise(function (resolve, reject) {

    function handler (flag) {
      const condition = flag === STATUS.FULFILLED ? onFulfilled : onRejected
      const callback = flag === STATUS.FULFILLED ? onFulfillment : onRejection
      const param = flag === STATUS.FULFILLED ? self.value : self.reason

      setTimeout(function () {
        try {
          if (typeof condition === 'function') {
            let x = callback(param)
            resolvePromise(returnPromise, x, resolve, reject)
          } else {
            flag === STATUS.FULFILLED ? resolve(param) : reject(param)
          }
        } catch (err) {
          reject(err)
        }
      }, 0)
    }

    if (self.status === STATUS.PENDING) {
      // Promise 当前状态还是 Pending，将回调函数保存起来
      self.onFulfilledHandlers.push(function () {
        handler(STATUS.FULFILLED)
      })
      self.onRejectionHandlers.push(function () {
        handler(STATUS.REJECTED)
      })
    } else if (self.status === STATUS.FULFILLED) {
      handler(STATUS.FULFILLED)
    } else {
      handler(STATUS.REJECTED)
    }
  })

  return returnPromise
}

Promise.prototype.catch = function (onRejection) {
  this.then(null, onRejection)
}

Promise.prototype.finally = function (fn) {
  return this.then(function (value) {
    return Promise.resolve(fn()).then(function () {
      return value
    })
  }, function (err) {
    return Promise.reject(fn()).then(function () {
      return err
    })
  })
}

Promise.resolve = function (value) {
  if (value instanceof Promise) {
    return value
  }

  return new Promise(function (resolve) {
    resolve(value)
  })
}

// 返回指定 reason 失败态的 Promise 对象
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// 返回一个 Promise 对象，
Promise.race = function (iterable) {
  return new Promise((resolve, reject) => {
    // 遍历数组，获取每个 Promise 的结果
    iterable.forEach((item, index) => {
      Promise.resolve(item).then(
        value => {
          resolve(value)
        },
        reason => {
          reject(reason)
        }
      )
    })
  })
}

// 返回一个 Promise 对象，只有当所有 Promise 都成功时返回的 Promise 状态才成功
Promise.all = function (iterable) {
  const values = new Array(iterable.length)
  // 状态为 fulfilled 的 Promise 的数量
  let resolvedCount = 0

  return new Promise((resolve, reject) => {
    // 遍历 iterable，获取每个 Promise 的结果
    iterable.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          resolvedCount++
          values[index] = value

          // 如果全部 Promise 都为 fulfilled 状态，return 的 Promise 状态为 fulfilled
          if (resolvedCount === iterable.length) {
            resolve(values)
          }
        },
        reason => {
          // 只要有一个失败，return 的 Promise 状态就为 reject
          reject(reason)
        }
      )
    })
  })
}

// 返回所有 Promise 均已 fulfilled 或 rejected 后的 Promise
Promise.allSettled = function (iterable) {
  return new Promise(function (resolve, reject) {
    const len = iterable.length
    let values = []
    let resolveCount = 0

    if (length === 0) {
      return resolve(values)
    } else {
      for (let i = 0; i < len; i++) {
        (function (i) {
          const currentPromise = Promise.resolve(iterable[i])

          currentPromise.then(function (value) {
            resolveCount++
            values[i] = {
              status: STATUS.FULFILLED,
              value: value
            }

            if (resolveCount === len) {
              return resolve(values)
            }
          }, function (reason) {
            resolveCount++
            values[i] = {
              status: STATUS.REJECTED,
              reason: reason
            }
            if (resolveCount === len) {
              return resolve(values)
            }
          })
        })(i)
      }
    }
  })
}

Promise.deferred = function () {
  var result = {}

  result.promise = new Promise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = Promise

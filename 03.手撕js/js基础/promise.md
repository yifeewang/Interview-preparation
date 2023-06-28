## 1. promise
```js
class Promise {
  constructor(executor) {
    this.status = 'pending' // Promise 状态，初始状态为 pending
    this.value = undefined // 成功时的返回值
    this.reason = undefined // 失败时的原因
    this.onResolvedCallbacks = [] // 存储成功时的回调
    this.onRejectedCallbacks = [] // 存储失败时的回调

    // 执行 executor 函数
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  // 成功时的回调函数，将状态修改为 fulfilled，并将成功的返回值 value 保存
  _resolve(value) {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
      this.onResolvedCallbacks.forEach(callback => callback(this.value))
    }
  }

  // 失败时的回调函数，将状态修改为 rejected，并将失败的原因 reason 保存
  _reject(reason) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = reason
      this.onRejectedCallbacks.forEach(callback => callback(this.reason))
    }
  }

  // then 方法，用于添加成功和失败时的回调函数
  then(onFulfilled, onRejected) {
    // 如果 onFulfilled 不是函数，则创建一个函数返回成功的值 value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    // 如果 onRejected 不是函数，则创建一个函数抛出失败的原因 reason
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    // 如果状态为 fulfilled，则直接调用成功的回调函数 onFulfilled
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    }
    // 如果状态为 rejected，则直接调用失败的回调函数 onRejected
    if (this.status === 'rejected') {
      onRejected(this.reason)
    }
    // 如果状态为 pending，则将成功和失败的回调函数存储起来
    if (this.status === 'pending') {
      this.onResolvedCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
  }
}
```

## 2. Promise.resolve
以下是 Promise.resolve() 的实现代码：
```js
Promise.resolve = function(value) {
  if (value instanceof Promise) {
    return value
  }

  return new Promise(resolve => resolve(value))
}
```

方法用于将一个值或另一个 Promise 实例转换为一个 Promise 实例。如果传入的是一个 Promise 实例，则直接返回该实例；否则返回一个新的 Promise 实例，该实例立即进入成功状态并将传入的值作为结果。
在实现中，我们首先判断传入的值是否为一个 Promise 实例，如果是则直接返回该实例；否则我们创建并返回一个新的 Promise 实例，该实例使用 resolve() 方法将传入的值作为结果，立即进入成功状态。这样做的目的是确保无论传入的值是一个普通值还是一个 Promise 实例，返回的都是一个 Promise 实例，这样可以在链式调用时方便地处理 Promise 实例的结果。


## 3. Promise.all
以下是 Promise.all() 的实现代码：
```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'))
    }

    const results = []
    let count = 0

    function processResult(index, result) {
      results[index] = result
      count++

      if (count === promises.length) {
        resolve(results)
      }
    }

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        result => processResult(i, result),
        error => reject(error)
      )
    }
  })
}
```
`Promise.all()` 方法用于将多个 `Promise` 实例包装成一个新的 Promise 实例。该方法接受一个表示多个 Promise 实例的数组作为参数，并返回一个新的 Promise 实例。新的 Promise 实例在参数数组中的所有 Promise 实例都成功时，才会成功；只要参数数组中有一个 Promise 实例失败，那么该 Promise 实例也会失败。
在实现中，我们首先判断传入的参数是否为数组，如果不是则直接返回一个失败状态的 Promise。
接着，我们新建一个空数组 results 和一个计数器 count，用来记录已完成的 Promise 实例数量。
然后，我们遍历传入的数组，使用 Promise.resolve() 方法对每个 Promise 实例进行包装以确保 Promise 实例的执行顺序，并使用 then() 方法处理每个 Promise 实例的执行结果。在处理成功的回调函数中，调用 processResult() 函数将结果添加到 results 数组中，并更新计数器 count 的值。如果 count 的值等于传入的 Promise 实例数组长度，则说明所有的 Promise 实例都已完成，我们会调用 resolve() 方法并传入 results 数组，使新的 Promise 实例进入成功状态。而如果其中某个 Promise 实例失败，则会立即调用 reject() 方法并传入该 Promise 实例的错误信息，使新的 Promise 实例进入失败状态。
注意，Promise.all() 方法在 ES2015 中引入，如果在使用之前的 JavaScript 版本中执行，需要自行实现该方法。
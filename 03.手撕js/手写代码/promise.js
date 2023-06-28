class myPromise {
    constructor(executor) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
        if (typeof executor == 'function') {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } else {
            throw 'executor should be a function'
        }
    }
    _resolve(value) {
        if (this.status === 'pending') {
            this.status === 'fullfiled'
            this.value = value
            this.onResolvedCallbacks.forEach(callback => callback(value))
        }
    }
    _reject(reason) {
        if (this.status === 'pending') {
            this.status === 'rejected'
            this.reason = reason
            this.onRejectedCallbacks.forEach(callback => callback(reason))
        }
    }
    then(onFullfiled, onRejected) {
        if (typeof onFullfiled !== 'function') onFullfiled = val => val
        if (typeof onRejected !== 'function') onRejected = val => val
        if (this.status === 'fullfiled') {
            onFullfiled(this.value)
        }
        if (this.status === 'rejected') {
            onRejected(this.reason)
        }
        if (this.status === 'pending') {
            this.onResolvedCallbacks.push(onFullfiled)
            this.onRejectedCallbacks.push(onRejected)
        }
    }
    static resolve(val) {
        if (val instanceof myPromise) {
            return val
        }
        return new myPromise(res => res(value))
    }
    static all(promises) {
        let arr = []
        let index = 0;
        return new myPromise((resolve, reject) => {
            function process(val) {
                arr[index++] = val

                if (arr.length === promises.length) {
                    resolve(arr)
                }
            }
            promises.forEach((i, index) => {
                myPromise.resolve(i).then(
                    n => process(n),
                    r => reject(r)
                )
            })
        })
    }
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            // 直接循环同时执行传进来的promise
            for (const promise of promises) {
                // 直接返回出去了，所以只有一个，就看哪个快
                promise.then(resolve, reject)
            }
        })
    }
}


const p1 = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1')
    }, 1000)
})

const p2 = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2')
    }, 2000)
})

const p3 = new myPromise((resolve, reject) => {
    setTimeout(() => {
        reject('p3')
    }, 3000)
})
p1.then((val) => {
    console.log(1111, val)
})
p2.then((val) => {
    console.log(2222, val)
})
p3.then((val) => {
    console.log(3333, val)
}, (val) => {
    console.log(3333, val)
})
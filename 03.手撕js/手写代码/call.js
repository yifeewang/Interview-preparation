
Function.prototype._call = function (context, ...args) {
    if(typeof this !== 'function') {
        throw 'type error'
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result;
}

let obj = {
    name: 'yifee'
}

function demo(n) {
    return this.name + ':' + n
}

console.log(demo._call(obj, 18))
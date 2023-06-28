Function.prototype._apply = function (context, args) {
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

function demo(n, m) {
    return this.name + ':' + n + ':' + m
}

console.log(demo._apply(obj, [18, 19]))
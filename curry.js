const curry = (fn) => {
    return function curryFunc(...args) {
        if(args.length < fn.length) {
            return function() {
                console.log(111, [...arguments])
                return curryFunc(...[...args, ...arguments])
            }
        }
        return fn.apply(this, args)
    }
}

const  fn = (x,y,z,h) => x + y + z + h;
const curryFn = curry(fn);
console.log(1111, curryFn(1)(2)(3)(4))

const curry = (fn) => {
    return function curryFn(...args) {
        if(args.length < fn.length) {
            return function () {
                return curryFn(...args.concat([...arguments]))
            }
        }
        return fn.apply(this, args)
    }
}
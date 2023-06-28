// 管道 从左往右
const pipe = (...fns) => val => fns.reduce((value, fn) => fn(value), val);
// compose 从右往左
const compose = (...fns) => val => fns.reverse().reduce((value, fn) => fn(value), val);

const fn1 = (val) => {
    return  val * 2
}

const fn2 = (val) => {
    return val * 3
}

const fn3 = (val) => {
    return val * 4
}

console.log(pipe(fn1, fn2, fn3)(1))
console.log(compose(fn1, fn2, fn3)(1))
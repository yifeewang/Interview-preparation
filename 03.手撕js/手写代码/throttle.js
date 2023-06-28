
function throttle(fn, wait) {
    let timer = null;
    return function () {
        if(timer) return
        timer = setTimeout(() => {
            fn.call(this, ...arguments)
            clearTimeout(timer)
            timer = null;
        }, wait)
    }
}

let fn = throttle((n) => {console.log(n)}, 500)
fn(2)
fn(3)
fn(4)
setTimeout(() => {
fn(5)
}, 900)
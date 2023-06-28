
function debounce(fn, wait) {
    let timer = null;
    return function () {
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.call(this, ...arguments)
        }, wait)
    }
}

let fn = debounce((n) => {console.log(n)}, 1000)
fn(2)
fn(3)
fn(4)
setTimeout(() => {
fn(5)
}, 900)
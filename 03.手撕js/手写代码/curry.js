
function curry(fn) {
    return function curryFn() {
        let args = [...arguments]
        if(args.length < fn.length) {
            return function () {
                curryFn(...args.cancat([...arguments]))
            }
        }
        return fn.appy(this, args)
    }
}
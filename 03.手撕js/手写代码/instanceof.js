
function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left)
    while(proto !== null) {
        if(proto === right.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

console.log(myInstanceof(1, Number))
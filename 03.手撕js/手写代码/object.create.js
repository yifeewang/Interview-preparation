// 将传入的对象 作为原型对象
Object.prototype._create = function(obj) {
    if(typeof obj !== 'object') {
        throw new Error('obj must be an obj or null')
    }
    function F() {}
    F.prototype = obj
    return new F()
}

console.log(Object._create({}))
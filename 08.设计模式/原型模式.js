// 创建一个Dog构造函数
function Dog(name, age) {
    this.name = name
    this.age = age
}

Dog.prototype.eat = function () {
    console.log('肉骨头真好吃')
}

Dog.prototype.play = function () {
    console.log('肉骨头真好玩')
}
// 使用Dog构造函数创建dog实例
const dog = new Dog('旺财', 3)


console.log(111, Dog.prototype)
console.log(222, Dog.prototype.constructor === Dog)
console.log(333, dog)
console.log(444, dog.__proto__)
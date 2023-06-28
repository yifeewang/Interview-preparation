
function _New() {
    const args = [...arguments]
    const constructor = args.shift();
    // 判断参数是否是一个函数
    if (typeof constructor !== "function") {
      return console.error("type error");
    }
    // 创建一个对象，并将对象的原型绑定到构造函数的原型上
    const context = Object.create(constructor)
    // 调用构造函数，并且this绑定到context上
    const res = constructor.apply(context, args)
    // 如果构造函数有返回值，并且返回的是对象，就返回value ;否则返回context
    return typeof res === 'object' && res !== null ? res : context
}

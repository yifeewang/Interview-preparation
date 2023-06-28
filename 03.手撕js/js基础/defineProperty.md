Object.defineProperty 方法用于定义或修改单个属性的特性，
它接受三个参数：要定义或修改属性的对象，要定义或修改的属性名，以及一个包含属性特性的对象。
属性特性对象中包含的成员与 Object.defineProperties 中的描述符对象是类似的，可以指定属性的值、可写性、可枚举性、可配置性等。

```js
const obj = {};

Object.defineProperty(obj, 'foo', {
  value: 123,
  writable: false, //  控制属性值是否可被修改
  enumerable: true, // 是否可枚举，控制属性是否可以通过 for...in 循环枚举
  configurable: false, // 控制属性是否可被删除或者是否可修改特性
});

console.log(obj.foo); // 123
obj.foo = 456; // TypeError: Cannot assign to read only property 'foo' of object '#<Object>'

```
## 一、作用
call 、apply 、bind 作用是改变函数执行时的上下文，简而言之就是改变函数运行时的this指向

那么什么情况下需要改变this的指向呢？下面举个例子
```js
const name="lucy";
const obj={
    name:"martin",
    say:function () {
        console.log(this.name);
    }
};
obj.say(); //martin，this指向obj对象
setTimeout(obj.say, 0); //lucy，this指向window对象
```
从上面可以看到，正常情况say方法输出martin

但是我们把say放在setTimeout方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候this指向window，所以输出luck

## 二、区别

下面再来看看apply、call、bind的使用

`apply`
apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入
改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.apply(obj,[1,2]); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```
当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
```js
fn.apply(null,[1,2]); // this指向window
fn.apply(undefined,[1,2]); // this指向window
```

`call`
call方法的第一个参数也是this的指向，后面传入的是一个参数列表
跟apply一样，改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```
同样的，当第一个参数为null、undefined的时候，默认指向window(在浏览器中)

`bind`
bind方法和call很相似，第一参数也是this的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)
改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
```js
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // this指向obj
fn(1,2) // this指向window
```

`小结`:
从上面可以看到，apply、call、bind三者的区别在于：

三者都可以改变函数的this对象指向
三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window
三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
bind 是返回绑定this之后的函数，apply 、call 则是立即执行

## 三、实现(手写)
`bind`
实现bind的步骤，我们可以分解成为三部分：
1. 修改this指向
2. 动态传递参数
```js
// 方式一：只在bind中传递函数参数
fn.bind(obj,1,2)()

// 方式二：在bind中传递函数参数，也在返回函数中传递参数
fn.bind(obj,1)(2)
```
3. 兼容new关键字

整体实现代码如下：
```js
Function.prototype.myBind = function (context, ...args) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    context.fn = this;
    let that  = this;
    return function Fn() {
        if(this instanceof Fn) {
            const newContext = new Fn(...arguments);
            newContext.fn = that
            let res =  newContext.fn(args.concat(...arguments)); 
            delete newContext.fn;
            return res
        }
        // 根据调用方式，传入不同绑定值
            let res =  context.fn(...args.concat(...arguments)); 
            delete context.fn;
            return res
    }
}
```

`call`
```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

// 用法示例
const user = {
  firstName: "John",
  lastName: "Doe"
};

function greet() {
  console.log(`Hello, ${this.firstName} ${this.lastName}`);
}

greet.myCall(user); // Hello, John Doe
```
`apply`
```js
Function.prototype.myApply = function (context, args) {
  context = context || window;
  context.fn = this;
  const result = args ? context.fn(...args) : context.fn();
  delete context.fn;
  return result;
}

// 用法示例
const user = {
  firstName: "John",
  lastName: "Doe"
};

function greet(greeting) {
  console.log(`${greeting}, ${this.firstName} ${this.lastName}`);
}

greet.myApply(user, ["Hello"]); // Hello, John Doe
```
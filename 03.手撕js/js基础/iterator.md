## 1. 定义

参考 https://juejin.cn/post/6844904025167495181

ES6中的迭代器是一种对象，它定义了一个序列，并在终止时可能返回一个值。
具体来说，迭代器是任何实现了迭代器协议的对象，它具有一个next()方法
该方法返回一个具有两个属性的对象：value（序列中的下一个值）和done（如果序列中的最后一个值已经被消耗，则为true）。
一旦创建，迭代器对象可以通过重复调用next()来显式迭代。

```js
function getIterator(list) {
    let i = 0;
    return {
        next: function () {
            let done = i >= list.length;
            let value = done ? undefined : list[i++]
            return {
                value,
                done
            }
        }
    }
}

var it = getIterator(['a', 'b', 'c']);
console.log(it.next());{value: "a", done: false}
console.log(it.next());{value: "b", done: false}
console.log(it.next());{value: "c", done: false}
console.log(it.next());"{ value: undefined, done: true }"
console.log(it.next());"{ value: undefined, done: true }"
console.log(it.next());"{ value: undefined, done: true }"
```

上面代码便是根据迭代器的基本概念衍生出来的一个模拟实现。

getIterator方法返回一个对象 - 可迭代对象

对象具有一个next 方法，next 方法内部通过闭包来保存指针 i 的值，每次调用 next 方法 i 的值都会+1.

然后根据 i 的值从数组内取出数据作为 value，然后通过索引判断得到 done的值。

当 i=3的时候，超过数组的最大索引，无可用数据返回，此时 done 为true，遍历完成。

## 2. 可迭代对象

`for of 运行机制`
当 for of执行的时候，循环过程中引擎就会自动调用这个 对象上的迭代器方法， 
依次执行迭代器对象的 next 方法,将 next 返回值赋值给 for of 内的变量，从而得到具体的值。

`实现可迭代对象`
对象上怎么会有迭代器方法呢？
ES6里规定，只要在对象的属性上部署了 Iterator接口，具体形式为给对象添加Symbol.iterator属性
此属性指向一个迭代器方法，这个迭代器会返回一个特殊的对象 - 迭代器对象。
而部署这个属性并且实现了迭代器方法后的对象叫做可迭代对象。
此时，这个对象就是可迭代的，也就是可以被 for of 遍历。

>   Symbol.iterator，它是一个表达式，返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值。

举个栗子:
普通的对象是不能被 for of 遍历的，直接使用会报错。
```js
var obj = {};
for (var k of obj) {
}
```

那么我们来,让一个对象变成可迭代对象,按照协议也就是规定来实现即可。
`iterableObj`: 对象上部署 Symbol.iterator属性，然后为其创建一个迭代器方法，迭代器的规则上面我们已经说过啦。
```js
var iterableObj = {
    items: [100,200,300],
    [Symbol.iterator]: function() {
        var self = this;
        var i = 0;
        return {
            next: function () {
                var done = (i >= self.items.length);
                var value = !done ? self.items[i++] : undefined;
                return {
                    done: done,
                    value: value
                };
            }
        };
    }
}
        
//遍历它
for (var item of iterableObj) {
    console.log(item);//100,200,300
}
```

就这么简单，上面这个对象就是可迭代对象了，可以被 for of 消费了。

## 3. Iterator 原生应用场景
我们再回到最开始使用 for of 来进行遍历字符串、数组、map，我们并没有为他们部署Iterator接口，仍然可以使用 for of 遍历。
这是因为在 ES6中有些对象已经默认部署了此接口，不需要做任何处理，就可以使用 for of 来进行遍历取值

`数组`

```js
//数组
var arr = [100,200,300];

var iteratorObj = arr[Symbol.iterator]();

//得到迭代器方法，返回迭代器对象
console.log(iteratorObj.next());
console.log(iteratorObj.next());
console.log(iteratorObj.next());
console.log(iteratorObj.next());
```

`字符串`
因为字符串本身的值是有序的，并且具有类数组的特性，支持通过索引访问，所以也默认部署了iterator接口。

```js
var str = 'abc';

var strIteratorObj = str[Symbol.iterator]();//得到迭代器

console.log(strIteratorObj.next());
console.log(strIteratorObj.next());
console.log(strIteratorObj.next());
console.log(strIteratorObj.next());
```

`arguments 类数组`
函数内的arguments 是一个类数组，他也支持 for of，因为他内部也部署了 Iterator 接口。
我们都知道对象是默认没有部署这个接口的，所以arguments这个属性没有在原型上，而在在对象自身的属性上。
```js
function test() {
    var obj = arguments[Symbol.iterator]("Symbol.iterator");
    console.log(arguments.hasOwnProperty(Symbol.iterator));
    console.log(arguments);
    console.log(obj.next());
}

test(1,2,3);
```

总结来说，已默认部署 Iterator 接口的对象主要包括`数组`、`字符串`、`Set`、`Map` 、类似数组的对象（比如 `arguments` 对象、`DOM NodeList` 对象。

## 4. Iterator 另外一个作用
Iterator除了可以为不同的数据结构提供一种统一的数据访问方式，还有没有发现其他的作用？

那就是数据可定制性，因为我们可以随意的控制迭代器的 value 值。

比如：数组本身就是一个可迭代的，我们可以覆盖他的默认迭代器。

```js
var arr = [100,200,300];

for(var o of arr) {
    console.log(o);
}
// for of 数组默认输出如下

// 100
// 200
// 300
// undefined
```

然后我们改造一下：

```js
var arr = [100,200,300];
arr[Symbol.iterator] = function () {
    var self = this;
    var i = 0;
    return {
        next: function () {
            var done = (i >= self.length);
            var value = !done ? self[i++] : undefined;
            return {
               done: done,
               value: {value, index: i}
            };
        }
    };
}

for (var o of arr) {
    console.log(o);
}
// 改造后 for of 数组默认输出如下

// {value: 100, index: 2}
// {value: 200, index: 3}
// {value: 300, index: 4}
// undefined
```

## 5. 对象为什么没有默认部署

对象可能有各种属性，不像数组的值是有序的。

所以遍历的时候根本不知道如何确定他们的先后顺序，所以需要我们根据情况手动实现。

## 6. 扩展

### 1. for of 中断
我们都知道普通的 for 循环是可以随时中断的，那 for of 是否可以呢？
答案是肯定的，for of机制兼顾了 for和forEach。
迭代器除了必须next 方法外，还有两个可选的方法 `return`和 `throw`方法。
如果 for of 循环提前退出，则会自动调用 return 方法，需要注意的是 return 方法必须有返回值，且返回值必须是 一个object。
`ps：以抛出异常的方式退出，会先执行 return 方法再抛出异常。`

```js
var iterableObj = {
    items: [100,200,300],
    [Symbol.iterator]: function () {
        var self = this;
        var i = 0;
        return {
            next: function () {
                var done = (i >= self.items.length);
                var value = !done ? self.items[i++] : undefined;
                return {
                    done: done,
                    value: value
                };
            },
            return() {
                console.log('提前退出');
                return {
                   //必须返回一个对象
                    done: true
                }
            }
        };
    }
}
    
for (var item of iterableObj) {
    console.log(item);
    if(item === 200) {
        break;
}}

for (var item of iterableObj) {
    console.log(item);
    throw new Error();
}
```

### 2. 不止 for of
除了 for of 执行的时候会自动调用对象的Iterator方法，那么 ES6里还有没有其他的语法形式?

`1. 解构赋值`
对可迭代对象进行解构赋值的时候，会默认调用Symbol.iterator方法。
```js
//字符串
var str = '12345';
var [a,b] = str;
console.log(a,b);// 1 2

//map
var map = new Map();
map.set('我','前端');
map.set('是','技术');
map.set('谁','江湖');
map.set('作者','zz_jesse');

var [d,e] = map;
console.log(d,e);
//["我", "前端"] ["是", "技术"]....
```

同样如果对一个普通对象进行解构，则会报错。

因为普通对象不是可迭代对象。

`从一个自定义的可迭代对象进行解构赋值:`

```js
var iterableObj = {
    items: ['红','绿','蓝'],
    [Symbol.iterator]: function () {
        var self = this;
        var i = 0;
        return {
            next: function () {
                var done = (i >= self.items.length);
                var value = !done ? self.items[i++] : undefined;
                return {
                    done: done,
                    value: value
                };
            }
        };
    }
}
var [d,e] = iterableObj;
console.log(d,e);//红 绿
```
解构赋值的变量的值就是迭代器对象的 next 方法的返回值，且是按顺序返回。

`2. 扩展运算符`
扩展运算符的执行(...)也会默认调用它的Symbol.iterator方法，可以将当前迭代对象转换为数组。

```js
//字符串
var str = '1234';
console.log([...str]);//[1, 2, 3, 4]  转换为数组

//map 对象
var map = new Map([[1, 2], [3, 4]]);
[...map] //[[1, 2], [3, 4]

//set 对象
var set = new Set([1, 2, 3]);
[...set]//[1, 2, 3]
```

`3. 作为数据源`
作为一些数据的数据源，比如某些 api 方法的参数是接收一个数组,都会默认的调用自身迭代器。
例如：Set、Map、Array.from 等

```js
//为了证明，先把一个数组的默认迭代器给覆盖掉

var arr = [100, 200, 300];

arr[Symbol.iterator] = function () {
    var self = this;
    var i = 0;
    return {
        next: function () { 
            var done = (i >= self.length); 
            var value = !done ? self[i++] : undefined;  
            return {        
                done: done,        
                value: value+'前端技术江湖' 
                //注意这里   
            };       
        }
    };
}

for (var o of arr) { 
    console.log(o);
}

// 100前端技术江湖
// 200前端技术江湖
// 300前端技术江湖
```
已覆盖完成
```js
//生成 set  对象
var set = new Set(arr);

//调用 Array.from方法
Array.from(arr);
```

`4. yield* 关键字`
yield*后面跟的是一个可遍历的结构，执行时也会调用迭代器函数。

```js
let foo = function* () {
    yield 1;
    yield* [2,3,4]; 
    yield 5;
};
```

### 3. 判断对象是否可迭代
既然可迭代对象的规则必须在对象上部署Symbol.iterator属性，那么我们基本上就可以通过此属来判断对象是否为可迭代对象，
然后就可以知道是否能使用 for of 取值了。
```js
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}
console.log(isIterable('abcdefg')); // true
console.log(isIterable([1, 2, 3]));// true
console.log(isIterable("Hello"));// true
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set()));// true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet()));// false
```

## 7. 总结
ES6的出现带来了很多新的数据结构，比如 Map ,Set ，所以为了数据获取的方便，增加了一种统一获取数据的方式 for of 。而 for of 执行的时候引擎会自动调用对象的迭代器来取值。
不是所有的对象都支持这种方式，必须是实现了Iterator接口的才可以，这样的对象我们称他们为可迭代对象。
迭代器实现方式根据可迭代协议，迭代器协议实现即可。
除了统一数据访问方式，还可以自定义得到的数据内容，随便怎样，只要是你需要的。
迭代器是一个方法， 用来返回迭代器对象。
可迭代对象是部署了 Iterator 接口的对象，同时拥有正确的迭代器方法。
ES6 内很多地方都应用了Iterator,平时可以多留意观察，多想一步。

## 1. generator是什么
Generator
函数前添加 *，生成一个生成器
一般配合 yield 关键字使用
最大特点，惰性执行，调 next 才会往下执行
主要用来解决异步回调过深的问题

```js
// 生成迭代器方法
//  生成器Generator的应用

function* createIdGenerator() {
  let id = 1
  while (id < 3) yield id++
}
const createId = createIdGenerator()
console.log(createId.next()) //{ value: 1, done: false }
console.log(createId.next()) //{ value: 2, done: false }
console.log(createId.next()) //{ value: undefined, done: true }

const todos = {
  life: ['eat', 'sleep', 'baba'],
  learn: ['es5', 'es6', 'design pattern'],
  work: ['b', 'c', 'framework'],
  [Symbol.iterator]: function* () {
    const all = [...this.life, ...this.learn, ...this.work]
    for (const i of all) {
      yield i
    }
  },
}
for (const item of todos) {
  console.log(item)
}
```

使用generator函数：
```js
function* funG() {
  yield console.log(1)
  yield console.log(2)
  yield console.log(3)
}

function run() {
  console.log(4)
}

const iter = funG()
iter.next()
run()
iter.next()
iter.next()
iter.next()

// 结果：
1
4
2
3
{value: undefined, done:true}
```

写法上：

generator相对于普通函数在function后面多加了*号。
在每个我们需要中断执行的语句前加了yield，通过yield来控制函数执行。

从打印结果上来看：

普通函数一口气打印了1,2,3,4。
generator打印结果明显不同，当调用generator函数的时候并不是立即执行，返回的是一个生成器内部指针对象iter，
通过调用.next()方法移动指针对象到下一个yield，执行表达式，返回表达式结果并暂停自身。每执行一次，都会返回一个包含value和done属性的对象，
value为当前表达式的值，done是boolean值，当done的值为true的时候，表示生成器执行完成。

知道generator的基本用法了，但还不够，为了加深面试官的印象，我们可以从generator设计出发点聊聊协程！

## 2. generator与协程
既然要聊协程，首先得知道协程是什么吧！​
简单来说协程就像单身程序员小王敲代码，老大给了他一个项目A，小王收到立马开码；​
小王项目A做到一半，老大说有个项目B时间赶，赶紧来干项目B；​
于是小王停止开发项目A，着手开干项目B；​
项目B开发一段时间后，小王回来接着干项目A。​
这就是协程，那么项目B做完了？也许没有。

看完了协程的案例，聪明的你应该想到了协程跟generator之间的关系！
没错，generator就是协程在js上的实现。通过generator，我们可以在单线程的JavaScript里使用协程！
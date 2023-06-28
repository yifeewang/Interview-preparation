1. `React_Fiber机制(上)`

https://juejin.cn/post/7110824710069288990

2. ` React_Fiber机制(下)`

https://juejin.cn/post/7111542510727954468


1. `React_Fiber机制(上)`
https://mp.weixin.qq.com/s/oNaffsAbvvG7rxBvgiA1_A

2. ` React_Fiber机制(下)`
https://mp.weixin.qq.com/s?__biz=Mzg3NjU2OTE1Mw==&mid=2247484950&idx=1&sn=da20fd1c4953a565f0bef7170c2a60c5&chksm=cf317138f846f82e07c7d5d44b528dc97f5f702e4a427af8d5c7b50d07c2a25d63c6dd8a158a&cur_album_id=2449835657343696898&scene=189#wechat_redirect

## React-Fiber是个啥
React Fiber是一个「内部引擎」，旨在使 React 更快、更智能。


## React旧有的堆栈调和器Stack Reconciler存在什么问题
为什么这被称为 "堆栈 "调节器？这个名字来自于 "堆栈 "数据结构，它是一个「后进先出」的机制。

这种通过「递归元素树」，以掌握React应用的组件树的DOM元素的过程，被称为「调和」。


## 页面丢帧的原因
现在大多数设备都是以60FPS刷新屏幕，1/60=16.67ms，这意味着「每16ms就有一个新的帧显示」。这个数字很重要，因为如果 React渲染器在屏幕上渲染的时间「超过」16ms，「浏览器就会丢弃该帧」。

## React-Fiber的工作原理

为不同类型的工作分配「优先权」

「暂停工作」，以后再来处理

如果不再需要，就放弃工作

「重复使用」以前完成的工作

回到我们的堆栈调节器，当 React 遍历树时，它在执行堆栈中这样做。所以，当更新发生时，它们会在事件队列中进行「排队」。只有当执行栈清空时，更新才被处理。

Fiber是对堆栈的「重新实现」，专门用于React组件。可以把一个Fiber看成是一个「虚拟的堆栈框架」。

`优点：`

重新实现堆栈的「好处」是，你可以把「堆栈帧保留在内存中」，并随时随地执行它们。

简单地说，Fiber代表了「一个有自己的虚拟堆栈的工作单位」。在以前的调和算法的实现中，React 创建了一棵对象树（React元素），这些对象是「不可变」的，并递归地遍历该树。

在当前的实现中，React 创建了「一棵可变的Fiber节点树」。Fiber节点有效地持有组件的state、props和它所渲染的DOM元素。

而且，由于fiber节点可变的，React 「不需要为更新而重新创建每个节点；它可以简单地克隆并在有更新时更新节点」。

在fiber树的情况下，React 并不执行递归遍历。相反，它创建了一个「单链的列表」，（Effect-List）并执行了一个「父级优先」、「深度优先」的遍历。
一、作用
v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 true值的时候被渲染

v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 item in items 形式的特殊语法，其中 items 是源数据数组或者对象，而 item 则是被迭代的数组元素的别名

在 v-for 的时候，建议设置key值，并且保证每个key值是独一无二的，这便于diff算法进行优化

两者在用法上
```js
<Modal v-if="isShow" />

<li v-for="item in items" :key="item.id">
    {{ item.label }}
</li>
```

二、优先级
v-if与v-for都是vue模板系统中的指令

在vue模板编译的时候，会将指令系统转化成可执行的render函数

在 Vue2 当中，v-for的优先级更高，而在 Vue3 当中，则是v-if的优先级更高。

在 Vue3 当中，做了v-if的提升优化，去除了没有必要的计算，但同时也会带来一个无法取到 v-for 当中遍历的item问题，这就需要开发者们采取其他灵活的方式去解决这种问题。

三、注意事项
永远不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
如果避免出现这种情况，则在外层嵌套template（页面渲染不生成dom节点），在这一层进行v-if判断，然后在内部进行v-for循环
```js
<template v-if="isShow">
    <p v-for="item in items">
</template>
```
如果条件出现在循环内部，可通过计算属性computed提前过滤掉那些不需要显示的项
```js
computed: {
    items: function() {
      return this.list.filter(function (item) {
        return item.isShow
      })
    }
}
```
Set 和 Map 是 ES6 新增的数据结构。成员的值都是唯一的、无重复的。

## 1、Set (元素唯一)
Set 对象是值的集合，且元素是唯一的，类比数组。
API：
new Set(iterable) - 创建集合（可选地从可迭代对象中获取值）。
set.add(value) - 向集合添加一个值。
set.delete(value) - 从集合中删除一个值。
set.has(value) - 如果该值存在于集合中，则返回true，否则返回false。
set.clear() - 从集合中删除所有内容。
set.size - 返回元素数量。

```js
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits，一些用户来了几次
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set只保留唯一的值
alert(set.size); // 3

for (let user of set) {
    alert(user.name); // John（然后Pete和Mary）
}
```

`set 和Array 的互换`
```js
let set = new Set([1,2,3])
[...set] // [1,2,3]
Array.from(set)
```

`求交集、并集、差集， 数组去重`
```js
// 交集
let intersection = new Set([...set1].filter(x => set2.has(x)))
let union = new Set([...set1, ...set2])
let difference = new Set([...set1].filter(x => !set2.has(x)))
```




## 2. Map (保存键值对，且有插入顺序)
Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。 键值相等的判断和set 上是一致的。

Map是一个键值对的集合，就像一个对象。但主要区别在于，Map允许任何类型的键。它有以下方法和属性：
new Map() - 创建映射。
map.set(key, value) - 按键存储值。
map.get(key) - 按键返回值，如果键在映射中不存在，则返回undefined。
map.has(key) - 如果键存在，则返回true，否则返回false。
map.delete(key) - 按键删除元素（键/值对）。
map.clear() - 从映射中删除所有内容。
map.size - 返回当前元素计数。

```js
let map = new Map();
map.set('1', 'str1');
map.set(1, 'num1');
map.set(true, 'bool1');

// 记住普通对象？它会将键转换为字符串
// Map保留类型，因此这两个是不同的：
alert(map.get(1)); // 'num1'
alert(map.get('1')); // 'str1'
alert(map.size); // 3
```
与对象不同，键不会转换为字符串。任何类型的键都是可能的。

## 3、WeakSet (只能是对象的集合，不能是任何类型的任意值、无法枚举)
WeakSet 对象集合中对象的引用为弱引用,不会被标记引用，容易被垃圾回收.
递归、涉及较多对象时,使用。

垃圾回收案例：
```js
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John 访问了我们
visitedSet.add(pete); // 然后是 Pete
visitedSet.add(john); // John 再次访问

// visitedSet 现在有两个用户了
// 检查 John 是否来访过？
alert(visitedSet.has(john)); // true
// 检查 Mary 是否来访过？
alert(visitedSet.has(mary)); // false
john = null;
// visitedSet 将被自动清理
```

案例2
```js
const requests = new WeakSet();
class ApiRequest {
  constructor() {
    requests.add(this);
  }
  makeRequest() {
    if(!request.has(this)) throw new Error("Invalid access");
    // do work
  }
}
// 如果没有weakSet ，你可能需要 通过生命周期去管理，手动删除
const requests = new Set();
class ApiRequest {
  constructor() {
    requests.add(this);
  }
  makeRequest() {
    if(!request.has(this)) throw new Error("Invalid access");
    // do work
  }
  destory(){
    requests.delete(this)
  }
}
```

ApiRequest 类中想验证 this 对象的来源，于是需要一个集合来存所有通过构造函数构建的对象，
ApiRequest 类却并不像参与到实例对象的生命周期中去，直接用 Set 的话，由于Set 对于实例对象存在引用，就会发生内存泄漏。

## 4、WeakMap (键必须是对象、无法枚举)
WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。
其键必须是对象，而值可以是任意的。
Map 的赋值和搜索操作都是O(n)、且容易导致内存泄漏，因为数组会一直引用着每个键和值。
基本上，如果你要往对象上添加数据，即额外数据的存储 又不想干扰垃圾回收机制，就可以使用 WeakMap。

`用来存这个对象相关的数据,与数据共存亡：`
案例1、一个用户对象作为键，其访问次数为值。当一个用户离开时（该用户对象将被垃圾回收机制回收），这时我们就不再需要他的访问次数了
```js
let visitsCountMap = new WeakMap()

// 递归用户来访次数
function countUser(user){
	let count = visitsCountMap.get(user) || 0
    visitsCountMap.set(user, count + 1)
}

// 📁 main.js
let john = { name: "John" };
countUser(john); // count his visits
// 不久之后，john 离开了
john = null;
```
案例2、缓存计算的结果
```js
let cache = new WeakMap()

// 与obj 嘻嘻相关的结果
function process(obj){
	if(!cache.has(obj)) {
    	let result = `与obj有关的计算`
        cache.set(obj, result)
    }
    return cache.get(obj)
}

// other.js
let obj = {}
let result1 = process(obj)
let result2 = process(obj)
obj = null // 如果是Map 就cache 里不可被回收
```
案例3、DOM节点作为键名


## 5. 总结：
Set 类似于数组，成员值唯一。
WeakSet 类似 Set，但成员只能是对象，且没有遍历操作。不引用后会被自动回收。
Map 类似于对象，key值不限于字符串，成员值唯一。
WeakMap 类似 Map，但只接受对象作为键名（null除外），且没有遍历操作。不引用后会被回收。

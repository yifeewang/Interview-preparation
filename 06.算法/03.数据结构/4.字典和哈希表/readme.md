## 字典

字典：键值对存储的，类似于js的对象（js对象的缺点：键[key]都是字符串类型或者会转换成字符串类型）

字典：map来表示，map是不会转换键key值的

## 哈希表 （又叫散列表 ）

区别1: 字典如果找key对应的value需要遍历key，如果想要省去遍历的过程，就需要用哈希表来表示。

区别2: 排列顺序
    字典是根据添加顺序进行排列的
    哈希表不是添加顺序进行排列的

在js中没有哈希表，哈希表是字典的一种实现 Map

习题：
[leetcode 217. 存在重复元素](https://leetcode.cn/problems/contains-duplicate/description/?languageTags=javascript)
[leetcode 1. 两数之和](https://leetcode.cn/problems/two-sum/)
[leetcode 349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)
[leetcode 1207. 独一无二的出现次数](https://leetcode.cn/problems/unique-number-of-occurrences/)
[leetcode 3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/)
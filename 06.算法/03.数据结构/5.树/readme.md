## 树
概念：一种分层数据的抽象模型
    简单来说：分层级关系的 （eg: dom树，虚拟dom都是树形结构）
    
## 树的遍历方法

### 一.深度优先搜索（遍历）
定义：从根结，尽可能深的搜索树的节点
技巧：
    1.访问根节点
    2.对根节点的children挨个进行深度优先搜索(递归)
### 一.广度优先搜索（遍历）
定义：从根结出发，优先访问离根节点最近的节点
技巧：
    1.新建一个队列，把根节点入队
    2.把队头出队
    3.把队头的children挨个入队
    4.重复2和3直到队列为空

## 分类

### 1.多叉树（eg：dom结构）
定义：每个节点下面有多个子节点（不确定个数）（用children表示）

### 2.二叉树
定义：每个节点下面最多只有两个子节点（用 left 和 right 表示）
    前序遍历（先序遍历）：根 =》 左 =》 右
    中序遍历（先序遍历）：左 =》 根 =》 右
    后序遍历（先序遍历）：左 =》 右 =》 根 
练习：
[leetcode 144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
[leetcode 94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)
[leetcode 145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)
[leetcode 111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)
[leetcode 104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
[leetcode 226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)
[leetcode 100. 相同的树](https://leetcode.cn/problems/same-tree/)
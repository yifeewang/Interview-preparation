// 1.数组转树,笔试的时候少写了异步map.get()为空的判断
const nodes = [
  { id: 1, parentId: null, name: "广东" },
  { id: 2, parentId: 1, name: "深圳" },
  { id: 3, parentId: 1, name: "杭州" },
  { id: 4, parentId: 3, name: "杭州" }
];
function transformTree(nodes) {
  let map = new Map();
  let root = null;

  for (let i = 0; i < nodes.length; i++) {
    // 记下parentId对应的结点数组
    if (nodes[i].parentId == null) {
      root = nodes[i];
      continue;
    }

    let list = map.get(nodes[i].parentId)
      ? map.get(nodes[i].parentId)
      : new Array();
    list.push(nodes[i]);
    map.set(nodes[i].parentId, list);
  }

  // 找到对应父亲id的结点们
  const deepSearch = function(id) {
    let arr = [];
    if (!map.get(id)) return;
    for (let x of map.get(id)) {
      let obj = {};
      obj.id = x.id;
      obj.name = x.name;
      obj.children = deepSearch(x.id);
      arr.push(obj);
    }

    return arr;
  };

  let rootObj = {};
  rootObj.id = root.id;
  rootObj.name = root.name;
  rootObj.children = deepSearch(root.id);
  return rootObj;
}

console.log(transformTree(nodes));

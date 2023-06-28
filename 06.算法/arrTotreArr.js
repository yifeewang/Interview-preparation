let arr = [
  { id: 0 },
  { id: 1, parentId: 0 },
  { id: 3, parentId: 2 },
  { id: 2, parentId: 1 }
];

function trans(arr) {
  let m = new Map();
  let root = null;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (typeof el.parentId !== "number") {
      root = el;
      continue;
    }

    const list = m.get(el.parentId) ? m.get(el.parentId) : new Array();
    list.push(el);
    m.set(el.parentId, list);
  }

  console.log(1111, m);

  const searchId = id => {
    let obj = {};
    if (!m.get(id)) return null;
    for (const x of m.get(id)) {
      obj.id = x.id;
      obj.children = searchId(x.id);
    }

    return obj;
  };

  root.children = searchId(root.id);
  return root;
}

console.log(trans(arr));

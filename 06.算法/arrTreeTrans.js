// 1.数组转树,笔试的时候少写了异步map.get()为空的判断
const nodes = [{
        id: 1,
        parentId: null,
        name: "广东"
    },
    {
        id: 2,
        parentId: 1,
        name: "深圳"
    },
    {
        id: 3,
        parentId: 1,
        name: "杭州"
    },
    {
        id: 4,
        parentId: 3,
        name: "杭州"
    }
];

const json = {
    "id": 1,
    "name": "广东",
    "children": [{
        "id": 2,
        "name": "深圳",
        "children": null
    }, {
        "id": 3,
        "name": "杭州",
        "children": [{
            "id": 4,
            "name": "杭州",
            "children": null
        }]
    }]
}

const formatNodes = (nodes) => {
    const m = new Map();
    let rootNodes = null;
    for (const item of nodes) {
        if (!item.parentId) {
            rootNodes = item
            continue;
        }
        const list = m.has(item.parentId) ? m.get(item.parentId) : [];
        list.push(item);
        m.set(item.parentId, list)
    }
    const deepSearch = (id) => {
        const list = m.get(id);
        if (!list) return null;
        const arr = [];
        for (const item of list) {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;
            obj.children = deepSearch(item.id);
            arr.push(obj)
        }
        return arr;
    }
    delete rootNodes.parentId;
    rootNodes.children = deepSearch(rootNodes.id)
    return rootNodes;
}

const formatJson = (json) => {
    const stack = [];
    let root = {...json};
    const deepsearch = (nodes) => {
        if(!nodes) return;
        stack.push({
            id: nodes.id,
            name: nodes.name,
            parentId: nodes.parentId || null
        })
        if(nodes.children) {
            nodes.children.forEach(i => {
                i.parentId = nodes.id;
                deepsearch(i);
            })
        }
    }
    deepsearch(root);
    return stack
}
console.log(1111, JSON.stringify(formatNodes(nodes)))
console.log(2222, formatJson(json))
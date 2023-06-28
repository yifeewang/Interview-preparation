// 请判断是否存在循环依赖
let pkg = [
    {
        name: 'a',
        dependencies: {
            'b': '0.0.1'
        }
    },{
        name: 'b',
        dependencies: {
            'c': '0.0.1'
        }
    },{
        name: 'c',
        dependencies: {
            'a': '0.0.1'
        }
    }
]

function isExitLoopDependencies(pkg) {
    let newPkg = [...pkg]
    newPkg.forEach(i => {
        i.dependencies = Object.keys(i.dependencies)
    })
    return checkDpes(newPkg)
}

function checkDpes(list) {
  const depMap = {};

  const findNode = function (name) {
    return list.find(it => it.name === name)
  }

  const findDeps = function (name, dependencies, path) {
    dependencies.forEach(it => {
      if (name === it) {
        console.log(111,depMap)
        throw new Error("circle dep for " + [name, ...path, it].join(' => '))
      }
      if (depMap[name].indexOf(it) === -1) {
        depMap[name].push(it)
        const node = findNode(it)
        if (node && node.dependencies && node.dependencies.length) {
          findDeps(name, node.dependencies, [...path, it])
        }
      }
    })
  }

  list.forEach(it => {
    depMap[it.name] = []
    findDeps(it.name, it.dependencies || [], [])
  });

  return depMap;
}

console.log(111, isExitLoopDependencies(pkg))
let obj = {
    a: 1,
    b: {
        c: [1, 2, { d: 2}]
    }
}

let arr = [[1,2], 3, [4,[5,[6]]]]

Array.prototype._flat = function (depth) {
    if(!Array.isArray(this) || depth <= 0) {
        return this
    }
    let newArr = []
    for (const iterator of this) {
        if(Array.isArray(iterator)) {
            console.log(123, iterator)
            newArr = newArr.concat(iterator._flat(depth - 1))
        } else {
            newArr = newArr.concat(iterator)
        }
    }
    return newArr
}

function flatObj(obj) {
    let map = {}
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];
            if(typeof element === 'object' && element !== null) {
                let m = flatObj(element)
                for (const nextKey in m) {
                    if (Object.hasOwnProperty.call(m, nextKey)) {
                        map[`${key},${nextKey}`] = m[nextKey]
                    }
                }
            } else {
                map[key] = element
            }
        }
    }
    return map
}

console.log(JSON.stringify(arr._flat(3)))
console.log(JSON.stringify(flatObj(obj)))

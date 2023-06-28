// 1.数组拍平
Array.prototype._flat = function(depth) {
    if(!Array.isArray(this) || depth <= 0) {
        return this
    }
    return this.reduce((prev,cur) => {
        if(Array.isArray(cur)) {
            return prev.concat(cur._flat(depth - 1))
        } else {
            return prev.concat(cur);
        }
    }, [])
}

console.log(JSON.stringify([[1,2], 3, [4,[5,[6]]]]._flat(3)))

// 2.对象拍平 复杂度O(n^2)
let obj = {
    a: 1,
    b: {
        c: [1, 2, { d: 2}]
    }
}
function flatObj(obj) {
    let depthMap = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const ele = obj[key];
            if(typeof ele === 'object' && ele !== null) {
                let nextMap = flatObj(ele);
                for (let nextkey in nextMap) {
                    if (nextMap.hasOwnProperty(nextkey)) {
                        depthMap[key + '.' + nextkey] = nextMap[nextkey];
                    }
                }
            } else {
                depthMap[key] = ele
            }
            
        }
    }
    return depthMap
}

//  复杂度O(n)
function flatObj2(obj, prefix = '') {
    const prev = prefix ? `${prefix}.` : ''
    return Object.keys(obj).reduce((pre,key) => {
        if(typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(pre, flatObj2(obj[key], prev + key))
        } else {
            pre[prev + key] = obj[key]
        }
        return pre
    }, {})
}
console.log(JSON.stringify(flatObj2(obj)))
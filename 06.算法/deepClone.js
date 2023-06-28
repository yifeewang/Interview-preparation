function deepClone(obj) {
    if(!obj || typeof obj !== 'object') return null;
    if(Object.prototype.toString.call(obj) !== '[object Object]') return obj;
    let newObj = {}
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            if(Object.prototype.toString.call(obj[key])=== '[object Object]') {
                newObj[key] = deepClone(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    return newObj;
}

let o = {
    a: 1,
    b: 2,
    s: {
        sex: 'male',
        age: '18'
    }
}

console.log(deepClone(o))
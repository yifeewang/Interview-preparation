
function deepClone(obj) {
    if(obj instanceof Object) {
        if(Array.isArray(obj)) {
            let result = []
            obj.forEach(i => {
                result.push(deepClone(i))
            })
            return result
        } else {
            let result = {}
            for(let i in obj) {
                result[i] = deepClone(obj[i])
            }
            return result
        }
    }
    return obj
}
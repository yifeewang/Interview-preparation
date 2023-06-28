let obj = {
    a_Bosolute: 1,
    a_Cosolute: 1,
    a_Dosolute: {
        j_Gjs: 2,
        j_Sjs: 2,
        j_Fjs: 2
    },
}

function toLowerCase(obj) {
    let newObj = {}
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const regxp = /\_(\w)/g;
            let newKey = key.replace(regxp, (n, p) => {
                return n.toLowerCase()
            })
            const element = obj[key];
            if(typeof element === 'object' && element !== null) {
                newObj[newKey] = toLowerCase(element)
            } else {
                newObj[newKey] = element
            }
        }
    }
    return newObj
}

console.log(111, toLowerCase(obj))
/**
 * key _x z转驼峰命名
 */
const obj = {
    my_name: 'John',
    my_age: 20,
    my_address: 'New York, NY',
    my_phone: '+1 (555) 555-5555',
    my_info: {
        user_sex: 'male',
        user_age: 20,
        user_name: 'John',
        user_address: 'New York, NY'
    },
}

const deepFormate = (obj) => {
    const newObj = {};
    const regexp = /\_(\w)/;
    for (let key in obj) {
        let newKey = key.replace(regexp, (match, p1) => {
            console.log(1111, match, p1)
            return match.toUpperCase();
        });
        if(Object.prototype.toString.call(obj[key]) === '[object Object]'){
            newObj[newKey] = deepFormate(obj[key]);
        }else{
            newObj[newKey] = obj[key];
        }
    }
    return newObj;
}

console.log(deepFormate(obj));
const arr = [2,4,6,3,8,10,18,7,1];

const sums = (arr, key) => {
    let res = [];
    let left = 0;
    while (left < arr.length) {
        for (let j = left + 1; j < arr.length; j++) {
            if(arr[left] + arr[j] == key) {
                res =  [left, j];
                return res;
            }
        }
        left++;
    }
    return res
}

console.log(111, sums(arr, 18))
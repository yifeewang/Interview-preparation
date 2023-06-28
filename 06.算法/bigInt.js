function addTwoBigNumbers(a, b) {
    const arrA = a.split('').map(Number);
    const arrB = b.split('').map(Number);

    while (arrA.length < arrB.length) arrA.unshift(0)
    while (arrA.length > arrB.length) arrB.unshift(0)

    let curry = 0
    let result = []
    for(let i = arrA.length-1; i >= 0; i--) {
        let sum = arrA[i] + arrB[i] + curry;
        result.unshift(sum%10);
        curry = sum > 10 ? 1 : 0
    }

    curry && result.unshift(curry)

    return result.join('')
}

console.log(1111, addTwoBigNumbers('111111111111111111111111111111', '22222222222222222222222222222'))
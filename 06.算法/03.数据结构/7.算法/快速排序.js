function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    const left = [];
    const right = [];
  
    for (let i = 0; i < arr.length; i++) {
      if (i === pivotIndex) {
        continue;
      }
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  
  // 使用示例
  const unsortedArray = [6, 2, 8, 3, 1, 5, 9, 4, 7];
  const sortedArray = quickSort(unsortedArray);
  console.log(sortedArray);
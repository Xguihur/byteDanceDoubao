let arr = [1,2,3,4,5,8,44,5,22,34,75,99]
// 使用二分法排序
function binarySort(arr) {
  let left = 0
  let right = arr.length - 1
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (arr[mid] > arr[mid + 1]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return arr
}
const brr = binarySort(arr)
console.log(arr)

// quick sort
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let pivot = arr[0]
  let left = []
  let right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
# Array.prototype.findIndex()

`findIndex()`方法返回数组中满足提供的测试函数的**第一个元素**的**索引**。否则返回-1。

## 语法

```javascript
arr.findIndex( callbackFunc [, thisArg ])

callbackFunc = function (currentValue, index, array) {
    // do something to 
}
```

### 参数

- 实例方法参数

| 参数           | 类型            | 说明                             |
| -------------- | --------------- | -------------------------------- |
| `callbackFunc` | `Function` 类型 | 用于测试数组每个元素的回调函数。 |
| `thisArg`      | `Object` 类型   | 执行回调函数时的 `this` 值。     |

- 回调函数参数

| 参数           | 类型          | 说明                               |
| -------------- | ------------- | ---------------------------------- |
| `currentValue` | 任意类型      | 元素值，遍历时的每一项数组元素     |
| `index`        | `Number` 类型 | 元素的索引，对应元素在数组中的索引 |
| `array`        | `Array` 类型  | 原数组，整个被遍历的数组           |

## 示例

### 标准示例

```javascript
const arr = [1, 2, 3, 4, 5, 12, 22, 2, 2, 2]

const r = arr.findIndex(function(currentValue, index, array) {
    return currentValue === 2
})

console.log(r);		// 1
```

### 查找数组中首个质数元素的索引

```javascript
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```




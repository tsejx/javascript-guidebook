---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.find
order: 23
---

# Array.prototype.find()

 `Array.prototype.find()` 方法返回数组中满足提供的判定函数的第一个成员。

## 语法

```js
arr.find( callback = function (currentValue, index, arr) {} [, thisArg ] )
```

| 实例方法参数 | 说明                       | 类型     |
| ------------ | -------------------------- | -------- |
| `callback`   | 用于判定数组成员的回调函数 | function |
| `thisArg`    | 执行回调函数的 `this` 值   |          |

| 回调函数参数   | 说明                     | 类型   |
| -------------- | ------------------------ | ------ |
| `currentValue` | 当前遍历的数组成员       | any    |
| `index`        | 当前遍历的数组成员的索引 | number |
| `arr`          | 原数组                   | array  |

**返回值：** 当遍历到的数组成员通过回调函数的判定时，返回数组中该成员，否则返回 `undefined`。

## 示例

### 用对象的属性查找数组里的对象

```js
let foo = [
    {name: 'a', quantity: 2},
    {name: 'b', quantity: 0},
    {name: 'c', quantity: 5}
];

const getFoo = key => arr => arr.name === key;

console.log(foo.find(getFoo('c')))
// { name: 'c', quantity: 5 }
```

### 寻找数组中的质数

```js
function isPrime(element, index, array) {
    let start = 2;
    while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
            return false;
        }
    }
    return element > 1
}

console.log([4, 6, 8, 12].find(isPrime))
// undefined, not found
console.log([4, 5, 8, 12].find(isPrime))
// 5
```

当在回调中删除数组中的一个值时，当访问到这个位置时，其传入的值时 `undefiend`。

```js
// Declare array with no element at index 2, 3 and 4
var a = [0,1,,,,5,6];

// Shows all indexes, not just those that have been assigned values
a.find(function(value, index) {
  console.log('Visited index ' + index + ' with value ' + value);
});

// Shows all indexes, including deleted
a.find(function(value, index) {

  // Delete element 5 on first iteration
  if (index == 0) {
    console.log('Deleting a[5] with value ' + a[5]);
    delete a[5];  // 注：这里只是将a[5]设置为undefined，可以试试用a.pop()删除最后一项，依然会遍历到被删的那一项
  }
  // Element 5 is still visited even though deleted
  console.log('Visited index ' + index + ' with value ' + value);
});
```


# Array.prototype.lastIndexOf()

`lastIndexOf()` 函数用于查找数组元素在当前数组中最后一次出现的起始位置。

## 语法

```javascript
arr.lastIndexOd( searchValue [, fromIndex ] )
```

### 参数

| 参数          | 类型          | 描述                                               |
| ------------- | ------------- | -------------------------------------------------- |
| `searchValue` | 任意类型      | 需要查找的数组元素。                               |
| `fromIndex`   | `Number` 类型 | 在当前数组中查找的起始索引，默认为 `arr.lengt - 1` |

### 返回值

`lastIndexOf()` 方法的返回值为 `Number` 类型，返回数组元素在当前数组中最后一次查找到的起始位置（索引）。

## 示例

### 标准示例

```javascript
var array = [2, 5, 9, 2];

var index = array.lastIndexOf(2);
// index is 3

index = array.lastIndexOf(7);
// index is -1

index = array.lastIndexOf(2, 3);
// index is 3

index = array.lastIndexOf(2, 2);
// index is 0

index = array.lastIndexOf(2, -2);
// index is 0

index = array.lastIndexOf(2, -1);
// index is 3
```

### 查找所有元素

下例使用 `lastIndexOf` 查找到一个元素在数组中所有的索引（下标），并使用 `push` 将所有添加到另一个数组中。

```javascript
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.lastIndexOf(element);

while (idx != -1) {
  indices.push(idx);
  idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
}

console.log(indices);
// [4, 2, 0];
```

注意：我们要单独处理 `idx==0` 时的情况，因为如果是第一个元素，忽略了`fromIndex`参数则第一个元素总会被查找。这不同于 `indexOf` 方法。

## 兼容性

```javascript
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var n, k,
        t = Object(this),
        len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }

    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    for (k = n >= 0
          ? Math.min(n, len - 1)
          : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}
```


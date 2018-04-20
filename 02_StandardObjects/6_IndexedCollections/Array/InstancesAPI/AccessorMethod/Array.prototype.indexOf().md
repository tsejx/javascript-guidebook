# Array,prototype.indexOf()

`indexOf()` 函数用于查找数组子项在当前字符串中第一次出现的位置。

## 语法

```javascript
arr.indexOf( searchValue [, fromIndex] )
```

### 参数

| 参数          | 类型                | 描述                                    |
| ------------- | ------------------- | --------------------------------------- |
| `searchValue` | 任意类型            | 要查找的数组元素。                      |
| `fromIndex`   | `Number` 类型，可选 | 在当前字符串中查找的起始索引，默认为0。 |

### 返回值

`indexOf()` 方法的返回值为 `Number` 类型，返回数组元素在当前数组中第一次查找到的起始位置（索引）。

### 描述

`indexOf` 函数使用 Strict Equality（无论是 `===`，还是 Triple-equals 操作符都基于同样的方法）进行判断查找的元素与数组中包含的元素之间的关系。

## 示例

### 标准示例

```javascript
var arr = [1, 2, 3, 4, 5];

arr.indexOf(1);				// 0
arr.indexOf(7);				// -1
arr.indexOf(4, 2);			// 3
arr.indexOf(3, -1);			// -1
arr.indexOf(3, -3);			// 2 
```

### 找出指定元素出现的所有位置

```javascript
// 存放指定元素出现的位置的数组
var indices = [];
// 被查找的数组
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
// 查找的元素
var element = 'a';

var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]
```


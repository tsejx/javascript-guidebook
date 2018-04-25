# Array.prototype.unshift()

`unshift()` 函数用于向当前数组的开头位置插入一个或多个指定的元素，并返回插入后的数组长度。

## 语法

```javascript
arr.unshift( item1 [,items... ] )
```

### 参数

| 参数    | 类型           | 描述                                         |
| ------- | -------------- | -------------------------------------------- |
| `item1` | 任意类型       | 添加到当前数组开头处的元素。                 |
| `itemN` | 任意类型，可选 | 要添加到当前数组开头处的其他项，可以有多个。 |

### 返回值

`unshift()` 函数的返回值为 `Number` 类型，返回插入元素后的当前数组的长度。

### 描述

`unshift()` 方法会在调用它的类数组（Array-Like）对象的开始位置插入给定的参数。

当向数组中添加新的元素时，数组的 `length` 属性也会随之改变（如果数组中有元素的话），一般而言，数组的 `length` 属性将会加`N` （ `N` 为添加的元素个数）。

**注意**：`unshift() `函数在 IE 5.5 ~ IE 7 浏览器中的返回值为 `undefined`，只有IE 8+可以正确返回插入后的数组长度。出于兼容性考虑，如需获取新的数组长度，请直接使用 `array.length`，而不要使用该函数的返回值。

## 示例

```javascript
var arr = [1, 2];

arr.unshift(0); //result of call is 3, the new array length
//arr is [0, 1, 2]

arr.unshift(-2, -1); // = 5
//arr is [-2, -1, 0, 1, 2]

arr.unshift( [-3] );
//arr is [[-3], -2, -1, 0, 1, 2]
```


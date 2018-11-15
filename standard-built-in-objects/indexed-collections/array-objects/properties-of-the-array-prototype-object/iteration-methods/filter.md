# Array.prototype.filter()

`filter()` 函数创建一个新数组，其包含通过所提供函数实现的测试的所有元素。 

## 语法

```javascript
arr.filter( callbackFunc [, thisArg ] )

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

| 参数           | 类型          | 说明                                 |
| -------------- | ------------- | ------------------------------------ |
| `currentValue` | 任意类型      | 元素值，遍历时的每一项数组元素。     |
| `index`        | `Number` 类型 | 元素的索引，对应元素在数组中的索引。 |
| `array`        | `Array` 类型  | 原数组，整个被遍历的数组。           |

### 返回值

`filter()` 函数的返回值是 `Array` 类型，是一个新的通过测试的元素的集合的数组。

### 描述

- filter 为数组中的每个元素调用一次回调函数，并利用所有使得回调函数返回 `true` 或 等价于 `true` 的值 的元素创建一个新数组。回调函数只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过回调函数测试的元素会被跳过，不会被包含在新数组中。
- 如果为 `filter()` 提供一个 `thisArg` 参数，则它会被作为 `callback` 被调用时的 `this` 值。否则，回调函数的 `this` 值在非严格模式下将是全局对象，严格模式下为 `undefined`。
- `filter()` 不会改变原数组。
- `filter()` 遍历的元素范围在第一次调用回调函数之前就已经确定了。在调用 `filter()` 之后被添加到数组中的元素不会被 `filter()` 遍历到。如果已经存在的元素被改变了，则他们传入回调函数的值是 `filter()` 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

## 示例

### 标准示例

```javascript
function isBigEnough(value) {
  return value >= 10;
}

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);

// filtered is [12, 130, 44]
```

- ES6 写法

```javascript
const isBigEnough = value => value >= 10;

let [...spraed] = [12, 5, 8, 130, 44];

let filtered = spraed.filter(isBigEnough);

// filtered is [12, 130, 44]
```

### 排除偶数保留奇数

```javascript
let arr = [1, 2, 3, 5, 6, 9, 10];

let singular = arr.filter(function(value) {
	return value % 2 !== 0
})

console.log(singular);		// [1, 3, 5, 9]
```

### 清除数组空字符

```javascript
let arr = ['A', '', 'B', null, undefined, 'c', ' '];

let real = arr.filter(function(value) {
    return value && value.trim()
})

console.log(real);		// ['A', 'B', 'C']
```

### 数组去重

```javascript
'use strict'

let new_arr,
    origin_arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'strawberry'];

new_arr = origin_arr.filter(function(value, index, self) {
    return self.indexOf(value) === index;
})

console.log(new_arr);		// ["apple", "strawberry", "banana", "pear", "orange"]
```

去除重复元素依靠的是 `indexOf()` 总是返回第一个元素的位置，后续的重复元素位置与 `indexOf()` 返回的位置不相等，因此被 `filter()` 过滤掉。

## 兼容性

filter 被添加到 ECMA-262 标准第 5 版中，因此在某些实现环境中不被支持。可以把下面的代码插入到脚本的开头来解决此问题，该代码允许在那些没有原生支持 filter 的实现环境中使用它。该算法是 ECMA-262 第 5 版中指定的算法，假定 fn.call 等价于 Function.prototype.call 的初始值，且 Array.prototype.push 拥有它的初始值。

```javascript
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /* , thisArg*/)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}
```


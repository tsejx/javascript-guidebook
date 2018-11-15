# Array.prototype.includes()

`includes()` 方法用来判断一个数组是否包含一个指定的值，如果是，酌情返回 `true` 或 `false`。

## 语法

```javascript
arr.includes( searchValue [, fromIndex])
```

### 参数

| 参数          | 类型     | 描述                 |
| ------------- | -------- | -------------------- |
| `searchValue` | 任意类型 | 需要查找的元素值。   |
| `fromIndex`   |          | 查找数组开始的索引。 |

## 示例

### 标准示例

```javascript
let demacia = [1, 2, 3];

demacia.includes(2); 
// true 

demacia.includes(4); 
// false

demacia.includes(3, 3);
// false

demacia.includes(3, -1);
// true

let ionia = [1, 2, NaN];

ionia.includes(NaN);
// true
```

#### `fromIndex` 大于等于数组长度

 如果 `fromIndex` 大于等于数组长度 ，则返回 `false` 。该数组不会被搜索。

```javascript
var arr = ['a', 'b', 'c'];

arr.includes('c', 3);   //false
arr.includes('c', 100); // false
```

### 计算出的索引小于 0

如果 `fromIndex` 为负值，计算出的索引将作为开始搜索 `searchValue` 的位置。如果计算出的索引小于 0，则整个数组都会被搜索。

```javascript
// 数组长度是3
// fromIndex 是 -100
// computed index 是 3 + (-100) = -97

var arr = ['a', 'b', 'c'];

arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
```

### `includes()` 作为一个通用方法

`includes()` 方法有意设计为通用方法。它不要求 `this` 值是数组对象，所以它可以被用于其他类型的对象（比如类数组对象）。下面的例子展示了 在函数的 `arguments` 对象上调用的 `includes()` 方法。

```javascript
(function() {
  console.log([].includes.call(arguments, 'a')); // true
  console.log([].includes.call(arguments, 'd')); // false
})('a','b','c');
```

## 兼容性

```javascript
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
```

# Array.prototype.fill()

`fill()` 函数用于将一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

## 语法

```javascript
arr.fill( value [, startIndex [, endIndex] ] )
```

### 参数

| 参数         | 类型                | 说明                             |
| ------------ | ------------------- | -------------------------------- |
| `value`      | 任何类型            | 填充数组元素的值。               |
| `startIndex` | `Number` 类型，可选 | 起始索引，默认为0。              |
| `endIndex`   | `Number` 类型，可选 | 结束索引，默认为 `arr.length` 。 |

### 描述

具体填充区间始于 `startIndex`，结束但不包括于 `emdIndex`（半开半闭区间）

- 当 `startIndex` 为负数，则开始索引为 `arr.length + startIndex`
- 当 `endIndex` 为负数，则结束索引为 `arr.length + endIndex`

## 示例

### 标准示例

```javascript
// startIndex 省略则开始索引为0，endIndex 省略则结束索引为 arr.length
[1, 2, 3].fill(4);				// [4, 4, 4]

[1, 2, 3].fill(4, 1);			// [1, 4, 4]

[1, 2, 3].fill(4, 1, 2);		// [1, 4, 3]

[1, 2, 3].fill(4, 1, 1);		// [1, 2, 3]

[1, 2, 3].fill(4, 3, 3);		// [1, 2, 3]

[1, 2, 3].fill(4, -3, -2);		// [4, 2, 3]

[1, 2, 3].fill(4, NaN, NaN);	// [1, 2, 3]

[1, 2, 3].fill(4, 3, 5);		// [1, 2, 3]

Array(3).fill(4);				   // [4, 4, 4]

[].fill.call({length: 3}, 4);		// {0: 4, 1: 4, 2: 4, length: 3}

// Object by reference
var arr = Array(3).fill({});		// [{}, {}, {}];
arr[0].hi = 'hi';				   // [{hi: 'hi'}, {hi: 'hi'}, {hi: "hi"}]
```

## 兼容性

```javascript
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}
```

如果你确实需要维护已过时的不支持 `Object.defineProperty` 的 JavaScript 引擎，那么最好完全不向 `Array.prototype` 添加方法，因为你不能使它不可枚举。
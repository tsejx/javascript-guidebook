# Array.prototype.find()

 `find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`。

## 语法	

```javascript
arr.find( callbackFunc [, thisArg ] )

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

### 返回值

当某个元素通过回调函数的测试时，返回数组中的一个值，否则返回 `undefined`。

## 示例

### 用对象的属性查找数组里的对象

```javascript
let inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries));	// { name: 'cherries', quantity: 5 }
```

### 寻找数组中的质数

```javascript
function isPrime(element, index, array) {
    let start = 2;
    while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
            return false;
        }
    }
    return element > 1
}

console.log([4, 6, 8, 12].find(isPrime));		// undefined, not found
console.log([4, 5, 8, 12].find(isPrime));		// 5
```

当在回调中删除数组中的一个值时，当访问到这个位置时，其传入的值时 `undefiend`：

```javascript
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

## 兼容性

```javascript
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
```


# Array数组类型——缩小方法

## Array.prototype.reduce

reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

```javascript
var total = [0, 1, 2, 3].reduce(function(sum, value) {
  return sum + value;
}, 0);
// total is 6

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

### 语法

> arr.reduce(callback[, initialValue])

**参数**

 - **`callback`**
执行数组中每个值的函数，包含四个参数：

    - **`accumulator`**
累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。

    - **`currentValue`**
数组中正在处理的元素。

    - **`currentIndex`**
数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。

    - **`array`**
调用reduce的数组

 - **`initialValue`** *可选*
用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

**返回值**

函数累计处理的结果

### 描述

reduce为数组中的每一个元素依次执行 `callback` 函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：

 - accumulator
 - currentValue
 - currentIndex
 - array

回调函数第一次执行时，`accumulator` 和 `currentValue` 的取值有两种情况：调用 `reduce` 时提供 `initialValue`，`accumulator` 取值为 `initialValue`，`currentValue` 取数组中的第一个值；没有提供 `initialValue`，`accumulator` 取数组中的第一个值，`currentValue` 取数组中的第二个值。

注意：如果没有提供 `initialValue`，`reduce` 会从索引1的地方开始执行 `callback` 方法，跳过第一个索引。如果提供 `initialValue`，从索引0开始。

如果数组为空且没有提供 `initialValue`，会抛出 `TypeError` 。如果数组仅有一个元素（无论位置如何）并且没有提供 `initialValue`， 或者有提供 `initialValue` 但是数组为空，那么此唯一值将被返回并且 `callback` 不会被执行。

提供初始值通常更安全，正如下面的例子，如果没有提供initialValue，则可能有三种输出：

```javascript
var maxCallback = ( pre, cur ) => Math.max( pre.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() without initialValue
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

// map/reduce; better solution, also works for empty arrays
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );
```

**reduce如何运行**

假如运行下段代码：

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

callback 被调用四次，每次调用的参数和返回值如下表：


callback|	accumulator|	currentValue|	currentIndex|	array|	return value
:---:   |     :---:     |     :---:     |     :---:      |      :---:    |  :---:
first call|	0	|1	|1	|[0, 1, 2, 3, 4]	|1
second call|1	|2	|2	|[0, 1, 2, 3, 4]	|3
third call|	3	|3	|3	|[0, 1, 2, 3, 4]	|6
fourth call|6	|4	|4	|[0, 1, 2, 3, 4]	|10


由reduce返回的值将是上次回调调用的值（10）。

你同样可以使用箭头函数的形式，下面的代码会输出跟前面一样的结果

您还可以提供Arrow Function 代替完整功能。 下面的代码将产生与上面的代码中相同的输出：

```javascript
[0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr );
```

如果你打算提供一个初始值作为reduce方法的第二个参数，以下是运行过程及结果：

```javascript
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => { return accumulator + currentValue; }, 10 );
```

callback|	accumulator|	currentValue|	currentIndex|	array|	return value
:----:|:----:|:----:|:----:|:----:|:----:|:----:
first call|	10|	0|	0|	[0, 1, 2, 3, 4]|	10
second call|	10|	1|	1|	[0, 1, 2, 3, 4]|	11
third call|	11|	2|	2|	[0, 1, 2, 3, 4]|	13
fourth call|	13|	3|	3|	[0, 1, 2, 3, 4]|	16
fifth call|	16|	4|	4|	[0, 1, 2, 3, 4]|	20

这种情况下reduce返回的值是20。

### 示例

**数组求和、求积和最大值**

```javascript
var sum = [0, 1, 2, 3].reduce(function (a, b) {
  return a + b;
}, 0);
// sum is 6

var product = [1, 2, 3, 4, 5].reduce(function(a, b) {
    return a * b
}, 1);
// product is 120

var max = [1, 2, 3, 4, 5].reduce(function(a, b) {
    return a > b ? a : b;
})
// max is 5
```

你也可以写成箭头函数的形式：

```javascript
var sum = [ 0, 1, 2, 3 ].reduce(
  ( acc, cur ) => acc + cur,
  0
);

var product = [1, 2, 3, 4, 5].reduce(
    (a, b) => a * b,
    1
);

var max = [1, 2, 3, 4, 5].reduce(
    (a, b) => a > b ? a: b
);
```

**找出长度最长的数组元素**

```javascript
function findLongest (entries) {
    return entries.reduce (function (prev, cur) {
        return cur.length > prev.length ? cur : prev;
    }, '')
}

console.log(findLongest([1, 2, 3, 'ab', 4, 'bcd', 5, 6785, 4])); // 'bcd'
```

**将二维数组转化为一维（二维数组扁平化）**

```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]
```

你也可以写成箭头函数的形式：

```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  ( acc, cur ) => acc.concat(cur),
  []
);
```

**计算数组中每个元素出现的次数**

```javascript
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

**使用扩展运算符和 `initialValue` 绑定包含在对象数组中的数组**

```javascript
// friends - an array of objects 
// where object field "books" - list of favorite books 
var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];

// allbooks - list which will contain all friends' books +  
// additional list contained in initialValue
var allbooks = friends.reduce(function(prev, curr) {
  return [...prev, ...curr.books];
}, ['Alphabet']);

// allbooks = [
//   'Alphabet', 'Bible', 'Harry Potter', 'War and peace', 
//   'Romeo and Juliet', 'The Lord of the Rings',
//   'The Shining'
// ]
```

### 兼容性（Polyfill）

```javascript
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0; 

      // Steps 3, 4, 5, 6, 7      
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}
```

如果您需要兼容不支持Object.defineProperty的JavaScript引擎，那么最好不要 polyfill Array.prototype方法，因为你无法使其成为不可枚举的。

## Array.prototype.reduceRight

reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

```javascript
let flattened = [
    [0, 1], 
    [2, 3], 
    [4, 5]
].reduceRight((a, b) => {
    return a.concat(b);
}, []);

// flattened is [4, 5, 2, 3, 0, 1]
```

对于从左至右遍历的相似方法请参阅 Array.prototype.reduce().

### 语法

> arr.reduceRight(callback[, initialValue])
    
**参数**

 - **`callback`**
一个回调函数，用来操作数组中的每个元素，可接受四个参数：
    - **`previousValue`**
上一次调用回调的返回值，或提供的 initialValue
    - **`currentValue`**
当前被处理的元素
    - **`index`**
当前处理元素的索引
    - **`array`**
调用 reduce 的数组
 - **`initialValue`**
可作为第一次调用回调 callback 的第一个参数

**返回值**

执行之后的返回值

### 描述

reduceRight 为数组中每个元素调用一次 callback 回调函数，但是数组中被删除的索引或从未被赋值的索引会跳过。回调函数接受四个参数：初始值（或上次调用回调的返回值）、当前元素值、当前索引，以及调用 reduce 的数组。

可以像下面这样调用 reduceRight 的回调函数 callback：

```javascript
array.reduceRight(function(previousValue, currentValue, index, array) {
    // ...
});
```

首次调用回调函数时，previousValue 和 currentValue 可以是两个值之一。如果调用 reduceRight 时提供了 initialValue 参数，则 previousValue 等于 initialValue，currentValue 等于数组中的最后一个值。如果没有提供 initialValue 参数，则 previousValue 等于数组最后一个值， currentValue 等于数组中倒数第二个值。

如果数组为空，且没有提供 initialValue 参数，将会抛出一个 TypeError 错误。如果数组只有一个元素且没有提供 initialValue 参数，或者提供了 initialValue 参数，但是数组为空将会直接返回数组中的那一个元素或 initialValue 参数，而不会调用 callback。

该函数的完整执行过程见下例：

```javascript
[0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
});
```

回调将会被调用四次，每次调用的参数及返回值如下：

previousValue|	currentValue|	index|	array|	return| value
:---:|:---:|:---:|:---:|:---:|
first call|	4|	3|	3|[0,1,2,3,4]| 7
second call|7|	2|	2|[0,1,2,3,4]| 9
third call|	9|	1|	1|[0,1,2,3,4]| 10
fourth call|10|	0|	0|	[0,1,2,3,4]| 10
reduceRight 返回值是最后一次调用回调的返回值（10）。

如果提供了一个 initialValue 参数，则结果如下：

```javascript
[0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
}, 10);
```

previousValue	|currentValue|	index|	array|	return| value
:---:|:---:|:---:|:---:|:---:|
first call	|10	|4	|4	|[0,1,2,3,4]	|14
second call	|14	|3	|3	|[0,1,2,3,4]	|17
third call	|17	|2	|2	|[0,1,2,3,4]	|19
fourth call	|19	|1	|1	|[0,1,2,3,4]	|20
fifth call	|20	|0	|0	|[0,1,2,3,4]	|20

reduceRight 返回值为 20。

### 示例

**例子：求一个数组中所有值的和**

```javascript
var total = [0, 1, 2, 3].reduceRight(function(a, b) {
    return a + b;
});
// total == 6
```

**例子：扁平化（flatten）一个元素为数组的数组**

```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
}, []);
// flattened is [4, 5, 2, 3, 0, 1]
```

**例子：reduce 与 reduceRight 之间的区别**

```javascript
var a = ['1', '2', '3', '4', '5']; 
var left  = a.reduce(function(prev, cur)      { return prev + cur; }); 
var right = a.reduceRight(function(prev, cur) { return prev + cur; }); 

console.log(left);  // "12345"
console.log(right); // "54321"
```

### 兼容性（Polyfill）

reduceRight 被添加到 ECMA-262 标准第 5 版，因此它在某些实现环境中可能不被支持。把下面的代码添加到脚本开头可以解决此问题，从而允许在那些没有原生支持 reduceRight 的实现环境中使用它。

```javascript
// Production steps of ECMA-262, Edition 5, 15.4.4.22
// Reference: http://es5.github.io/#x15.4.4.22
if ('function' !== typeof Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callback /*, initialValue*/) {
    'use strict';
    if (null === this || 'undefined' === typeof this) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if ('function' !== typeof callback) {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      while (k >= 0 && !(k in t)) {
        k--;
      }
      if (k < 0) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k--];
    }
    for (; k >= 0; k--) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
```



# Array.prototype.forEach()

`forEach()` 函数对数组的每个元素执行一次回调函数。

## 语法

```javascript
arr.forEach( callbackFunc [, thisArg ] )

callbackFunc = function (currentValue, index, array) {
    // do something to 
}
```

### 参数

- 实例方法参数

| 参数           | 类型                | 说明                                                 |
| -------------- | ------------------- | ---------------------------------------------------- |
| `callbackFunc` | `Function` 类型     | 回调函数，为数组中每个元素执行的函数，接受三个参数。 |
| `thisArg`      | `Object` 类型，可选 | 执行回调函数的 `this` 值。                           |

- 回调函数参数

| 参数           | 类型          | 说明                                 |
| -------------- | ------------- | ------------------------------------ |
| `currentValue` | 任意类型      | 元素值，遍历时的每一项数组元素。     |
| `index`        | `Number` 类型 | 元素的索引，对应元素在数组中的索引。 |
| `array`        | `Array` 类型  | 原数组，整个被遍历的数组。           |

### 返回值

`forEach()` 函数返回 `undefined`。

### 描述

- `forEach` 函数按升序为数组中含有效值的每一项执行一次 `callbackFunc` 函数，那些已删除（使用 `delete` 方法等情况）或者未初始化的项将被跳过（但不包括那些值为 `undefined` 的项）（例如在稀疏数组上）。
- 如果给 `forEach` 传递了 `thisArg` 参数，当调用时，它将被传给回调函数，作为它的 `this` 值。否则，将会传入 `undefined` 作为它的 `this` 值。`callbackFunc` 回调函数最终可观察到this值，这取决于 函数观察到this的常用规则。
- `forEach` 遍历的范围在第一次调用 `callback` 前就会确定。调用 `forEach` 后添加到数组中的项不会被 `callback` 访问到。如果已经存在的值被改变，则传递给 `callback` 的值是 `forEach` 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 `shift()` ） ，之后的元素将被跳过。
- `forEach()` 为每个数组元素执行 `callback` 函数；不像 `map()` 或者 `reduce()` ，它总是返回 `undefined` 值，并且不可链式调用。典型用例是在一个链的最后执行副作用。

**注意**： 没有办法中止或者跳出 `forEach`  循环，除了抛出一个异常。如果你需要这样，使用 `forEach()` 函数是错误的，你可以用一个简单的循环作为替代。如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 `Array.every` 或 `Array.some`。如果可用，新方法 `find()` 或者 `findIndex()` 也可被用于真值测试的提早终止。

## 示例

### 标准示例

```javascript
const arr = ['a', 'b', 'c'];

arr.forEach(function(element) {
    console.log(element);
});

arr.forEach( element => console.log(element));

// a b c
```

### 使用 `thisArg`

举个勉强的例子，从每个数组中的元素值中更新一个对象的属性：

```javascript
function Counter() {
    this.sum = 0;
    this.count = 0;
}

Counter.prototype.add = function(array) {
    array.forEach(function(entry) {
        this.sum += entry;
        ++this.count;
    }, this);
    //console.log(this);
};

var obj = new Counter();
obj.add([1, 3, 5, 7]);

obj.count; 
// 4 === (1+1+1+1)
obj.sum;
// 16 === (1+3+5+7)
```

因为 `thisArg` 参数 (`this`) 传给了 `forEach()`，每次调用时，它都被传给 `callback` 函数，作为它的 `this` 值。

注意：如果使用箭头函数表达式传入函数参数，`thisArg` 参数会被忽略，因为箭头函数在词法上绑定了 `this` 值。
对象复制函数

下面的代码会创建一个给定对象的副本。 创建对象的副本有不同的方法，以下是只是一种方法，并解释了 `Array.prototype.forEach()` 是如何使用 ECMAScript 5 Object.* 元属性（Meta Property ）函数工作的。

```javascript
function copy(obj) {
  var copy = Object.create(Object.getPrototypeOf(obj));
  var propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(function(name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

var obj1 = { a: 1, b: 2 };
var obj2 = copy(obj1); // obj2 looks like obj1 now
```

### 如果数组在迭代时被修改了，则其他元素会被跳过。

下面的例子输出"one", "two", "four"。当到达包含值"two"的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four"现在在数组更前的位置，"three"会被跳过。`forEach()` 不会在迭代之前创建数组的副本。

```javascript
var words = ["one", "two", "three", "four"];
words.forEach(function(word) {
  console.log(word);
  if (word === "two") {
    words.shift();
  }
});
// one
// two
// four
```

## 兼容性

`forEach()` 是在第五版本里被添加到 ECMA-262 标准的；这样它可能在标准的其他实现中不存在，你可以在你调用 `forEach` 之前 插入下面的代码，在本地不支持的情况下使用 `forEach()`。该算法是 ECMA-262 第5版中指定的算法。算法假定 `Object` 和 `TypeError` 拥有它们的初始值。`callback.call` 等价于`Function.prototype.call()`。

```javascript
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}
```




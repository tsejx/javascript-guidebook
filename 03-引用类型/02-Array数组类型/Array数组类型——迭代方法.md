# Array数组类型——迭代方法

## Array.prototype.every()

every() 方法测试数组的所有元素是否都通过了指定函数的测试。

### 语法

> arr.every(callback[, thisArg])

**参数**

 - **`callback`**

用来测试每个元素的函数。

 - **`thisArg`**

执行 callback 时使用的 this 值。

### 描述

 - every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。
 
 - callback 被调用时传入三个参数：**元素值**，**元素的索引**，**原数组**。

 - 如果为 every 提供一个 thisArg 参数，则该参数为调用 callback 时的 this 值。如果省略该参数，则 callback 被调用时的 this 值，在非严格模式下为全局对象，在严格模式下传入 undefined。

 - every 不会改变原数组。

 - every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到。如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

 - every acts like the "for all" quantifier in mathematics. In particular, for an empty array, it returns true. (It is vacuously true that all elements of the empty set satisfy any given condition.)

**every()方法遇到第一个值时是 false 立即返回false并不再迭代下去**

```javascript
    var arr = [ 1, 2, 3, 4, 5, 6 ];  
  
    console.log( arr.every( function( item, index, array ){  
        console.log( 'item=' + item + ',index='+index+',array='+array );  
        return item > 3;  
    }));
```
 
### 实例

**例子：检测所有数组元素的大小**

下例检测数组中的所有元素是否都大于 10。

```javascript
function isBigEnough(element, index, array) {
  return (element >= 10);
}

var passed = [12, 5, 8, 130, 44].every(isBigEnough); // passed is false

passed = [12, 54, 18, 130, 44].every(isBigEnough); // passed is true
```

### 兼容旧环境（Polyfill）

在第 5 版时，every 被添加进 ECMA-262 标准；因此在某些实现环境中不被支持。你可以把下面的代码放到脚本的开头来解决此问题，该代码允许在那些没有原生支持 every 的实现环境中使用它。该算法是 ECMA-262 第5版中指定的算法，假定 Object 和 TypeError 拥有它们的初始值，且 fun.call 等价于 `Function.prototype.call`。

```javascript
if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
        throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisArg, t[i], i, t))
        return false;
    }

    return true;
  };
}
```

## Array.prototype.some()

some() 方法测试数组中的某些元素是否通过由提供的函数实现的测试。

```javascript
const isBiggerThan10 = (element, index, array) => {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  
// false

[12, 5, 8, 1, 4].some(isBiggerThan10); 
// true
```

### 语法

> arr.some(callback[, thisArg])

**参数**

 - **`callback`**

用来测试每个元素的函数。

 - **`thisArg`**

执行 callback 时使用的 this 值。

### 描述

 - some 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。

 - callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。

 - 如果为 some 提供了一个 thisArg 参数，将会把它传给被调用的 callback，作为 this 值。否则，在非严格模式下将会是全局对象，严格模式下是 undefined。

 - some 被调用时不会改变数组。

 - some 遍历的元素的范围在第一次调用 callback. 时就已经确定了。在调用 some 后被添加到数组中的值不会被 callback 访问到。如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some 访问到它那一刻的值。

### 示例

**例子：测试数组元素的值**

下面的例子检测在数组中是否有元素大于 10。

```javascript
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough); // passed is false
passed = [12, 5, 8, 1, 4].some(isBigEnough); // passed is true
```

### 兼容旧环境（Polyfill）

在第 5 版时，some 被添加进 ECMA-262 标准；这样导致某些实现环境可能不支持它。你可以把下面的代码插入到脚本的开头来解决此问题，从而允许在那些没有原生支持它的实现环境中使用它。该算法是 ECMA-262 第 5 版中指定的算法，假定 Object 和 TypeError 拥有他们的初始值，且 fun.call 等价于 Function.prototype.call。

```javascript
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisArg, t[i], i, t))
        return true;
    }

    return false;
  };
}
```

## Array.prototype.filter()

filter() 方法创建一个**新数组**，其包含通过所提供函数实现的测试的所有元素。 

```javascript
function isBigEnough(value) {
  return value >= 10;
}

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);

// filtered is [12, 130, 44]

// ES6 way

const isBigEnough = value => value >= 10;

let [...spraed]= [12, 5, 8, 130, 44];

let filtered = spraed.filter(isBigEnough);

// filtered is [12, 130, 44]
```

### 语法

> var new_array = arr.filter(callback[, thisArg])

**参数**

 - **`callback`**

用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
返回true表示保留该元素（通过测试），false则不保留。

 - **`thisArg`**

可选。执行 callback 时的用于 this 的值。

**返回值**

  一个新的通过测试的元素的集合的数组

**ES6**

```javascript
  let [...spraed]= [12, 5, 8, 130, 44];

  等同于：let spraed = 浅拷贝([12, 5, 8, 130, 44]) 
```

### 描述

 - filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。

 - callback 被调用时传入三个参数：元素的值、元素的索引、被遍历的数组

 - 如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。

 - The thisvalue ultimately observable by callback is determined according to the usual rules for determining thethis seen by a function.

 - filter 不会改变原数组。

 - filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

### 示例

**例子：筛选排除掉所有的小值**

下例使用 filter 创建了一个新数组，该数组的元素由原数组中值大于 10 的元素组成。

```javascript
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```

### 兼容旧环境（Polyfill）

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

## Array.prototype.forEach()

forEach() 方法对数组的每个元素执行一次提供的函数。

```javascript
const arr = ['a', 'b', 'c'];

arr.forEach(function(element) {
    console.log(element);
});

arr.forEach( element => console.log(element));

// a // b // c
```

### 语法

```javascript
array.forEach(callback(currentValue, index, array){
    //do something
}, this)

array.forEach(callback[, thisArg])
```

**参数**

 - **`callback`**
为数组中每个元素执行的函数，该函数接收三个参数：

    - **`currentValue(当前值)`**
数组中正在处理的当前元素。

    - **`index(索引)`**
数组中正在处理的当前元素的索引。

    - **`array`**
forEach()方法正在操作的数组。

 - **`thisArg可选`**
可选参数。当执行回调 函数时用作this的值(参考对象)。

**返回值**
undefined

### 描述

`forEach` 方法按升序为数组中含有效值的每一项执行一次 `callback` 函数，那些已删除（使用delete方法等情况）或者未初始化的项将被跳过（但不包括那些值为 `undefined` 的项）（例如在稀疏数组上）。

callback 函数会被依次传入三个参数：

 - 数组当前项的值
 - 数组当前项的索引
 - 数组对象本身

 如果给forEach传递了 `thisArg` 参数，当调用时，它将被传给 `callback` 函数，作为它的this值。否则，将会传入 undefined 作为它的this值。callback函数最终可观察到this值，这取决于 函数观察到this的常用规则。

`forEach` 遍历的范围在第一次调用 `callback` 前就会确定。调用 `forEach` 后添加到数组中的项不会被 `callback` 访问到。如果已经存在的值被改变，则传递给 `callback` 的值是 `forEach` 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了(例如使用 `shift()`) ，之后的元素将被跳过 - 参见下面的示例。

`forEach()` 为每个数组元素执行 `callback` 函数；不像 `map()` 或者 `reduce()` ，它总是返回 `undefined` 值，并且不可链式调用。典型用例是在一个链的最后执行副作用。

注意： 没有办法中止或者跳出 `forEach`  循环，除了抛出一个异常。如果你需要这样，使用forEach()方法是错误的，你可以用一个简单的循环作为替代。如果您正在测试一个数组里的元素是否符合某条件，且需要返回一个布尔值，那么可使用 Array.every 或 Array.some。如果可用，新方法 `find()` 或者 `findIndex()` 也可被用于真值测试的提早终止。


### 示例

**打印出数组的内容**

下面的代码会为每一个数组元素输出一行记录：

```javascript
function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}

// 注意索引2被跳过了，因为在数组的这个位置没有项
[2, 5, ,9].forEach(logArrayElements);

// a[0] = 2
// a[1] = 5
// a[3] = 9

[2, 5,"" ,9].forEach(logArrayElements);
// a[0] = 2
// a[1] = 5
// a[2] = 
// a[3] = 9

[2, 5, undefined ,9].forEach(logArrayElements);
// a[0] = 2
// a[1] = 5
// a[2] = undefined
// a[3] = 9


let xxx;
// undefined

[2, 5, xxx ,9].forEach(logArrayElements);
// a[0] = 2
// a[1] = 5
// a[2] = undefined
// a[3] = 9
```

**使用thisArg**

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

因为 `thisArg` 参数 (this) 传给了 `forEach()`，每次调用时，它都被传给callback函数，作为它的this值。

注意：如果使用箭头函数表达式传入函数参数，thisArg 参数会被忽略，因为箭头函数在词法上绑定了this值。
对象复制函数

下面的代码会创建一个给定对象的副本。 创建对象的副本有不同的方法，以下是只是一种方法，并解释了 `Array.prototype.forEach()` 是如何使用ECMAScript 5 Object.* 元属性（meta property ）函数工作的。

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

**如果数组在迭代时被修改了，则其他元素会被跳过。**

下面的例子输出"one", "two", "four"。当到达包含值"two"的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four"现在在数组更前的位置，"three"会被跳过。 forEach()不会在迭代之前创建数组的副本。

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

### 兼容旧环境（Polyfill）

forEach 是在第五版本里被添加到 ECMA-262 标准的；这样它可能在标准的其他实现中不存在，你可以在你调用 forEach 之前 插入下面的代码，在本地不支持的情况下使用 forEach()。该算法是 ECMA-262 第5版中指定的算法。算法假定Object和TypeError拥有它们的初始值。callback.call 等价于Function.prototype.call()。

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

## Array.prototype.map()

`map()` 方法创建一个**新数组**，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```javascript
// ES6
let numbers = [1, 5, 10, 15];
let doubles = numbers.map( x => x ** 2);

// doubles is now [1, 25, 100, 225]
// numbers is still [1, 5, 10, 15]


const numbers = [2, 4, 8, 10];
let halves = numbers.map(x => x / 2);

let numbers = [1, 4, 9];
let roots = numbers.map(Math.sqrt);
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]
```

### 语法

```javascript
let new_array = arr.map(function callback(currentValue, index, array) { 
    // Return element for new_array 
}[, thisArg])
```

**参数**

 - **`callback`**
生成新数组元素的函数，使用三个参数：

    - **`currentValue`**
callback 的第一个参数，数组中正在处理的当前元素。

    - **`index`**
callback 的第二个参数，数组中正在处理的当前元素的索引。

    - **`array`**
callback 的第三个参数，map 方法被调用的数组。

 - **`thisArg`**
可选的。执行 callback 函数时 使用的this 值。

**返回值**

一个新数组，每个元素都是回调函数的结果。

### 描述

 - map 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。`callback` 每次执行后的返回值（包括 `undefined`）组合起来形成一个新数组。 `callback` 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 `delete` 删除的索引则不会被调用。

 - `callback` 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。

 - 如果 thisArg 参数有值，则每次 callback 函数被调用的时候，this 都会指向 thisArg 参数上的这个对象。如果省略了 thisArg 参数,或者赋值为 null 或 undefined，则 this 指向全局对象 。

 - map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）。

 - 使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用之前就已经确定了。在 map 方法执行的过程中：原数组中新增加的元素将不会被 callback 访问到；若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。

### 示例

**求数组中每个元素的平方根**

下面的代码创建了一个新数组，值为原数组中对应数字的平方根。

```javascript
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]
```

**使用 map 重新格式化数组中的对象**

以下代码将一个包含对象的数组用以创建一个包含新重新格式化对象的新数组。

```javascript
var kvArray = [{key: 1, value: 10}, 
               {key: 2, value: 20}, 
               {key: 3, value: 30}];

var reformattedArray = kvArray.map(function(obj) { 
   var rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});

// reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}], 

// kvArray 数组未被修改: 
// [{key: 1, value: 10}, 
//  {key: 2, value: 20}, 
//  {key: 3, value: 30}]
```

**用一个仅有一个参数的函数来mapping一个数字数组**

下面的代码表示了当函数需要一个参数时map的工作方式。这个参数会遍历原始数组中的元素。

```javascript
var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});

// doubles数组的值为： [2, 8, 18]
// numbers数组未被修改： [1, 4, 9]
```

**一般的 map 方法**

下面的例子演示如何在一个 String  上使用 map 方法获取字符串中每个字符所对应的 ASCII 码组成的数组：

```javascript
var map = Array.prototype.map
var a = map.call("Hello World", function(x) { 
  return x.charCodeAt(0); 
})
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

**querySelectorAll 应用**

下面代码展示了如何去遍历用 querySelectorAll 得到的动态对象集合。在这里，我们获得了文档里所有选中的选项，并将其打印：

```javascript
var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});
```

**反转字符串**

```javascript
var str = '12345';
Array.prototype.map.call(str, function(x) {
  return x;
}).reverse().join(''); 

// 输出: '54321'
// Bonus: use '===' to test if original string was a palindrome
```

### 使用技巧案例

通常情况下，map 方法中的 callback 函数只需要接受一个参数，就是正在被遍历的数组元素本身。但这并不意味着 map 只给 callback 传了一个参数。这个思维惯性可能会让我们犯一个很容易犯的错误。

```javascript
// 下面的语句返回什么呢:
["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]

// 通常使用parseInt时,只需要传递一个参数.
// 但实际上,parseInt可以有两个参数.第二个参数是进制数.
// 可以通过语句"alert(parseInt.length)===2"来验证.
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素, 
// 元素索引, 原数组本身.
// 第三个参数parseInt会忽视, 但第二个参数不会,也就是说,
// parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.

function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// 意料之中的结果

// 也可以使用简单的箭头函数，结果同上
['1', '2', '3'].map( str => parseInt(str) );

// 一个更简单的方式:
['1', '2', '3'].map(Number); // [1, 2, 3]
// 与`parseInt` 不同，下面的结果会返回浮点数或指数:
['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]
```

### 兼容旧环境（Polyfill）

map 是在最近的 ECMA-262 标准中新添加的方法；所以一些旧版本的浏览器可能没有实现该方法。在那些没有原生支持 map 方法的浏览器中，你可以使用下面的 Javascript 代码来实现它。所使用的算法正是 ECMA-262，第 5 版规定的。假定Object, TypeError, 和 Array 有他们的原始值。而且 callback.call 的原始值也是 Function.prototype.call

```javascript
// 实现 ECMA-262, Edition 5, 15.4.4.19
// 参考: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. 将O赋值为调用map方法的数组.
    var O = Object(this);

    // 2.将len赋值为数组O的长度.
    var len = O.length >>> 0;

    // 3.如果callback不是函数,则抛出TypeError异常.
    if (Object.prototype.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 5. 创建新数组A,长度为原数组O长度len
    A = new Array(len);

    // 6. 将k赋值为0
    k = 0;

    // 7. 当 k < len 时,执行循环.
    while(k < len) {

      var kValue, mappedValue;

      //遍历O,k为原数组索引
      if (k in O) {

        //kValue为索引k对应的值.
        kValue = O[ k ];

        // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
        mappedValue = callback.call(T, kValue, k, O);

        // 返回值添加到新数组A中.
        A[ k ] = mappedValue;
      }
      // k自增1
      k++;
    }

    // 8. 返回新数组A
    return A;
  };      
}
```

## Array.prototype.includes()

includes() 方法用来判断一个数组是否包含一个指定的值，如果是，酌情返回 true或 false。

```javascript
let a = [1, 2, 3];

a.includes(2); 
// true 

a.includes(4); 
// false
```

### 语法

> *arr.includes(searchElement)
arr.includes(searchElement, fromIndex)*

**参数**

 - **`searchElement`**
需要查找的元素值。

 - **`fromIndex`** *可选*
从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0。

**返回值**

一个 Boolean。

### 示例

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

**fromIndex 大于等于数组长度**

 如果 `fromIndex` 大于等于数组长度 ，则返回 `false` 。该数组不会被搜索。

```javascript
var arr = ['a', 'b', 'c'];

arr.includes('c', 3);   //false
arr.includes('c', 100); // false
```

**计算出的索引小于 0**

如果 fromIndex 为负值，计算出的索引将作为开始搜索searchElement的位置。如果计算出的索引小于 0，则整个数组都会被搜索。

```javascript
// 数组长度是3
// fromIndex 是 -100
// computed index 是 3 + (-100) = -97

var arr = ['a', 'b', 'c'];

arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
```

**includes() 作为一个通用方法**

`includes()` 方法有意设计为通用方法。它不要求this值是数组对象，所以它可以被用于其他类型的对象 (比如类数组对象)。下面的例子展示了 在函数的 `arguments` 对象上调用的 `includes()` 方法。

```javascript
(function() {
  console.log([].includes.call(arguments, 'a')); // true
  console.log([].includes.call(arguments, 'd')); // false
})('a','b','c');
```

### Polyfill

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

如果你需要支持那些不支持 `Object.defineProperty` 的废弃JavaScript 引擎，你最好不要 polyfill `Array.prototype` 方法，因为你不能使它们不可枚举。



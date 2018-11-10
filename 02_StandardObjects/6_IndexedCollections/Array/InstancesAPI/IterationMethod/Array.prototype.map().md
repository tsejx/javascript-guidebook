## Array.prototype.map()

`map()` 方法创建一个**新数组**，数组中的元素为原始数组元素调用函数处理后的值。

### 语法

```js
let new_array = old_arr.map(function callback(currentValue, index, array) [, thisArg])
```

#### 参数

| 参数     | 说明                                                         | 类型     |
| -------- | ------------------------------------------------------------ | -------- |
| callback | 必选。生成新数组元素的函数。                                 | function |
| thisArg  | 可选。 对象作为该执行回调时使用，传递给函数，用作 `this` 的值。 |          |

**callback函数的参数**

| 参数         | 说明                                 | 类型   |
| ------------ | ------------------------------------ | ------ |
| currentValue | 必选。函数正在处理的当前元素的值。   | any    |
| index        | 可选。函数正在处理的当前元素的索引。 | number |
| array        | 可选。原数组本身。                   | array  |

#### 返回值

一个新数组，每个元素都是回调函数的结果。

### 描述

- `map` 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。`callback` 每次执行后的返回值（包括 `undefined`）组合起来形成一个新数组。 `callback` 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 `delete` 删除的索引则不会被调用。
- 如果 `thisArg` 参数有值，则每次 `callback` 函数被调用的时候，this 都会指向 `thisArg` 参数上的这个对象。如果省略了 `thisArg` 参数,或者赋值为 `null` 或 `undefined`，则 this 指向全局对象 。
- `map` 不修改调用它的原数组本身（当然可以在 `callback` 执行时改变原数组）。
- 使用 `map` 方法处理数组时，数组元素的范围是在 `callback` 方法第一次调用之前就已经确定了。在 `map` 方法执行的过程中：原数组中新增加的元素将不会被 `callback` 访问到；若已经存在的元素被改变或删除了，则它们的传递到 `callback` 的值是 `map` 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。

### 示例

**求数组中每个元素的平方根**

下面的代码创建了一个新数组，值为原数组中对应数字的平方根。

```js
const numbers = [1, 4, 9];
const roots = numbers.map(Math.sqrt);

// Math.sqrt(x)

console.log(numbers);		// [1, 4, 9]
console.log(roots);			// [1, 2, 3],
```

**使用 map 重新格式化数组中的对象**

以下代码将一个包含对象的数组用以创建一个包含新重新格式化对象的新数组。

```js
const kvArray = [{
    key: 1, value: 10
}, {
    key: 2, value: 20
}, {
    key: 3, value: 30
}];

const reformattedArray = kvArray.map(function(obj) { 
   let rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
});

// reformattedArray 数组为： [{1: 10}, {2: 20}, {3: 30}], 

// kvArray 数组未被修改: 
// [{key: 1, value: 10}, 
//  {key: 2, value: 20}, 
//  {key: 3, value: 30}]
```

**一般的 map 方法**

下面的例子演示如何在一个字符串上使用 `map` 方法获取字符串中每个字符所对应的 ASCII 码组成的数组：

```js
const map = Array.prototype.map

const a = map.call("Hello World", function(x) { 
  return x.charCodeAt(0); 
})

// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

**querySelectorAll 应用**

下面代码展示了如何去遍历用 `querySelectorAll` 得到的动态对象集合。在这里，我们获得了文档里所有选中的选项，并将其打印：

```js
const elems = document.querySelectorAll('select option:checked');
const values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});
```

**反转字符串**

```js
const str = '12345';

Array.prototype.map.call(str, function(x) {
  return x;
}).reverse().join(''); 

// 输出: '54321'
// Bonus: use '===' to test if original string was a palindrome
```

### 使用技巧案例

通常情况下，`map` 方法中的 `callback` 函数只需要接受一个参数，就是正在被遍历的数组元素本身。但这并不意味着 `map` 只给 `callback` 传了一个参数。这个思维惯性可能会让我们犯一个很容易犯的错误。

```js
// 下面的语句返回什么呢:
["1", "2", "3"].map(parseInt);
// 你可能觉的会是[1, 2, 3]
// 但实际的结果是 [1, NaN, NaN]

// 通常使用parseInt时,只需要传递一个参数.
// 但实际上,parseInt可以有两个参数.第二个参数是进制数.
// 可以通过语句"alert(parseInt.length)===2"来验证.
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素, 元素索引, 原数组本身
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

`Amap` 是在最近的 ECMA-262 标准中新添加的方法；所以一些旧版本的浏览器可能没有实现该方法。在那些没有原生支持 `map` 方法的浏览器中，你可以使用下面的 Javascript 代码来实现它。所使用的算法正是 ECMA-262，第 5 版规定的。假定Object、TypeError 和 Array 有他们的原始值。而且 `callback.call` 的原始值也是 `Function.prototype.call`。

```js
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

---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: 扩展运算符
order: 16
---

# 扩展运算符

扩展运算符允许一个表达式在期望多个参数（用于函数调用）或多个元素（用于数组字面量）或多个变量（用于解构赋值）的位置扩展。

## 语法

### 函数调用

```js
myFunction(...iterableObj);
```

### 数组字面量或字符串

```js
[...iterableObj, '4', 'five', 6];
```

### 对象字面量

```js
let iterableObj = { ...obj };
```

## 应用

### 函数中的应用

#### 替代数组的 `apply` 方法

当我们的函数有多个变量的时候（特别是当我们不知道变量的数量的时候），有时候会通过将变量保存在数组中，并通过 `apply` 来执行函数，有了扩展运算符后则有了更好的方式（毕竟使用 `apply` 需要手动指定 `this` ，有时候会不是很方便很准确）。

```js
// ES5
function myFunction(x, y, z) {}
var args = [0, 1, 2];
myFunction.apply(null, args);

// ES6
function myFunction(x, y, z) {}
var args = [0, 1, 2];
myFunction(...args);
```

参数列表中的人和参数都可以使用扩展语法，并且可以多次使用。

```js
function myFunction(v, w, x, y, z) {}
var args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);
```

#### 函数的返回值

JavaScript 的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一个变通方法。

```js
var dateField = readDateFields(database);
var d = new Date(...dateFields);
```

上面的代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数 Date。

### 数组中的应用

#### 数组的合并

扩展运算符提供了数组合并的新写法

```js
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// ['a', 'b', 'c', 'd', 'e']

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// ['a', 'b', 'c', 'd', 'e']
```

#### 数组的拷贝

被拷贝数组元素仅限基本数据类型。

```js
let a = [1, 2, 3];
let b = [...a];
```

#### 与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

```js
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

下面是另外一些例子

```js
// 数组的分割
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first);
// 1
console.log(rest);
// [2, 3, 4, 5]

const [first, ...rest] = [];
console.log(first);
// undefined
console.log(rest);
// []

const [first, ...rest] = ['foo'];
console.log(first);
// 'foo'
console.log(rest);
// []
```

如果将扩展运算符用于数组赋值，则只能将其放在参数的**最后一位**，否则会报错。

```js
const [...butLast, last] = [1, 2, 3, 4, 5]
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

### 字符串中的应用

扩展运算符还可以将字符串转为真正的数组。

```js
[...'hello'];
// ['h', 'e', 'l', 'l', 'o']
```

上面的写法有一个重要的好处：能够正确识别 32 位的 Unicode 字符。

```js
'x\uD83D\uDE80y'.length			// 4
[...'x\uD83D\uDE80y'].length	// 3
```

以上代码的第一种写法中，JavaScript 会将 32 位 Unicode 字符识别为 2 个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数可以像下面这样写。

```js
function length(str) {
  return [...str].length;
}

length('x\uD83D\uDE80y'); // 3
```

凡事涉及操作 32 位 Unicode 字符的函数都有这个问题。因此，最好都用扩展运算符改写。

```js
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

上面的代码中，如果不用扩展运算，字符串的 `reverse` 操作就不正确。

### 实现 Iterator 接口的对象

任何 Iterator 接口的对象都可以用扩展运算符转为**真正的数组**。

```js
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

上面的代码中，`querySelectorAll` 方法返回的是一个 `nodeList` 对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因在于 `NodeList` 对象实现了 Iterator。

对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组了。

```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3,
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```

上面的代码中，`arrayLike` 是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用 `Array.from` 方法将 `arrayLike` 转为真正的数组。

### `Map` 和 `Set` 结构、`Generator` 函数

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，如 `Map` 结构。

```js
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```

Generator 函数运行后会返回一个遍历器对象，因此也可以使用扩展运算符。

```js
var go = function*() {
  yield 1;
  yield 2;
  yield 3;
};

[...go()]; // [1, 2, 3]
```

上面的代码中，变量 `go` 是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符即可将内部遍历得到的值转为一个数组。

```js
var obj = { a: 1, b: 2 };
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

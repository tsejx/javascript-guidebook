# 扩展运算符

扩展运算符允许一个表达式在期望多个参数（用于函数调用）或多个元素（用于数组字面量）或多个变量（用于解构赋值）的位置扩展。

## 语法

- 函数调用

```Javascript
myFunction(...iterableObj);
```

- 数组字面量或字符串

```javascript
[...iterableObj, '4', 'five', 6]
```

- 对象字面量（ECMAScript 2018 新增内容）

```javascript
let iterableObj = {...obj}
```



## 应用

### 合并数组

扩展运算符提供了数组合并的新写法

```javascript
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

### 与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

下面是另外一些例子

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first	// 1
rest	// [2, 3, 4, 5]

const [first, ...rest] = []
first	// undefined
rest	// []

const [first, ...rest] = ["foo"];
first	// 'foo'
rest	// []
```

如果将扩展运算符用于数组赋值，则只能将其放在参数的**最后一位**，否则会报错。

```javascript
const [...butLast, last] = [1, 2, 3, 4, 5]
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

### 函数的返回值

JavaScript 的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一个变通方法。

```javascript
var dateField = readDateFields(database);
var d = new Date(...dateFields);
```

上面的代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数 Date。

### 字符串

扩展运算符还可以将字符串转为真正的数组。

```javascript
[...'hello']
// ['h', 'e', 'l', 'l', 'o']
```

上面的写法有一个重要的好处：能够正确识别32位的 Unicode 字符。

```javascript
'x\uD83D\uDE80y'.length			// 4
[...'x\uD83D\uDE80y'].length	// 3
```

以上代码的第一种写法中，JavaScript 会将32位 Unicode 字符识别为2个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数可以像下面这样写。

```javascript
function length(str) {
    return [...str].length;
}

length('x\uD83D\uDE80y');	// 3
```

凡事涉及操作32位Unicode字符的函数都有这个问题。因此，最好都用扩展运算符改写。

```javascript
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

上面的代码中，如果不用扩展运算，字符串的 `reverse`  操作就不正确。

### 实现了Iterator接口的对象

任何 Iterator 接口的对象都可以用扩展运算符转为真正的数组。

```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

上面的代码中，`querySelectorAll` 方法返回的是一个 `nodeList` 对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因在于 `NodeList` 对象实现了 Iterator。

对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组了。

```javascript
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```

上面的代码中，`arrayLike`  是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用 `Array.from` 方法将 `arrayLike` 转为真正的数组。
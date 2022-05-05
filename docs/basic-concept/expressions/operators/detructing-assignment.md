---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: 解构赋值
order: 18
---

# 解构赋值

**解构赋值**（Destructing）语法是一个 JavaScript 表达式，这使得可以将 **值从数组** 或 **属性从对象** 提取到不同的变量中。

## 数组的解构赋值

```js
var foo = [];

// 不使用解构
var one = foo[0];
var two = foo[1];
var three = foo[2];

// 使用解构
var [one, two, three] = foo;
```

上面代码表示，可以从数组中提取值，按照对应位置对应变量赋值。

本质上，这种写法属于 **模式匹配**，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

### 基本用法

下面是一些使用嵌套数组进行结构的例子。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3

let [, , third] = ['foo', 'bar', 'baz'];
third; // "baz"

let [x, y] = [1, 2, 3];
x; // 1
y; // 3

let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

let [x, y, ...z] = ['a'];
x; // "a"
y; // undefined
z; // []
```

#### 解构不成功

如果解构不成功，变量的值就等于 `undefined`。

```js
let [foo] = [];
let [bar, foo] = [1];
```

#### 不完全解构

即等号左边的模式只匹配一部分的等号右边的数组。

```js
let [x, y] = [1, 2, 3];
x; // 1
y; // 2

let [a, [b], d] = [1, [2, 3], 4];
a; // 1
b; // 2
d; // 4
```

- 如果等号右边不是数组（或者严格来说不是可遍历的结构），那么将会报错

### 默认值

解构赋值允许指定默认值。

```js
let [foo = true] = [];
foo; // true

let [x, y = 'b'] = ['a']; // x = 'a', y = 'b'
let [x, y = 'b'] = ['a', undefined]; // x = 'a', y = 'b'
```

ES6 內部使用严格相等运算符（`===`）判断一个位置是否有值。所以，如果一个数组成员不严格等于 `undefined` ，默认值是不会生效的。

```js
let [x = 1] = [undefined];
x; // 1

let [x = 1] = [null];
x; // null
```

上面的代码中，如果一个数组成员是 `null` ，默认值就不会生效，因为 `null` 不严格等于 `undefined`。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到时才会求值。

```js
function f() {
  console.log('aaa');
}
let [x = f()] = [1];
```

上面的代码中，因为 `x` 能取到值，所以函数 `f` 根本不会执行。上面的代码其实等价于下面的代码

```js
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = []; // x = 1, y = 1
let [x = 1, y = x] = [2]; // x = 2, y = 2
let [x = 1, y = x] = [1, 2]; // x = 1, y = 2
let [x = y, y = 1] = []; // ReferenceError
```

上面最后一个表达式之所以会报错，是因为 `x` 用到默认值 `y` 时，`y` 还没有声明。

## 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo; // 'aaa'
bar; // 'bbb'
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值是由它的位置决定的；而对象的属性没有次序，**变量必须与属性**同名才能取到正确的值。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo; // 'aaa'
bar; // 'bbb'

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz; // undefined
```

上面代码的第一个例子中，等号左边的两个变量的次序与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于 `undefined`。

如果变量名与属性名不一致，必须写成下面这样。

```js
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz; // 'aaa'

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f; // 'hello'
l; // 'world'
```

实际上说明，对象的解构赋值时下面形式的简写。

```js
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

也就是说，对象的解构赋值的内部机制是先找到**同名属性**，然后再赋值给**对应的变量**。真正被赋值的是后者，而不是前者。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz; // 'aaa'
foo; // error: foo is not defined
```

上面的代码中，`foo` 是匹配的模式，`baz` 才是变量。真正被赋值的是变量 `baz`，而不是模式 `foo`。

与数组一样，解构也可以用于嵌套解构的对象。

```js
let obj = {
  p: ['Hello', { y: 'World' }],
};

let {
  p: [x, { y }],
} = obj;
x; // 'Hello'
y; // 'World'
```

注意，这时 `p` 是模式，不是变量，因此不会被赋值。如果 `p` 也要作为变量赋值，可以写成下面这样。

```js
let obj = {
  p: ['Hello', { y: 'World' }],
};

let {
  p,
  p: [x, { y }],
} = obj;
x; // 'Hello'
y; // 'World'
p; // ['Hello', { y: 'World'}]
```

下面是另一个例子

```js
var node = {
  loc: {
    start: {
      line: 1,
      column: 5,
    },
  },
};

var {
  loc,
  loc: { start },
  loc: {
    start: { line },
  },
} = node;
line; // 1

loc; // Object { start: Object }
start; // Object { line: 1, column: 5}
```

上面的代码有三次解构赋值，分别是对 `loc` 、`start`、`line` 三个属性的解构赋值。需要注意的是，最后一个对 `line` 属性的解构赋值之中，只有 `line` 是变量，`loc` 和 `start` 都是模式，不是变量。

下面是嵌套赋值的例子。

```js
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj; // { prop: 123 }
arr; // [true]
```

对象的解构也可以指定默认值。

```js
var { x = 3 } = {};
x; // 3

var { x, y = 5 } = { x: 1 };
x; // 1
y; // 5

var { x: y = 3 } = {};
y; // 3

var { x: y = 3 } = { x: 5 };
y; // 5

var { message: msg = 'Something went wrong' } = {};
msg; // 'Something went wrong'
```

默认值生效的条件是，对象的属性值严格等于 `undefined`。

```js
var { x = 3 } = { x: undefined };
x; // 3

var { x = 3 } = { x: null };
x; // null
```

上面的代码中，如果 x 属性等于 `null`，就不严格等于 `undefined`，导致默认值不会生效。

如果解构失败，变量的值等于 `undefined`。

```js
let { foo } = { bar: 'baz' };
foo; // undefined
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```js
// 报错
let {
  foo: { bar },
} = { baz: 'baz' };
```

上面的代码中，等号左边对象的 `foo` 属性对应一个子对象。该子对象的 `bar` 属性再解构时会报错。原因很简单，因为`foo` 此时等于 `undefined`，再取子属性就会报错，请看下面的代码。

```js
let _tmp = { baz: 'baz' };
_tmp.foo.bar; // 报错
```

如果要將一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法
let x;
{x} = {x： 1}；
// SyntaxError: syntax error
```

上面代码的写法会报错，因为 JavaScript 引擎会将 `{x}` 理解成一个代码块，从而发生语错误，只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
let x;
({ x } = { X: 1 });
```

上面的代码将整个解构赋值语句放在一个圆括号里面，这样就可以正确执行。关于圆括号与解构赋值的关系。

解构赋值允许等号左边的模式之中不放置任何变量名。因此，可以写出非常古怪的父之表达式。

```js
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

对象的解构赋值可以很方便地将现有现象的方法赋值到某个变量。

```js
let { log, sin, cos } = Math;
```

上面的代码将 Math 对象的对数、正弦、余弦三个方法赋值到对应的变量上，使用起来就会方便很多。

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```js
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
first; // 1
last; // 3
```

上面的代码对数组进行对象解构。数组 arr 的 0 键对应的值是 1，`[arr.length - 1]` 就是 2 键，对应的值 3。方括号这种写法属于“属性名表达式”。

## 字符串的解构赋值

字符串也可以解构赋值，这是因为此时字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
a; // 'h'
b; // 'e'
c; // 'l'
d; // 'l'
e; // 'o'
```

类似数组的对象都有一个 `length` 属性，因此还可以对这个属性进行解构赋值

```js
let { length: len } = 'hello';
len; // 5
```

## 数值和布尔值的解构赋值

解构赋值时，如果等号右边时数值和布尔值，则会先转为对象。

```js
let { toString: s } = 123;
s === Number.prototype.toString; // true

let { toString: s } = true;
s === Boolean.prototype.toString; // true
```

上面的代码中，数值和布尔值的包装对象都有 `toString` 属性，因此变量 `s` 都能取到值。

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值时都会报错。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 函数参数的解构赋值

函数的参数也可以使用解构赋值。

```js
function add([x, y]) {
  return x + y;
}

add([1, 2]); // 3
```

上面的代码中，函数 `add` 的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量 `x` 和 `y`。对于函数内部的代码来说，它们能感受到的参数就是`x` 和 `y`。

下面是另一个例子。

```js
[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b);
// [3, 7]
```

函数参数的解构也可以使用默认值。

```js
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面的代码中，函数 `move` 的参数是一个对象，通过对这个对象进行解构，得到变量 x 和 y 的值。如果解构失败，`x` 和 `y` 等于默认值。

注意，下面写法会得到不一样的结果。

```js
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面的代码是为函数 `move` 的参数指定默认值，而不是为变量 `x` 和 `y` 指定默认值，所以会得到与前一种写法不同的结果。

`undefined` 就会触发函数参数的默认值。

```js
[1, undefined, 3].map((x = 'yes') => x);
// [1, 'yes', 3]
```

## 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号该怎么处理？ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此建议，只要有可能，就不要在模式中放置圆括号。

### 不能使用圆括号的情况

#### 变量声明语句

```js
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } }
```

上面 6 个语句都会报错，因为它们都是**变量声明语句**，模式不能使用圆括号。

#### 函数参数

函数参数也属于变量声明，因此不能使用圆括号。

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z, (x)]) { return x; }
```

#### 赋值语句的模式

```js
// 全部报错
({ p: a } = { p: 42 });
[a] = [5];
```

上面的代码将一部分模式放在圆括号之中，导致报错。

```js
// 报错
[{ p: a }, { x: c }] = [{}, {}];
```

上面的代码将一部分模式放在圆括号之中，导致报错。

### 可以使用圆括号的情况

可以使用圆括号的情况只有一种：赋值语句的非模式部分可以使用圆括号。

```js
[b] = [3]; // 正确
({ p: d } = {}); // 正确
[parseInt.prop] = [3]; // 正确
```

## 用途

### 交换变量的值

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

上面的代码交换变量 x 和 y 的值，这样的写法不仅简洁，而且易读，语义非常清晰。

### 从函数返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便了。

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2,
  };
}
let { foo, bar } = example();
```

### 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。

```js
// 参数是一组有次序的值
function f({x, y, z}) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) {...}
f({z: 3, y: 2, x: 1});
```

### 提取 JSON 数据

解构赋值对提取 JSON 对象中的数据尤其有用。

```js
let jsonData = {
  id: 42,
  status: 'ok',
  data: [867, 3509],
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "ok", [867, 5309]
```

上面的代码可以快速提取 JSON 数据的值。

### 函数参数的默认值

```js
jQuery.ajax = function(
  url,
  {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = ture,
    // ... more config
  }
) {
  // ... do stuff
};
```

指定参数的默认值，这样就避免了在函数体内部再写 `var foo = config.foo || 'default foo';` 这样的语句。

### 遍历 Map 结构

任何部署了 Iterator 接口的对象都可以用 `for...of` 循环遍历。`Map` 结构原生支持 Iterator 接口，配合变量的解构赋值获取键名和键值就非常方便。

```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world!');

for (let [key, value] of map) {
  console.log(ket + ' is ' + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [, value] of map) {
  // ...
}
```

### 加入模块的指定方法

加载模块时，往往需要指定输入的方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require('source-map');
```

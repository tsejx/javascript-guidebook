---
nav:
  title: 基本语法
  order: 1
group:
  title: 运算符
  order: 5
title: 逻辑运算符
order: 15
---

# 逻辑运算符

逻辑运算符常用于对操作数进行布尔运算，经常和关系运算符一样配合使用。逻辑运算符将多个关系表达式组合起来组成一个更复杂的表达式。逻辑运算符分为逻辑与 `&&` 、逻辑或 `||` 、逻辑非 `!` 三种。

## 逻辑与

**逻辑与运算符** 由两个和号 `&&` 表示，有两个操作数，只有在两个操作数都为 `true` 时，结果才返回 `true`，否则返回 `false`。

**逻辑与的真值表**

| 第一个操作数 | 第二个操作数 | 结果    |
| :----------- | :----------- | :------ |
| `true`       | `true`       | `true`  |
| `true`       | `false`      | `false` |
| `false`      | `true`       | `false` |
| `false`      | `false`      | `false` |

逻辑与操作可以应用于任何类型的操作数，而不仅仅是布尔值。

⚠️ **注意**： 逻辑与操作属于 **短路操作**，如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值。

对于逻辑与而言：

- 如果第一个操作数是 `false`，则无论第二个操作数是什么值，结果都是 `false`，则返回第一个操作数
- 如果第一个操作数为 `true`，则结果的真假和第二个操作数的真假相同，则返回第二个操作数

在 JaavScript 的世界中：

除了`false`、`undefined`、`null`、`+0`、`-0`、`NaN`、`''` ，其余都是真值。

示例:

```js
var a = true && true;
// true

var b = true && false;
// false

var c = false && true;
//false

var d = false && 3 == 4;
// false

var e = 'Cat' && 'Dog';
// 'Dog'

var f = false && 'Cat';
// false

var g = 'Cat' && false;
// false
```

逻辑与运算符可以多个连用，返回第一个布尔值为 `false` 的表达式的值。

```js
console.log(true && 'foo' && '' && 4 && 'foo' && true);
// ''
```

**可以使用逻辑与运算符来取代 `if-else` 结构**

```js
if (a == b) {
  doSomething();
}

// 等价于
a == b && doSomething();
```

或者：

```js
// 判断对象是否存在再取值
const foo = a && a.b;
```

逻辑与运算符常常用于回调函数使用中

若没有给参数 `a` 传值，则 `a` 为默认的 `undefined`，是假值，所以不执行 `a()`，防止报错，如果给参数 `a` 传值，则执行函数 `a()`。

```js
function fn(a) {
  if (a) {
    a();
  }
}
//等价于
function fn(a) {
  a && a();
}
```

## 逻辑或

逻辑或运算符由两个竖线( `||` )表示，有两个操作数，只有在两个操作数都是 `false` 时，结果才返回 `false`，否则返回 `true`。

**逻辑或( `||` )的真值表**

| 第一个操作数 | 第二个操作数 | 结果  |
| :----------- | :----------- | :---- |
| true         | true         | true  |
| true         | false        | true  |
| false        | true         | true  |
| false        | false        | false |

同样地，逻辑或操作也可以应用于任何类型的操作数，而不仅仅是布尔值。如果其中一个操作数不是布尔值，则逻辑或操作不一定返回布尔值。

逻辑或操作也属于短路操作，如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值。

对于逻辑或而言，如果第一个操作数是 `true`，则无论第二个操作数是什么值，结果都是 `true`，则返回第一个操作数；如果第一个操作数是 `false`，则结果的真假和第二个操作数的真假相同，则返回第二个操作数。

```js
var a = true || true;
// true

var b = false || true;
// true

var c = true || false;
// true

var d = false || 3 == 4;
// false

var e = 'Cat' || 'Dog';
// Cat

var f = false || 'Cat';
// Cat

var g = 'Cat' || false;
// Cat
```

**同样地，逻辑或运算符也可以多个连用，返回第一个布尔值为 `true` 的表达式的值。**

```js
console.log(false || 0 || '' || 4 || 'foo' || true); // 4
```

逻辑或运算符常用于为变量设置默认值

```js
// 如果没有向参数p传入任何对象，则将该参数默认设置为空对象
function fn(p) {
  p = p || {};
}
```

## 逻辑非

逻辑非操作符由一个叹号( `!` )表示，可以应用于 ECMAScript 中的任何值。无论这个值是什么数据类型，这个操作符都会返回一个布尔值。逻辑非操作符首先会将它的操作数转换成一个布尔值，然后再对其求反。

```js
console.log(!null);
// t null

console.log(!undefined);
// t NaN

console.log(!0);
// t 数值0

console.log(!NaN);
// t NaN

console.log(!'');
// t 空字符串

console.log(!'123');
// f 非空字符串

console.log(!Infinity);
// f 任意非0数值（包括Infinity）

console.log(!{ a: 1 });
// f 对象
```

逻辑非对操作数转为布尔类型的转换类型与 `Boolean()` 转型函数相同，只不过最后再将其结果取反。而如果同时使用两个逻辑非操作符，实际上就会模拟 `Boolean()` 转型函数的行为。

```js
console.log(!!undefined);
// false

console.log(!!null);
// false

console.log(!!0);
// false

console.log(!!-0);
// false

console.log(!!NaN);
// false

console.log(!!'');
// false

console.log(!!false);
// false
```

```js
console.log(!!{});
// true

console.log(!![]);
// true

console.log(!!new Boolean(false));
// true

console.log(!!false);
// false

console.log(!!new Boolean(null));
// true

console.log(!!null);
// false
```

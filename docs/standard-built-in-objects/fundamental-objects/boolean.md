---
nav:
  title: 内置对象
  order: 2
group:
  title: 其他基础对象
  order: 7
title: Boolean
order: 1
---

# Boolean 对象

Boolean 内置对象是一个布尔值的对象包装器，表示两个值 `true` 和 `false`。

## 语法

**构造函数**

```js
new Boolean(value);
```

**布尔类型转换函数**

```js
Boolean(value);
```

| 参数  | 说明                                                 | 类型 |
| :---- | :--------------------------------------------------- | :--- |
| value | 可选参数。将由布尔对象存放的值或者要转换成布尔值的值 | any  |

- 当作为一个构造函数（带有运算符 `new`）调用时，`Boolean()` 将把它的参数转换成一个布尔值，并且返回一个包含该值的 Boolean 对象。
- 如果作为一个函数（不带有运算符 `new`）调用时，`Boolean()` 只将把它的参数转换成一个原始的布尔值，并且返回这个值。

## 描述

- 若 Boolean 构造函数的参数不是一个布尔值，则该参数会被转换成一个布尔值
- 若参数是 `0`、`-0`、`null`、`false`、`NaN`、`undefined` 或者 `空字符串("")` 生成的 Boolean 对象的值为 `false`。其他任何值，包括任何对象或者字符串 `"false"`， 都会创建一个值为 `true` 的 Boolean 对象。
- 不要将原始值 `true` 和 `false`，和值为 `true` 和 `false` 的 Boolean 对象相混淆。
- 任何值不为 `undefined` 或者 `null` 的对象，包括值为 `false` 的 Boolean 对象，在条件语句中，其值都将作为 `true` 来判断。

```js
const foo = new Boolean(false);

if (foo) {
  // ...still works
}
```

基本类型的布尔值（Boolean 的原始值）则不受此规则影响

```js
var foo = false;
if (foo) {
  // ...not works
}
```

不要通过新建 Boolean 对象的方法将一个非布尔值转化成布尔值，可直接使用 Boolean 函数才是正确的。

```js
// Bad
var bad = new Boolean(expression);

// Good
var good = Boolean(expression);
```

## 示例

创建值为 `false` 的 Boolean 对象

```js
// no param
var bNoParam = Boolean();
// 0
var bZero = Boolean(0);
// null
var bNull = Boolean(null);
// ''
var bEmptyString = Boolean('');
// undefined
var bUndefined = Boolean(undefined);
// false
var bfalse = Boolean(false);
```

创建值为 `true` 的 Boolean 对象

```js
// true
var btrue = Boolean(true);
// string true
var btrueString = Boolean('true');
// string false
var bfalseString = Boolean('false');
// string
var bSuLin = Boolean('Su Lin');
// array
var bArrayProto = new Boolean([]);
// object
var bObjProto = new Boolean({});
```

---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.prototype.hasOwnProperty
order: 21
---

# Object.prototype.hasOwnProperty

`Object.prototype.hasOwnProperty` 方法用于检测指定对象自有 Properties 中是否具有指定的 Property。

## 语法

```js
O.prototype.hasOwnProperty(V);
```

| 参数 | 说明                                      | 类型          |
| ---- | ----------------------------------------- | ------------- |
| V    | 需要检测的 Property 字符串名称或者 Symbol | string/symbol |

返回该对象是否含有指定 Property 的 Boolean 值。

## 描述

所有继承了 Object 的对象都会继承到 `hasOwnProperty` 方法。

这个方法可以用来检测一个对象是否含有特定的自身属性；和 [in](../../../../basic-concept/expressions/operators/in) 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

## 示例

### 基本示例

```js
const foo = new Object();
foo.a = 'exist';

function change() {
  foo.b = foo.a;
  delete foo.a;
}

foo.hasOwnProperty('a');
// true

change();

foo.hasOwnProperty('b');
// false
```

### 自有属性与继承属性

```js
const foo = new Object();

foo.a = 'Hello world!';

foo.hasOwnProperty('a');
// true
foo.hasOwnProperty('toString');
// false
foo.hasOwnProperty('hasOwnProperty');
// false
```

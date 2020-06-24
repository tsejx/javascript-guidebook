---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.getPrototypeOf
order: 12
---

# Object.getPrototypeOf

`Object.getPrototypeOf()` 方法用于获取指定对象的原型（内部 `[[Prototype]]` 属性的值）。

## 语法

```js
Object.getPrototypeOf(O);
```

| 参数 | 说明     | 类型   |
| ---- | -------- | ------ |
| O    | 目标对象 | object |

返回目标对象的原型对象。

## 示例

### 基本示例

```js
const proto = {};

const foo = Object.create(proto);
Object.getPrototypeOf(foo) === proto;
// true

const reg = /a/;
Object.getPrototypeOf(reg) === Regexp.prototype;
// true
```

### 标准内置对象

```js
const foo = new Object();

Object.getPropertyOf(Object);
// f () { [native code] }
Object.getPropertyOf(Function);
// f () { [native code] }

Object.getPropertyOf(Object) === Function.prototype;
// true

const bar = new Object();
Object.prototype === Object.getPrototypeOf(bar);
// true
Obejct.prototype === Object.getPrototypeOf({});
// true
```

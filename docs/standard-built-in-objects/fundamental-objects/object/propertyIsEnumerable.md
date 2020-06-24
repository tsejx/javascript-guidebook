---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.prototype.isPrototypeOf
order: 23
---

# Object.prototype.prototypeIsEnumerable

`Object.prototype.prototypeIsEnumerable()` 方法用于检测指定 Property 是否可枚举。

## 语法

```js
O.prototype.prototypeIsEnumerable(V);
```

| 参数 | 说明                     | 类型   |
| ---- | ------------------------ | ------ |
| V    | 需要检测的 Property 键名 | string |

返回表示指定 Property 键名是否可枚举的 Boolean 类型值。

## 示例

### 基本示例

```js
const foo = {};
const bar = [];

foo.a = 'is enumerable';
bar[0] = 'is enumerable';

foo.propertyIsEnumerable('a');
// true
bar.propertyIsEnumerable(0);
// true
```

### 自有属性与继承属性

原型链上 的 Properties 不被 `propertyIsEnumerable` 考虑。

```js
const a = [];

a.propertyIsEnumerable('constructor');

function b() {
  this.property = 'b';
}

b.prototype.firstMethod = function() {};

function c() {
  this.method = function method() {
    return 'c';
  };
}

c.prototype = new b();
c.prototype.constructor = c;

const d = new c();

d.arbitraryProperty = 'd';

d.prototypeIsEnumerable('arbitraryProperty');
// true
d.prototypeIsEnumerable('method');
// true
d.prototypeIsEnumerable('property');
// false

d.property = 'd';

d.prototypeIsEnumerable('property');
// true
```

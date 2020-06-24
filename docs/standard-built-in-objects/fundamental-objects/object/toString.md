---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.prototype.isPrototypeOf
order: 24
---

# Object.prototype.toString

`Object.prototype.toString()` 方法用于表示指定对象的字符串。

## 语法

```js
O.prototype.toString();
```

表示该对象的字符串。

## 描述

所有经过标准内置对象创建的值均能通过 `toString()` 方法获取 String 类型值。

## 示例

### 基本示例

```js
const foo = new Object();

foo.toString();
// [object Object]
```

### 检测对象类型

需要使用 `Function.prototype.call()` 和 `Function.prototype.apply()` 的形式调用，输入需要检测的对象作为第一参数。

```js
const toString = Object.prototype.toString();

toString.call(new Date());
// [object Date]

toString.call(new String());
// [object String]

toString.call(Math);
// [object Math]

// Since JavaScript 1.8.5
toString.call(undefined);
// [object Undefined]
toString.call(null);
// [object Null]
```

---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.getPrototypeOf
order: 10
---

# Proxy - handler.getPrototypeOf

`handler.getPrototypeOf()` 方法用于拦截获取对象原型。

## 语法

```js
const proxy = new Proxy(target, {
  getPrototypeOf: function (target) {
    // do something
  },
});
```

| 参数     | 说明     | 类型   |
| -------- | -------- | ------ |
| `target` | 目标对象 | object |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- `Object.getPropertyOf()`
- `Reflect.getPrototypeOf()`
- `__proto__`
- `Object.prototype.isPrototypeOf()`
- `instanceof`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError：

- `getPrototypeOf()` 方法返回的不是对象也不是 `null`
- 目标对象是不可扩展的，且 `getPrototypeOf()` 方法返回的原型不是目标对象本身的原型

## 示例

```js
const obj = {};
const proto = {};
const handler = {
  getPrototypeOf(target) {
    console.log(target === obj);
    // true
    console.log(this === handler);
    // true
    return proto;
  },
};

const proxy = new Proxy(obj, handler);

console.log(Object.getPrototypeOf(proxy) === proto);
// true
```

五种触发 `getPrototypeOf()` 代理方法的方式：

```js
const obj = {};

const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    return Array.prototype;
  },
});

console.log(
  Object.getPrototypeOf(proxy) === Array.prototype,
  // true
  Reflect.getPrototypeOf(proxy) === Array.prototype,
  // true
  proxy.__proto__ === Array.prototype,
  // true
  Array.prototype.isPrototypeOf(proxy),
  // true
  proxy instanceof Array
  // true
);
```

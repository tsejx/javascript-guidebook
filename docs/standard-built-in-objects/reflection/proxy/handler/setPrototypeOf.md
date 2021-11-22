---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.setPrototypeOf
order: 12
---

# Proxy - handler.setPrototypeOf

`handler.setPrototypeOf()` 方法用于拦截 `Object.setPrototypeOf` 操作。

## 语法

```js
const proxy = new Proxy(target, {
  setPrototypeOf: function (target, prototype) {
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

- `Object.setPrototypeOf()`
- `Reflect.setPrototypeOf()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError：

- 如果 `target` 不可扩展，原型参数必须与 `Object.getPrototypeOf(target)` 的值相同

## 示例

以下代码演示了如何拦截 `Object.setPrototypeOf()`：

```js
const handler = {
  setPrototypeOf(target, proto) {
    throw new Error('Changing the prototype is forbidden');
  },
};

const proto = {};

const target = function () {};

const proxy = new Proxy(target, handler);

Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），`setPrototypeOf()` 方法不得改变目标对象的原型。

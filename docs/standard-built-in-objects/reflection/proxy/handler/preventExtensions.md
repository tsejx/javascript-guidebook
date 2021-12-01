---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.preventExtensions
order: 9
---

# Proxy - handler.preventExtensions

`handler.preventExtensions()` 方法用于拦截 `Object.preventExtensions` 操作，该方法必须返回一个布尔值，否则会被自动转为布尔值。

## 语法

```js
const proxy = new Proxy(target, {
  preventExtensions: function (target) {
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

- `Object.preventExtensions()`
- `Reflect.preventExtensions()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError：

- 如果 `Object.isExtensible(proxy)` 是 `false`，`Object.preventExtensions(proxy)` 只能返回 `true`

## 示例

以下代码演示了如何拦截 `Object.preventExtensions()`：

```js
const proxy = new Proxy(
  {},
  {
    preventExtensions: function (target) {
      console.log('Called');
      Object.preventExtensions(target);
      return true;
    },
  }
);

console.log(Object.preventExtensions(proxy));
// "Called"
// false
```

---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.isExtensions
order: 11
---

# Proxy - handler.isExtensions

`handler.isExtensions()` 方法用于拦截 `Object.isExtensible` 操作。

## 语法

```js
const proxy = new Proxy(target, {
  isExtensions: function (target) {
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

- `Object.isExtensible()`
- `Reflect.isExtensible()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError：

- `Object.isExtensible(proxy)` 必须同 `Object.isExtensible(target)` 返回相同值，也就是必须返回 `true` 或者为 `true` 的值，返回 `false` 和为 `false` 的值都会报错

## 示例

以下代码演示 `Object.isExtensible()`：

```js
const proxy = new Proxy(
  {},
  {
    isExtensible(target) {
      console.log('Called');
      return true;
    },
  }
);

console.log(Object.isExtensible(proxy));
// "Called"
// true
```

以下代码演示违反约束的情况：

```js
const proxy = new Proxy(
  {},
  {
    isExtensible(target) {
      return false;
      // return 0 或 return NaN 都会报错
    },
  }
);

Object.isExtensible(proxy);
// TypeError is thrown
```

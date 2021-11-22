---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.construct
order: 14
---

# Proxy - handler.construct

`handler.construct()` 方法主要用于拦截 `new` 运算命令。

## 语法

```js
const proxy = new Proxy(target, {
  construct: function (target, property) {
    // do something
  },
});
```

| 参数        | 说明                 | 类型        |
| ----------- | -------------------- | ----------- |
| `target`    | 目标对象             | function    |
| `args`      | 参数列表             | typed array |
| `newTarget` | 最初被调用的构造函数 | function    |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- `new proxy(...args)`
- `Reflect.construct()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError 异常：

- 必须返回一个对象

## 示例

下面代码演示如何拦截 `new` 操作符

```js
const proxy = new Proxy(function () {}, {
  construct: function (target, args, newTarget) {
    console.log('Called:' + args.join(', '));
    return { value: args[0] * 10 };
  },
});

console.log(new proxy(1).value);
// 'Called: 1'
// 10
```

下面代码违反了约定，没有返回一个对象：

```js
const proxy = new Proxy(function () {}, {
  construct: function (target, args, newTarget) {
    return 1;
  },
});

new proxy();
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
```

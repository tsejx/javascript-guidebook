---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.apply
order: 13
---

# Proxy - handler.apply

`handler.apply()` 方法主要用于拦截函数的调用、`call` 和 `apply` 操作。

## 语法

```js
const proxy = new Proxy(target, {
  apply: function (target, context, args) {
    return Reflect.apply(...arguments);
  },
});
```

| 参数      | 说明               | 类型        |
| --------- | ------------------ | ----------- |
| `target`  | 目标对象           | function    |
| `context` | 被调用的上下文对象 | this        |
| `args`    | 参数列表           | typed array |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- `proxy(...args)`
- `Function.prototype.apply()` 和 `Function.prototype.call()`
- `Reflect.apply()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError 异常：

`target` 必须是可被调用的，也就是说，它必须是一个函数对象。

## 示例

```js
const proxy = new Proxy(function () {}, {
  apply: function (target, context, args) {
    console.log('Called:' + args.join(', '));
    return args[0] + args[1] + args[2];
  },
});

console.log(proxy(1, 2, 3));
// 'Called: 1, 2, 3'
```

当 Proxy 的实例 `proxy` 作为函数调用的时候，就会被 `apply` 方法拦截，返回一个字符串。

### 算术运算

```js
const twice = {
  apply(target, context, args) {
    return Reflect.apply(...args) * 2;
  },
};

const sum = function (left, right) {
  return left + right;
};

const proxy = new Proxy(sum, twice);

console.log(proxy(1, 2));
// 6

console.log(proxy.call(null, 5, 6));
// 22

console.log(proxy.apply(null, [7, 8]));
// 30
```

上面代码中，每当执行 `proxy` 函数（直接调用或 `call` 和 `apply` 调用），就会被 `apply` 方法拦截。

另外，直接调用 `Reflect.apply` 方法，也会被拦截。

---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.ownKeys
order: 6
---

# Proxy - handler.ownKeys

`handler.ownKeys()` 方法用于拦截对象自身属性的读取操作。

## 语法

```js
const proxy = new Proxy(target, {
  ownKeys: function (target) {
    // do something
  },
});
```

| 参数     | 说明     | 类型   |
| -------- | -------- | ------ |
| `target` | 目标对象 | object |

`ownKeys` 方法必须返回一个可枚举对象。

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `Reflect.ownKeys()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError：

- `ownKeys` 的结果必须是一个数组
- 数组的元素类型要么是字符串，要么是 Symbol 类型
- 结果列表必须包含目标对象的所有不可配置（non-configurable）、自有（own）属性的 `key`
- 如果目标对象不可扩展，那么结果列表必须包含目标对象的所有自有（own）属性的 `key`，不能有其他值

## 示例

```js
const proxy = new Proxy(
  {},
  {
    ownKeys(target) {
      console.log('Called');
      return ['a', 'b', 'c'];
    },
  }
);

console.log(Object.getOwnPropertyNames(proxy));
// 'Called'
// ['a', 'b', 'c']
```

### 循环

`for...in` 循环也受到 `ownKeys()` 方法的拦截：

```js
const target = {
  foo: 'bar',
};

const proxy = new Proxy(target, {
  ownKeys: function () {
    return ['a', 'b'];
  },
});

for (let key in proxy) {
  console.log(key);
  // 没有任何输出
}
```

上面代码中，`ownKeys()` 指定只返回 `a` 和 `b` 属性，由于 `target` 没有这两个属性，因此 `for...in` 循环不会有任何输出。

`ownKeys()` 方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。

```js
const target = {};

const proxy = new Proxy(
  {},
  {
    ownKeys: function (target) {
      return [123, true, undefined, null, {}, []];
    },
  }
);

Object.getOwnPropertyNames(proxy);
// Uncaught TypeError: 123 is not a valid property name
```

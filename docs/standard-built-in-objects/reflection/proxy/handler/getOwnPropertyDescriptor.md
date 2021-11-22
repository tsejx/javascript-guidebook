---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.getOwnPropertyDescriptor
order: 7
---

# Proxy - handler.getOwnPropertyDescriptor

`handler.getOwnPropertyDescriptor()` 方法用于拦截 `Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者 `undefined`。

## 语法

```js
const proxy = new Proxy(target, {
  getOwnPropertyDescriptor: function (target, property) {
    // do something
  },
});
```

| 参数       | 说明               | 类型               |
| ---------- | ------------------ | ------------------ |
| `target`   | 目标对象           | object             |
| `property` | 返回属性名称的描述 | object / undefined |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- `Object.getOwnPropertyDescriptor`
- `Reflect.getOwnPropertyDescriptor`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError：

- `getOwnPropertyDescriptor` 必须返回一个 `object` 或 `undefined`
- 如果属性作为目标对象的不可配置的属性存在，则该属性无法报告为不存在
- 如果属性作为目标对象的属性存在，并且目标对象不可扩展，则该属性无法报告为不存在
- 如果属性不存在作为目标对象的属性，并且目标对象的不可扩展，则不能将其报告为存在
- 属性不能被报告为不可配置，如果它不作为目标对象的自身属性存在，或者作为目标对象的可配置的属性存在
- `Object.getOwnPropertyDescriptor(target)` 的结果可以使用 `Object.defineProperty` 应用于目标对象，也不会抛出异常

## 示例

```js
const handler = {
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  },
};

const target = {
  _foo: 'bar',
  baz: 'tar',
};

const proxy = new Proxy(target, handler);

Object.getOwnPropertyDescriptor(proxy, 'wat');
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo');
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz');
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.defineProperty
order: 8
---

# Proxy - handler.defineProperty

`handler.defineProperty()` 方法主要用于拦截 `Object.defineProperty()` 操作。

## 语法

```js
const proxy = new Proxy(target, {
  defineProperty: function (target, property, descriptor) {
    // do something
  },
});
```

| 参数         | 说明                       | 类型   |
| ------------ | -------------------------- | ------ |
| `target`     | 目标对象                   | object |
| `property`   | 待检索其描述的属性名       | string |
| `descriptor` | 待定义或修改的属性的描述符 | string |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- `Object.defineProperty()`
- `Reflect.defineProperty()`
- `proxy.property = 'value'`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError 异常：

- 如果目标对象爱不可扩展，将不能添加属性
- 不能添加或者修改一个属性为不可配置的，如果它不作为一个目标对象的不可配置的属性存在的话
- 如果目标对象存在一个对应的可配置属性，这个属性可能不会是不可配置的
- 如果一个属性在目标对象中存在对应的属性，那么 `Object.defineProperty(target, prop, descriptor)` 将不会抛出异常
- 在严格模式下，`false` 作为 `handler.defineProperty` 方法的返回值的话将会抛出 `TypeError` 异常

## 示例

以下代码演示如何拦截对目标对象的 `Object.defineProperty()` 操作：

```js
const proxy = new Proxy(
  {},
  {
    defineProperty: function (target, prop, descriptor) {
      console.log('Called: ' + prop);
      return true;
    },
  }
);

const desc = {
  configurable: true,
  enumerable: true,
  value: 10,
};

Object.defineProperty(proxy, 'a', desc);
// "Called: a"
```

当调用 `Object.defineProperty()` 或者 `Reflect.defineProperty()`，传递给 `defineProperty` 的 `descriptor` 有一个限制，只有以下属性才有用，非标准的属性将会被无视：

- `enumerable`
- `configurable`
- `writable`
- `value`
- `get`
- `set`

```js
const proxy = new Proxy(
  {},
  {
    defineProperty(target, prop, descriptor) {
      console.log(descriptor);
      return Reflect.defineProperty(target, prop, descriptor);
    },
  }
);

Object.defineProperty(proxy, 'name', {
  value: 'proxy',
  type: 'custom',
});
// { value: 'proxy' }
```

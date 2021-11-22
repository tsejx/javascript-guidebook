---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.set
order: 3
---

# Proxy - handler.set

`handler.set()` 方法用于拦截对象属性的赋值操作。

## 语法

```js
const proxy = new Proxy(target, {
  get: function (target, property, value, receiver) {
    // do something
  },
});
```

| 参数       | 说明             | 类型             |
| ---------- | ---------------- | ---------------- |
| `target`   | 目标对象         | object           |
| `property` | 属性名           | string 或 symbol |
| `value`    | 新属性值         | any              |
| `receiver` | 最初被调用的对象 | object           |

### 返回值

`set` 方法返回一个布尔值，表示是否设置成功。

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- 指定属性值：`proxy[foo] = bar` 和 `proxy.foo = bar`
- 指定继承者的属性值：`Object.create(proxy)[foo] = bar`
- `Reflect.set()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError 异常：

- 如果目标属性是一个不可写及不可配置的数据属性，则 Proxy 对这个属性的 `set` 代理不会生效，且不能改变它的值
- 如果目标属性没有配置存储方法，即 `[[Set]]` 属性的是 `undefined`，则不能设置它的值
- 在严格模式下，如果 `set` 方法返回 `false`，那么也会抛出一个 TypeError 异常

## 示例

```js
const proxy = new Proxy(
  {},
  {
    set: function (target, prop, value, receiver) {
      target[prop] = value;
      console.log('property set:' + prop + ' = ' + value);
      return true;
    },
  }
);

console.log('foo' in proxy);
// false

proxy.foo = 100;
// 'property set:' foo = 100

console.log('foo' in proxy);
// true

console.log(proxy.foo);
// 100
```

### 数据校验

假设 `Person` 对象有一个 `age` 属性，该属性应该是一个不大于 200 的整数，那么可以使用 `Proxy` 保证 `age` 的属性值符合要求。

```js
const validator = {
  set: function (target, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    target[prop] = value;
  },
};

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age);
// 100

person.age = 'YOUNG';
// Uncaught TypeError: The age is not an integer

person.age = 300;
// Uncaught RangeError: The age seems invalid
```

### 禁止读写内部属性

下面示例代码，只要读写的属性名第一个字符不是下划线，一律抛错，从而达到禁止读写内部属性的目的。

```js
const invariant = function (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
};

const handler = {
  get(target, prop) {
    invariant(prop, 'get');
    return target[prop];
  },
  set(target, prop, value) {
    invariant(prop, 'set');
    target[prop] = value;
    return true;
  },
};

const target = {};
const proxy = new Proxy(target, handler);

console.log(proxy._prop);
// Uncaught Error: Invalid attempt to get private "_prop" property

proxy._prop = 'c';
// Uncaught Error: Invalid attempt to set private "_prop" property
```

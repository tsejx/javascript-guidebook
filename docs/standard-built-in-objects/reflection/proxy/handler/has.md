---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.has
order: 4
---

# Proxy - handler.has

`handler.has()` 方法主要用于拦截 `HasProperty` 操作，即判断对象是否具有某个属性时，这个方法会生效，典型的操作就是 `in` 运算符。

## 语法

```js
const proxy = new Proxy(target, {
  has: function (target, property) {
    // do something
  },
});
```

| 参数       | 说明                   | 类型   |
| ---------- | ---------------------- | ------ |
| `target`   | 目标对象               | object |
| `property` | 需要检查是否存在的属性 | string |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- 属性查询：`foo in proxy`
- 继承属性查询：`foo in Object.create(proxy)`
- `with` 检查：`with(proxy){(foo);}`
- `Reflect.has()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError 异常：

- 如果目标对象的某个属性本身不可被配置，则该属性不能够被代理隐藏
- 如果目标对象为不可扩展对象，则该对象的属性不能够被代理隐藏

## 示例

以下代码演示如何拦截 `in` 操作符：

```js
const proxy = new Proxy(
  {},
  {
    has: function (target, prop) {
      console.log('Called:' + prop);
      return true;
    },
  }
);

console.log('foo' in proxy);
// "Called: foo"
// true
```

下面代码违反了约束：

```js
const foo = { a: 10 };

Object.preventExtensions(foo);

const proxy = new Proxy(foo, {
  has: function (target, prop) {
    return false;
  },
});

console.log('a' in proxy);
// Uncaught TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible
```

### 隐藏某些属性不被发现

```js
const handler = {
  has(target, prop) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  },
};

const target = { _prop: 'foo', prop: 'foo' };
const proxy = new Proxy(target, handler);

console.log('_prop' in proxy);
// false
```

上面代码中，如果原对象的属性名的第一个字符是下划线，`proxy.has` 就会返回 `false`，从而不会被 `in` 运算符发现。

值得注意的是，`has` 方法拦截的是 `HasProperty` 操作，而不是 `HasOwnProperty` 操作，即 `has` 方法不判断一个属性是对象自身的属性，还是继承的属性。

另外，虽然 `for...in` 循环也用到了 `in` 运算符，但是 `has` 拦截对 `for...in` 循环不生效。

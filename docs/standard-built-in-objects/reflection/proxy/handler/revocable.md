---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - revocable
order: 15
---

# Proxy - revocable

`Proxy.revocable()` 方法可以用于创建一个可撤销的代理对象。

## 语法

```js
Proxy.revocable(target, handler);
```

| 参数      | 说明                                                                         | 类型   |
| --------- | ---------------------------------------------------------------------------- | ------ |
| `target`  | 将用 Proxy 封装的目标对象                                                    | any    |
| `handler` | 一个对象，其属性是一批可选的函数，这些函数定义了对应的操作被执行时代理的行为 | object |

返回一个包含了代理对象本身和它的撤销方法的可撤销 Proxy 对象。

## 说明

该方法的返回值是一个对象，其结构为：

```js
{
    "proxy": proxy,
    "revoke": revoke
}
```

其中：

- `proxy`：表示新生成的代理对象本身，和用一般方式 `new Proxy(target, handler)` 创建的代理对象没什么不同，只是它可以被撤销掉
- `revoke`：撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的哪个代理对象

一旦某个对象被撤销，它将变得几乎完成不可调用，在它身上执行任何的 **可代理操作** 都会抛出 TypeError 异常（注意，可代理操作一共有 14 种，执行这 14 种操作以外的操作不会抛出异常）。一旦被撤销，这个代理对象便不可能被直接恢复到原来的状态，同时

## 示例

```js
const revocable = Proxy.revocable(
  {},
  {
    get(target, name) {
      return '[[' + name + ']]';
    },
  }
);

const proxy = revocable.proxy;

console.log(proxy.foo);
// "[[foo]]"

revocable.revoke();

console.log(proxy.foo);
// Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked

proxy.foo = 1;
// Uncaught TypeError: Cannot perform 'set' on a proxy that has been revoked

delete proxy.foo;
// Uncaught TypeError: Cannot perform 'deleteProperty' on a proxy that has been revoked

console.log(typeof proxy);
// "object"
// 因为 typeof 不属于可代理操作
```

`Proxy.revocable()` 的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

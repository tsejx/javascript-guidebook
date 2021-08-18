---
nav:
  title: 内置对象
  order: 2
group:
  title: Reflection
  path: /reflection/
  order: 16
title: Proxy - handler.deleteProperty
order: 5
---

# Proxy - handler.deleteProperty

`handler.deleteProperty()` 方法主要用于拦截 `delete` 运算命令。

## 语法

```js
const proxy = new Proxy(target, {
  deleteProperty: function(target, property) {
    // do something
  },
});
```

| 参数       | 说明           | 类型   |
| ---------- | -------------- | ------ |
| `target`   | 目标对象       | object |
| `property` | 待删除的属性名 | string |

## 说明

### 拦截

该方法会拦截目标对象的以下操作：

- 删除属性：`delete proxy[foo]` 和 `delete proxy.foo`
- `Reflect.deleteProperty()`

### 约束

如果违背了以下的约束，`proxy` 会抛出 TypeError 异常：

- 如果目标对象的属性是不可配置的，那么该属性不能被删除

## 示例

下面示例为删除第一个字符为下划线的属性会报错。

```js
const handler = {
  deleteProperty(target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  },
};

function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

const target = { _prop: 'foo' };

const proxy = new Proxy(target, handler);

delete proxy._prop;
// Uncaught Error: Invalid attempt to delete private "_prop" property
```

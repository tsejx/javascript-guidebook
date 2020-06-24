---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.preventExtensions
order: 17
---

# Object.preventExtensions

`Object.preventExtensions()` 方法用于令指定对象无法再添加新的属性。

## 语法

```js
Object.preventExtensions(O);
```

| 参数 | 说明                   | 类型   |
| ---- | ---------------------- | ------ |
| O    | 将标记为不可扩展的对象 | object |

返回处理后的对象。

## 描述

如果一个对象可以添加新的属性，则这个对象是可扩展的。

`Object.preventExtensions` 能将对象标记为不可扩展，因此它将永远不会具有超出它被标记为不可扩展的 Properties。

⚠️ **注意**：一般来说，不可扩展对象的属性可能仍然可被删除。

该方法仅阻止添加自身的属性。但属性仍然可以添加到对象原型。

一旦使其不可扩展，就无法再对象进行扩展。

## 示例

字面量方式创建的对象默认是可扩展的。

```js
const foo = {};
Object.isExtensible(foo);
// true
```

但是可以改变。

```js
Object.preventExtensions(foo);

Object.isExtensible(foo);
// false
```

使用 `Object.defineProperty` 方法为一个可扩展的对象添加新属性会抛出异常。

```js
const nonExtensible = { removalbe: true };

Object.preventExtensions(nonExtensible);

Object.defineProperty(nonExtensible, 'new', { value: 5678 });
// throw TypeError Exception
```

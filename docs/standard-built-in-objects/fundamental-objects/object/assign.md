---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.assign
order: 2
---

# Object.assign

`Object.assign()` 方法用于将所有可枚举自有 Property 的值从一个或多个源对象拷贝到目标对象。

## 语法

```js
Object.assign(target, ...sources);
```

| 参数    | 说明     | 类型   |
| ------- | -------- | ------ |
| target  | 目标对象 | object |
| sources | 源对象   | object |

返回目标对象。

## 描述

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

`Object.assign` 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。

该方法使用源对象的 `[[Get]]` 和目标对象的 `[[Set]]`，所以它会调用相关 `getter` 和 `setter`。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含 `getter`，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用 [Object.getOwnPropertyDescriptor](./getOwnPropertyDescriptor) 和 [Object.defineProperty](./defineProperty) 。

## 示例

### 基本示例

```js
const a = { a: 1 };

const b = Object.assign({}, a);

console.log(b); // { a: 1 }
```

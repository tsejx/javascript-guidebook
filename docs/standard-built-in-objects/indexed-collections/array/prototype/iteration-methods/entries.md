---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.entries
order: 20
---

# Array.prototype.entries()

`Array.prototype.entries()` 方法返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键值对。

## 语法

```js
arr.entries();
```

**返回值：** 返回一个新的 Array 迭代器对象。Array Iterator 是对象，它的原型上有一个 `next()` 方法，可用于便利迭代器取得原数组的键值对。详情请查询 [Iterator 对象](../../../../control-abstraction-objects/iterator-objects/iterator)

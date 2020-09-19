---
nav:
  title: 内置对象
  order: 2
group:
  title: 键值集合
  path: /keyed-collections/
  order: 13
title: WeakSet
order: 5
---

# WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

WeakSet 是一个个构造函数。可以接受数组和类似数组的对象作为参数。（实际上，任何具作为 Iterable 接口的对象都可以作为 WeakSet 的参数）。该数组的所有成员都会自动成为 WeakSet 的实例对象的成员。

WeakSet 的成员只能是对象，而不能是其他类型的值。

WeakSet 中的对象都是弱作用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑对象是否还存在于 WeakSet 之中。

## 语法

```js
new WeakSet();
```

作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。实际上，任何具有 Iterable 接口的对象都可以作为 WeakSet 的参数。该数组的所有成员都会自动成为 WeakSet 实例对象的成员。

## 实例属性和方法

### 属性

WeakSet 没有 `size` 属性，没有办法遍历其成员。

WeakSet 不能遍历，因为成员都是弱作用，随时可能消失，遍历机制无法保证成员存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处是储存 DOM 节点，而不用担心这些节点从文档移除时引发内存泄漏。

### 方法

| 方法                              | 描述                                              |
| --------------------------------- | ------------------------------------------------- |
| `WeakSet.prototype.add(value)`    | 向 WeakSet 实例添加一个新成员。                   |
| `WeakSet.prototype.delete(value)` | 清除 WeakSet 实例的指定此成员。                   |
| `WeakSet.prototype.has(value)`    | 返回一个布尔值，表示某个值是否在 WeakSet 实例中。 |

## 示例

```js
const a = [
  [1, 2],
  [3, 4],
];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

上面的代码中，`a` 是一个数组，它有两个成员，也都是数组。将 `a` 作为 WeakSet 构造函数的参数，`a`

的成员会自动成为 WeakSet 的成员。

注意：成为 WeakSet 的成员的是 `a` 数组的成员，而不是 `a` 数组本身。这意味着，数组的成员只能是对象。

```js
// Wrong
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(...)
// 数组b的成员不是对象，玉女祠加入 WeakSet 就会报错
```

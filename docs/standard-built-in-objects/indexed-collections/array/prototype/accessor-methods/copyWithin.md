---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.copyWithin
order: 18
---

# Array.prototype.copyWithin()

`Array.prototype.copyWithin()` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

## 语法

语法：

```js
arr.copyWithin( target [, start [, end]]);
```

类型声明：

```ts
interface Array<T> {
  copyWithin(target: number, start: number, end?: number): this;
}
```

参数说明：

| 参数   | 说明                                                                                                                                                                                                                   | 类型   |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| target | 0 为基底的索引，复制序列到该位置。如果是负数，`target` 将从末尾开始计算。如果 `target` 大于等于数组长度，将不会发生拷贝。如果 `target` 在 `start` 之后，复制的序列将被修改以复合数组长度                               | number |
| start  | 0 为基底的索引，开始复制元素的起始位置。如果是负数，`start` 将从末尾开始计算。如果 `start` 被忽略，`copyWithin` 将会从 0 开始复制。                                                                                    | number |
| end    | 0 为基底的索引，开始复制元素的结束位置。`copyWithin` 将会拷贝到该位置，但不包括 `end` 这个位置的元素。如果是负数，`end` 将从末尾开始计算。如果 `end` 被忽略，`copyWithin` 方法将会一直复制至数组结尾（默认为数组长度） | number |

## 参考资料

- [MDN: Array.prototype.copyWithin](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)

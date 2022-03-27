---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.fill
order: 40
---

# Array.prototype.fill()

`Array.prototype.fill()` 方法用于将一个固定值填充到数组中从起始索引到终止索引内的全部元素。

## 语法

语法：

```js
arr.fill( value [, start [, end] ] )
```

类型声明：

```ts
interface Array<T> {
  fill(value: T, start?: number, end?: number): this;
}
```

参数说明：

| 参数  | 说明                             | 类型   |
| :---- | :------------------------------- | :----- |
| value | 填充数组元素的值                 | any    |
| start | 起始索引，默认为 0。             | number |
| end   | 结束索引，默认为 `arr.length` 。 | number |

## 方法说明

具体填充区间始于 `start`，结束但不包括于 `emdIndex`（半开半闭区间）

- 当 `start` 为负数，则开始索引为 `arr.length + start`
- 当 `end` 为负数，则结束索引为 `arr.length + end`

## 代码示例

```js
[1, 2, 3].fill(4)
// [4, 4, 4]

[1, 2, 3].fill(4, 1)
// [1, 4, 4]

[1, 2, 3].fill(4, 1, 2)
// [1, 4, 3]

[1, 2, 3].fill(4, 1, 1)
// [1, 2, 3]

[1, 2, 3].fill(4, 3, 3)
// [1, 2, 3]

[1, 2, 3].fill(4, -3, -2)
// [4, 2, 3]

[1, 2, 3].fill(4, NaN, NaN)
// [1, 2, 3]

[1, 2, 3].fill(4, 3, 5);
// [1, 2, 3]

Array(3).fill(4)
// [4, 4, 4]

[].fill.call({length: 3}, 4)
// {0: 4, 1: 4, 2: 4, length: 3}

// Object by reference
var arr = Array(3).fill({})
// [{}, {}, {}];

arr[0].hi = 'hi';
// [{hi: 'hi'}, {hi: 'hi'}, {hi: "hi"}]
```

## 参考资料

- [MDN: Array.prototype.fill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)

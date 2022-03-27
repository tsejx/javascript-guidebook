---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.of
order: 5
---

## Array.of()

`Array.of()` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

### 语法

语法：

```js
Array.of( ele0[, ele1[, ...[, eleN ] ] ] )
```

类型声明：

```ts
interface ArrayConstructor {
  of<T>(...items: T[]): T[];
}
```

参数说明：

| 参数     | 说明                                             | 类型 |
| :------- | :----------------------------------------------- | :--- |
| elementN | 任意个参数，将按 **顺序** 成为返回数组中的元素。 | any  |

返回值：

新的 `Array` 实例。

### 方法说明

`Array.of()` 和 `Array` 构造函数之间的区别在于处理整数参数。

- `Array.of(7)` 创建一个具有单个元素 7 的数组
- `Array(7)` 创建一个包含 7 个 `undefined` 元素的数组。

```js
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]
Array(1, 2, 3); // [1, 2, 3]
```

### 代码示例

```js
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]
```

## 参考资料

- [MDN: Array.of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
- [TypeScript: lib.es2015.core.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2015.core.d.ts)

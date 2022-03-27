---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.push
order: 42
---

# Array.prototype.push()

`Array.prototype.push()` 方法用于向当前数组的末尾添加一个或多个元素，并返回新的数组长度。

## 语法

语法：

```js
arr.push( item1 [, items...] )
```

类型声明：

```ts
interface Array<T> {
  push(...items: T[]): number;
}
```

参数说明：

| 参数  | 说明           | 类型 |
| :---- | :------------- | :--- |
| item1 | 添加元素       | any  |
| itemN | 添加的其他元素 | any  |

如果添加的元素类型为数组类型，仍然会被当作一个元素看待，只是这个元素是数组类型而已。如果要合并两个数组，请使用 `concat()` 函数。

返回值：

返回添加元素后的数组长度。

## 方法说明

当向数组中添加新的元素时，数组的 `length` 属性也会随之改变。一般而言，数组的 `length` 属性将会加 `N` （ `N` 为添加的元素个数）。

`push()` 方法有意具有通用性。该方法和 `call()` 或 `apply()` 一起使用时，可应用在类似数组的对象上。`push()` 方法根据 length 属性来决定从哪里开始插入给定的值。如果 `length` 不能被转成一个数值，则插入的元素索引为 0，包括 `length` 不存在时。当 `length` 不存在时，将会创建它。

## 代码示例

### 基本用法

```js
const foo = ['a', 'b'];
const bar = foo.push('c', 'd');

console.log(foo);
// ['a', 'b', 'c', 'd']

console.log(bar);
// 4
```

### 合并数组

该示例使用 `apply()` 添加第二个数组的所有元素。注意当第二个数组太大时不要使用这个方法来合并数组，因为事实上一个函数能够接受的参数个数是有限制的。

```js
const foo = ['a', 'b'];
const bar = ['c', 'd'];

// 将二个数组融合进第一个数组
// 相当于 foo.push('c', 'd');
Array.prototype.push.apply(foo, bar);

console.log(foo);
// ['a', 'b', 'c', 'd']
```

## 参考资料

- [MDN: Array.prototype.push](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)

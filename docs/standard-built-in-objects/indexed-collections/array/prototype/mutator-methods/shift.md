---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.shift
order: 44
---

# Array.prototype.shift()

`Array.prototype.shift()` 方法用于移除数组第一个成员，并返回移除的元素。

## 语法

语法：

```js
arr.shift();
```

类型声明：

```ts
interface Array<T> {
  shift(): T | undefined;
}
```

返回值：

返回被移除的数组成员。如果该数组为空（没有任何元素），则返回 `undefined`。

## 方法说明

由于本函数会移除数组中的第一个元素，数组的 `length` 属性也会随之改变（如果数组中有元素的话），一般而言，数组的 `length` 属性将会减 1。

## 代码示例

### 基本用法

```js
let foo = ['a', 'b', 'c', 'd'];

let bar = foo.shift();

console.log(foo);
// ['b', 'b', 'd']

console.log(bar);
// 'a'
```

### 空数组调用

```js
let foo = [];

let bar = foo.shift();

console.log(bar);
// undefined
```

## 参考资料

- [MDN: Array.prototype.shift](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)

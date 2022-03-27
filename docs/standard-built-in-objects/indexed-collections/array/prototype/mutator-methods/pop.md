---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.pop
order: 41
---

# Array.prototype.pop()

`Array.prototype.pop()` 方法用于移除数组最后一个成员，并返回该数组成员。

## 语法

语法：

```js
arr.pop();
```

类型声明：

```ts
interface Array<T> {
  pop(): T | undefined;
}
```

返回值：

返回被移除的数组成员。如果该数组为空（没有任何元素），则返回 `undefined`。

## 方法说明

- 该方法和 `call()` 或 `apply()` 一起使用时，可应用在类数组对象上。`pop` 方法根据 `length` 属性来确定最后一个元素的位置。如果不包含 `length` 属性或 `length` 属性不能被转成一个数值，会将 `length` 置为 0，并返回 `undefined`。
- 由于该方法会移除数组中的**最后一个元素**，数组的 `length` 属性也会随之改变（如果数组中有元素的话），一般而言，数组的 `length` 属性将会减 1。
- 如果你在一个空数组上调用 `pop()`，它返回 `undefined`。

## 代码示例

### 基本用法

```js
let foo = ['a', 'b', 'c', 'd'];

let popped = foo.pop();

console.log(foo);
// ['a', 'b', 'c', 'd']

console.log(popped);
// 'd'
```

### 在空数组中调用

```js
let empty = [];

let popped = empty.pop();

console.log(popped);
// undefined

console.log(empty);
// []
```

## 参考资料

- [MDN: Array.prototype.pop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)

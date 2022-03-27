---
nav:
  title: 内置对象
  order: 2
group:
  title: Array
  path: /indexed-collections/array/
  order: 11
title: Array.prototype.reverse
order: 43
---

# Array.prototype.reverse()

`Array.prototype.reverse()` 方法用于将当前数组的成员顺序全部反转，并返回元素顺序反转后的数组。

## 语法

语法：

```js
arr.reverse();
```

类型声明：

```ts
interface Array<T> {
  reverse(): T[];
}
```

返回值：

返回数组成员反转后的数组，

- `reverse()` 函数将一个当前数组对象中的元素按所在位置进行反转。在执行过程中，此函数并不创建新的 Array 对象，直接在当前对象上进行反转。返回的数组对象就是经过顺序反转后的当前对象。
- 如果数组是不连续的，`reverse()` 函数将在数组中创建元素，这些元素将填充数组中的间隙。所创建的这些元素的值全部未定义。

## 代码示例

### 基本用法

```js
const foo = ['a', 'b', 'c'];

foo.reverse();

console.log(foo);
// ['a', 'b', 'c']
```

### 空数组

```js
const foo = [].reverse();

console.log(foo);
```

## 参考资料

- [MDN: Array.prototype.reverse](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)

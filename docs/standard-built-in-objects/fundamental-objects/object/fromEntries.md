---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.fromEntries
order: 25
---

# Object.fromEntries

`Object.fromEntries()` 方法把键值对列表转换为一个对象。

## 语法

语法：

```js
Object.fromEntries(entries);
```

类型声明：

```ts
interface Iterator<T, TReturn = any, TNext = undefined> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface ObjectConstructor {
  fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T };

  fromEntries(entries: Iterable<readonly any[]>): any;
}
```

参数说明：

| 参数    | 说明                                               | 类型     |
| :------ | :------------------------------------------------- | :------- |
| entries | 可实现可迭代协议的可迭代对象（例如 Array、Map 等） | iterable |

返回值：

返回一个由该迭代对象条目提供对应属性的新对象。

## 方法说明

`Object.fromEntries()` 方法接收一个键值对的列表参数，并返回一个带有这些键值对的新对象。这个迭代参数应该是一个能够实现 `@@iterator` 方法的的对象，返回一个迭代器对象。它生成一个具有两个元素的类数组的对象，第一个元素是将用作属性键的值，第二个元素是与该属性键关联的值。

`Object.fromEntries()` 执行与 `Object.entries()` 互逆的操作。

## 代码示例

### 基本用法

```js
const obj = { x: 42, y: 50 };
const entries = Object.entries(obj);
// -> [['x', 42], ['y', 50]];

const result = Object.fromEntries(entries);
// -> { x: 42, y: 50 }
```

### 转换 Map 为 Object

```js
const map1 = new Map([
  ['big', 'small'],
  [1, 0],
]);
const geek = Object.fromEntries(map1);
console.log(geek);
// Output: { 1: 0, big: "small" }

const map2 = new Map([
  ['Geek1', 'Intern'],
  ['stipend', 'Works basis'],
]);
const geek1 = Object.fromEntries(map2);
console.log(geek1);
// Output: { Geek1: "Intern", sitipend: "Works basis" }
```

### 转换 Array 为 Object

```js
const arr1 = [
  ['big', 'small'],
  [1, 0],
  ['a', 'z'],
];
const geek = Object.fromEntries(arr1);
console.log(geek);
// Output: { 1: 0, big: "small", a: "z" }

const arr2 = [
  ['Geek1', 'Intern'],
  ['stipend', 'Works basis'],
];
const geek1 = Object.fromEntries(arr2);
// Output: { Geek1: "Intern", stipend: "Works basis" }
```

### 其他转换

```js
const params = 'type=Get_the Value&geekno=34&paid=10';
const searchParams = new URLSearchParams(params);

console.log(Object.fromEntries(searchParams));
// Output: { type: "Get_ Value", geekno: "34", paid: "10" }

const object1 = { val1: 112, val2: 345, val3: 76 };
const object2 = Object.fromEntries(Object.entries(object1).map(([key, val]) => [key, val * 3]));
console.log(object2);
// Output: { val1: 336, val2: 1035, val3: 228 }
```

## 参考资料

- [MDN: Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)

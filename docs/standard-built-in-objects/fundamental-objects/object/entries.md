---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.entries
order: 6
---

# Object.entries

⭐️ `ES2017(ES8)新特性`

`Object.entries()` 方法用于枚举指定对象并返回以键值对组成的数组为元素的二维数组。

## 语法

语法：

```js
Object.entries(obj);
```

类型声明：

```ts
interface ObjectConstructor {
  values<T>(o: { [s: string]: T } | ArrayLike<T>): T[];

  values(o: {}): any[];
}
```

参数说明：

| 参数  | 说明           | 类型   |
| :---- | :------------- | :----- |
| `obj` | 用于枚举的对象 | object |

返回值：

返回给定对象自身可枚举 Property 的键值对数组。

## 方法说明

给定对象自身可枚举属性的键值对数组，其排列与使用 [for-in](../../../basic-concept/statements-and-declarations/iteration-statement/the-for-in-statement) 循环遍历该对象时返回的顺序一致，区别在于 `for-in` 循环也枚举原型链中的属性。

## 代码示例

```js
const a = { foo: 1, bar: 2 };
Object.entries(a);
// [['foo', 1], ['bar', 2]]

Object.entries('foo');
// [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`);
  // "a 5", "b 7", "c 9"
}

Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});
```

## 参考资料

- [TypeScript - lib.es2017.object.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2017.object.d.ts)

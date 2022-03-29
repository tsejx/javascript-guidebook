---
nav:
  title: 内置对象
  order: 2
group:
  title: Object
  order: 4
title: Object.isExtensible
order: 14
---

# Object.isExtensible

`Object.isExtensible()` 方法用于检测指定对象是否可扩展。

## 语法

语法：

```js
Object.isExtensible(o);
```

类型声明：

```ts
interface Object {
  isExtensible(o: any): boolean;
}
```

参数说明：

| 参数 | 说明               | 类型   |
| :--- | :----------------- | :----- |
| o    | 指定用于检测的对象 | object |

返回值：

返回 Boolean 类型的值表示用于检测的对象是否可扩展。

## 方法说明

默认情况下，对象是可扩展的：即可以为他们添加新的属性。

[Object.preventExtensions](./preventExtensions)、[Object.seal](./seal) 或 [Object.freeze](./freeze) 方法都可以标记一个对象为不可扩展（non-extensible）。

## 代码示例

```js
let foo = {
  a: 1,
};
console.log(Object.isExtensible(foo));
// true

foo.b = 2;

console.log(foo);
// {a: 1, b: 2}

console.log(Object.preventExtensions(foo));
// { a: 1, b: 2}

// 由于对象 foo 禁止扩展，所以该赋值语句静默失败
foo.c = 3;

console.log(Object.isExtensible(foo));
// false

console.log(foo);
// { a: 1, b: 2}
```

## 参考资料

- [MDN: Object.isExtensible](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
- [TypeScript: lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
